import { NextResponse } from "next/server";

export async function GET(request: Request) {

  try {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get('text');
    const lang = searchParams.get('lang');

    const url = `https://text-to-speech-api3.p.rapidapi.com/speak?text=${text}!&lang=${lang}`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.API_KEY || "",
        "X-RapidAPI-Host": "text-to-speech-api3.p.rapidapi.com",
      }
    };

    const res = await fetch(url, options);

    if (res.ok) {
      return new NextResponse(res.body, {
        headers: {
          "Content-Type": "audio/mpeg",
        },
      });
    } else {
      return new NextResponse(`Error: ${res.status} ${res.statusText}`, {
        status: res.status,
      });
    }

  } catch (error) {
    return new NextResponse("An error occurred", {
      status: 500,
    });
  }
}