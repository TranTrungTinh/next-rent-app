
import prisma from '@/app/libs/prismadb'
import { getCurrentUser } from './getCurrentUser'

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      throw new Error('User not found')
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])]
        }
      }
    })

    return favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
    }))

  } catch (error) {
    throw error
  }
}