'use client';

import Heading from "../components/Heading";
import Container from "../components/layout/Container";
import ListingCard from "../components/listings/ListingCard";
import { SafeListing, SafeUser } from "../types";

interface FavoritesClientProps {
  favorites: SafeListing[]
  currentUser: SafeUser | null
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  favorites,
  currentUser
}) => {
  return (
    <Container>
      <Heading
        title="Your Favorites"
        subtitle="Where you are going to stay"
      />

      <div
        className="
          mt-10
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {favorites.map((favorite) => (
          <ListingCard
            key={favorite.id}
            data={favorite}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
   );
}

export default FavoritesClient ;