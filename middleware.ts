//export { auth as middleware } from "@/auth"

import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-url", request.url);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}
