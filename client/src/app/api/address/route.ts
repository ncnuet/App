import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const keyword = req.nextUrl.searchParams.get("keyword");
  const url = "https://dvhcvn.vercel.app/demo/parser/api";
  const res = await axios.post(url, keyword, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
  return NextResponse.json(res.data);
}
