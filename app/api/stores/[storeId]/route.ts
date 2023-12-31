import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;
    const { storeId } = params;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!storeId)
      return new NextResponse("Store id is required", { status: 400 });

    const storeResponse = await prismadb.store.updateMany({
      where: {
        id: storeId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(storeResponse);
  } catch (error) {
    console.log("[STORE_PATCH] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const { storeId } = params;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!storeId)
      return new NextResponse("Store id is required", { status: 400 });

    const storeResponse = await prismadb.store.deleteMany({
      where: {
        id: storeId,
        userId,
      },
    });

    return NextResponse.json(storeResponse);
  } catch (error) {
    console.log("[STORE_DELETE] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
