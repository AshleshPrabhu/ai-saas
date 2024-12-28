"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
    LogOut,
    LayoutDashboard,
    Share2,
    Upload,
    Image,
    ImageIcon,
    Home,
    ChevronRight,
    ChevronLeft,
    Loader2,
    User,
    User2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";

const sidebarItems = [
    { href: "/home", icon: Home, label: "Home" },
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/social-share", icon: Share2, label: "Social Share" },
    { href: "/video-upload", icon: Upload, label: "Video Upload" },
    { href: "/background", icon: Image, label: "Background Effects" },
];

function SideBar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<{ name: string; email: string }>({
        name: "",
        email: "",
    });
    const [id, setId] = useState<string>("");

    useEffect(() => {
        const handleResize = () => {
            const isSmallScreen = window.innerWidth <= 768;
            setSidebarOpen(!isSmallScreen);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const getUserId = async () => {
        try {
            const response = await axios.get("/api/get-token");
            if (response.data?.success) {
                setId(response.data.decodedToken?.id || "");
                setUser({
                    name: response.data.decodedToken?.name || "User",
                    email: response.data.decodedToken?.email || "",
                });
            } else {
                setId("");
            }
        } catch (error) {
            console.error("Error fetching user ID:", error);
            setId("");
        }
    };

    useEffect(() => {
        getUserId();
    }, []);

    const handleSignOut = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/user/logout");
            if (response.status === 200) {
                setUser({ name: "", email: "" });
                setId("");
                router.push("/login");
            } else {
                toast.error("Error signing out");
            }
        } catch (error) {
            toast.error("Failed to logout");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    return (
        <div>
            <aside
                className={`fixed block dark:border-white inset-y-0 left-0 z-50 w-64 dark:bg-black shadow-lg transform ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 transition-transform duration-200 ease-in-out`}
            >
                <div className="h-full flex flex-col">
                    {sidebarOpen && (
                        <button
                            className="absolute top-1/2 -translate-y-1/2 -right-8 bg-blue-600 text-white p-2 rounded-l-lg shadow-lg lg:hidden"
                            onClick={toggleSidebar}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                    )}
                    <div
                        className="flex items-center justify-center h-16 px-4 border-b cursor-pointer mt-5"
                        onClick={toggleSidebar}
                    >
                        <ImageIcon className="w-8 h-8 text-blue-600" />
                    </div>
                    {
                        id!=="" && (
                            <nav className="flex-1 px-4 py-4 space-y-1">
                                {sidebarItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center px-4 py-2 text-sm rounded-lg ${
                                            pathname === item.href
                                                ? "bg-blue-50 text-blue-600"
                                                : "text-gray-600 dark:text-white hover:bg-gray-50 dark:hover:text-black"
                                        }`}
                                    >
                                        <item.icon className="w-5 h-5 mr-3" />
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        )
                    }
                    {
                        id==="" && (
                            <nav className="flex-1 px-4 py-4 space-y-1">
                                <Link
                                    href="/login"
                                    className={`flex items-center px-4 py-2 text-sm rounded-lg ${
                                        pathname === "/login"
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-gray-600 dark:text-white hover:bg-gray-50 dark:hover:text-black"
                                    }`}
                                >
                                    <User className="w-5 h-5 mr-3" />
                                    Login
                                </Link>
                                <Link
                                    href="/sign-up"
                                    className={`flex items-center px-4 py-2 text-sm rounded-lg ${
                                        pathname === "/sign-up"
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-gray-600 dark:text-white hover:bg-gray-50 dark:hover:text-black"
                                    }`}
                                >
                                    <User2Icon className="w-5 h-5 mr-3" />
                                    SignUp
                                </Link>
                            </nav>
                        )
                    }
                    
                    
                    {id!=="" && (
                        <div className="p-4 border-t">
                            <Button
                                onClick={handleSignOut}
                                variant="outline"
                                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                                {loading ? (
                                    <Loader2 />
                                ) : (
                                    <>
                                        <LogOut className="w-5 h-5 mr-3" />
                                        Sign Out
                                    </>
                                )}
                            </Button>
                        </div>
                    )}
                </div>
            </aside>
            {!sidebarOpen && (
                <button
                    className="fixed z-50 top-1/2 -translate-y-1/2 left-0 bg-blue-600 text-white p-2 rounded-r-lg shadow-lg lg:hidden"
                    onClick={() => setSidebarOpen(true)}
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            )}
        </div>
    );
}

export default SideBar;
