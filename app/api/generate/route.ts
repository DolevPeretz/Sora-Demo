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
        num_images: 3,
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

// import { NextRequest, NextResponse } from "next/server";

// const url = "https://api.openai.com/v1/images/generations";

// export async function POST(req: NextRequest) {
//   const { prompt } = await req.json();

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         prompt,
//         n: 3,
//         size: "1024x1024",
//       }),
//     });

//     if (!response.ok) {
//       const err = await response.text();
//       console.error("DALL·E Error:", err);
//       return NextResponse.json(
//         { error: "Image generation failed" },
//         { status: 500 }
//       );
//     }

//     const data = await response.json();

//     // התמונות ב־DELA מוחזרות ב־data.data[].url
//     const images = data.data.map((img: any) => ({
//       url: img.url,
//       width: 1024,
//       height: 1024,
//       content_type: "image/png", // DELA לא מחזיר את זה, משוער
//     }));

//     return NextResponse.json(images);
//   } catch (error) {
//     console.error("API error:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
