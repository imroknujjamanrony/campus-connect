import { collection, getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { collegeId, candidateName, review, rating, image, createdAt } = body;

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
      image,
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

// for get req

export async function GET() {
  try {
    const reviewsCol = await getCollection(collection.reviews_collection);
    const allReviews = await reviewsCol.find({}).toArray();

    return NextResponse.json(allReviews);
  } catch (err) {
    console.error("❌ Failed to fetch reviews:", err);
    return NextResponse.json(
      { error: "Error loading reviews" },
      { status: 500 }
    );
  }
}
