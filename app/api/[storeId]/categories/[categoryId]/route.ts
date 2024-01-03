import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { categoryId } = params;

    if (!categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    const categoryResponse = await prismadb.category.findFirst({
      where: {
        id: categoryId,
      },
    });

    return NextResponse.json(categoryResponse);
  } catch (error) {
    console.log("[CATEGORY_GET] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, billboardId } = body;
    const { storeId, categoryId } = params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("BillboardId ID is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
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

    const categoryResponse = await prismadb.category.updateMany({
      where: {
        id: categoryId,
        storeId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(categoryResponse);
  } catch (error) {
    console.log("[CATEGORY_PATCH] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    const { storeId, categoryId } = params;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!categoryId)
      return new NextResponse("Category ID is required", { status: 400 });

    if (!storeId)
      return new NextResponse("Store ID is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const categoryResponse = await prismadb.category.deleteMany({
      where: {
        id: categoryId,
        storeId,
      },
    });

    return NextResponse.json(categoryResponse);
  } catch (error) {
    console.log("[CATEGORY_DELETE] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
