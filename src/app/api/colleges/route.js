import {
  clientPromise,
  collection,
  dbName,
  getCollection,
} from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, age } = body;

    if (!name || !age) {
      return NextResponse.json(
        { error: "Name and age required" },
        { status: 400 }
      );
    }

    const users = await getCollection(collection.user_collection);

    const result = await users.insertOne({ name, age });

    return NextResponse.json(
      { success: true, insertedId: result.insertedId },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Apply error:", err);
    return NextResponse.json({ error: "Failed to apply" }, { status: 500 });
  }
}

//get data

// GET all colleges
export async function GET() {
  try {
    const collegesCol = await getCollection(collection.colleges_collection); // Make sure `college_collection` exists in your `collection` object

    const colleges = await collegesCol.find({}).toArray();

    return NextResponse.json(colleges);
  } catch (err) {
    console.error("❌ Error fetching colleges:", err);
    return NextResponse.json(
      { error: "Failed to fetch college data." },
      { status: 500 }
    );
  }
}
