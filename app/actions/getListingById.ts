import prisma from "@/app/libs/prismadb";

interface IPrams {
  listingId?: string
}

export default async function getListingById(params: IPrams) {
  try {

    const { listingId } = params

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true
      }
    })

    return listing

  } catch (error) {
    throw error
  }
}