// for production
import { NextRequest, NextResponse } from 'next/server';
import { checkAndUpdatePremiumValidity } from '../../../lib/cronTasks';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
export default async function handler(request:NextRequest) {
  if (request.method === 'GET') {
    try {
      // Call the function that checks and updates premium validity
      await checkAndUpdatePremiumValidity(prisma);
      return NextResponse.json({ message: 'Premium validity check completed successfully.' },{status:200});
    } catch (error) {
      return NextResponse.json({ error: 'Error checking premium validity.',success:false },{status:400});
    }
  } else {
    NextResponse.json({ error: 'Method Not Allowed',success:false },{status:500});
  }
}