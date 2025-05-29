import { NextResponse } from "next/server";
import tickets from "@/app/database";

export async function GET() {
  return NextResponse.json(tickets);
}

export async function POST(request: Request) {
  const { name, status, type } = await request.json();

  const newTicket = {
    id: tickets.length + 1,
    name,
    status,
    type,
  };

  tickets.push(newTicket);

  return NextResponse.json(newTicket);
}