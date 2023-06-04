import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prismaDb from '@/app/libs/prismadb'

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json()

  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
   } = body;

  const isEmpty = Object.keys(body).some((value: any) => !body[value]);

  if (isEmpty) {
    return NextResponse.error()
  }

  const listing = await prismaDb.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id
    }
  });

  return NextResponse.json(listing);
}