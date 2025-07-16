import { NextRequest, NextResponse } from "next/server";
const url = "https://fal.run/fal-ai/flux/schnell";
export async function POST(req: NextRequest) {
  const { prompt, page = 1 } = await req.json();

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Key ${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `${prompt} page ${page}`,
        num_images: 4,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("FAL Error:", err);
      return NextResponse.json(
        { error: "Image generation failed" },
        { status: 500 }
      );
    }

    const data = await response.json();
    // console.log("✅ Returning data:", data);

    return NextResponse.json(data.images);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
