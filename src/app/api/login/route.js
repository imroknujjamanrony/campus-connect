import { getCollection, collection } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const usersCol = await getCollection(collection.user_collection);
    const user = await usersCol.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Return user object without password for NextAuth
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (err) {
    console.error("❌ Login error:", err);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
