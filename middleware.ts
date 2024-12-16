import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/"
]);

const isPublicApiRoute = createRouteMatcher(["/api/videos"]);

export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth();
    const currentUrl = new URL(req.url);
    const isHomePage = currentUrl.pathname === "/";
    const isOnHome = currentUrl.pathname === "/home";
    const isApiRequest = currentUrl.pathname.startsWith("/api");

    // Redirect logged-in users from `/` to `/home`
    if (userId && isHomePage) {
        console.log("Redirecting to /home");
        return NextResponse.redirect(new URL("/home", req.url));
    }

    // Prevent redirect loop: don't redirect users already on `/home`
    if (userId && isPublicRoute(req) && !isHomePage && !isOnHome) {
        console.log("Already logged in, redirecting to /home");
        return NextResponse.redirect(new URL("/home", req.url));
    }

    // Handle logged-out users accessing protected routes
    if (!userId) {
        if (!isPublicRoute(req) && !isPublicApiRoute(req)) {
            console.log("Redirecting to /sign-in");
            return NextResponse.redirect(new URL("/sign-in", req.url));
        }

        if (isApiRequest && !isPublicApiRoute(req)) {
            console.log("Redirecting to /sign-in for API");
            return NextResponse.redirect(new URL("/sign-in", req.url));
        }
    }

    return NextResponse.next();
});


export const config = {
    // matcher: [
    //     // Skip Next.js internals and all static files, unless found in search params
    //     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    //     // Always run for API routes
    //     '/(api|trpc)(.*)',
    // ],
    matcher:["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
}