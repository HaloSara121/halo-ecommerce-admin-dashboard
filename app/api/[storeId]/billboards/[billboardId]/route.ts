import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    const { billboardId } = params;

    if (!billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
    }

    const billboardResponse = await prismadb.billboard.findFirst({
      where: {
        id: billboardId,
      },
    });

    return NextResponse.json(billboardResponse);
  } catch (error) {
    console.log("[BILLBOARD_GET] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, imageUrl } = body;
    const { storeId, billboardId } = params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const billboardResponse = await prismadb.billboard.updateMany({
      where: {
        id: billboardId,
        storeId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboardResponse);
  } catch (error) {
    console.log("[BILLBOARD_PATCH] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    const { storeId, billboardId } = params;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!billboardId)
      return new NextResponse("Billboard ID is required", { status: 400 });

    if (!storeId)
      return new NextResponse("Store ID is required", { status: 400 });

    const billboardResponse = await prismadb.billboard.deleteMany({
      where: {
        id: billboardId,
        storeId,
      },
    });

    return NextResponse.json(billboardResponse);
  } catch (error) {
    console.log("[BILLBOARD_DELETE] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
