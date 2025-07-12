import { collection, getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { collegeId, candidateName, review, rating, createdAt } = body;

    if (!collegeId || !review || !rating) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const reviews = await getCollection(collection.reviews_collection);
    const result = await reviews.insertOne({
      collegeId,
      candidateName,
      review,
      rating,
      createdAt,
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (err) {
    console.error("Review error:", err);
    return NextResponse.json(
      { error: "Failed to add review" },
      { status: 500 }
    );
  }
}
