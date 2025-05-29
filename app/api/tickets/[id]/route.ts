import tickets from "@/app/database";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) return NextResponse.json({ error: "Ticket id is required" });

  const parsedId = Number(id);
  if (Number.isNaN(parsedId))
    return NextResponse.json({ error: "Ticket id must be a number" });

  const ticket = tickets.find((ticket) => ticket.id === parsedId);
  if (!ticket) return NextResponse.json({ error: "Ticket not found" });

  return NextResponse.json(ticket);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) return NextResponse.json({ error: "Ticket id is required" });

  const parsedId = Number(id);
  if (Number.isNaN(parsedId))
    return NextResponse.json({ error: "Ticket id must be a number" });

  const { name, status, type } = await request.json();

  const ticket = tickets.find((ticket) => ticket.id === parsedId);
  if (!ticket) return NextResponse.json({ error: "Ticket not found" });

  if (name) ticket.name = name;
  if (status) ticket.status = status;
  if (type) ticket.type = type;

  return NextResponse.json(ticket);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) return NextResponse.json({ error: "Ticket id is required" });

  const parsedId = Number(id);
  if (Number.isNaN(parsedId))
    return NextResponse.json({ error: "Ticket id must be a number" });

  const ticket = tickets.find((ticket) => ticket.id === parsedId);
  if (!ticket) return NextResponse.json({ error: "Ticket not found" });

  tickets.splice(tickets.indexOf(ticket), 1);

  return NextResponse.json(ticket);
}