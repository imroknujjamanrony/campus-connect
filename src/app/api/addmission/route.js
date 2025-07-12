import { collection, getCollection } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      candidateName,
      subject,
      email,
      phone,
      address,
      dob,
      imageURL,
      collegeId,
    } = body;

    if (
      !candidateName ||
      !subject ||
      !email ||
      !phone ||
      !address ||
      !dob ||
      !imageURL ||
      !collegeId
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const admissions = await getCollection(collection.admission_collection);

    const result = await admissions.insertOne({
      candidateName,
      subject,
      email,
      phone,
      address,
      dob,
      imageURL,
      collegeId,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, id: result.insertedId },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Admission API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

//for get req

export async function GET(req) {
  try {
    const admissions = await getCollection(collection.admission_collection);
    const allAdmissions = await admissions.find({}).toArray();

    return NextResponse.json(allAdmissions);
  } catch (err) {
    console.error("❌ GET admission error:", err);
    return NextResponse.json(
      { error: "Failed to fetch admissions" },
      { status: 500 }
    );
  }
}
