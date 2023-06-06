import { getCurrentUser } from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import EmptyState from "../components/layout/EmptyState";
import FavoritesClient from "./FavoritesClient ";

const FavoritePage = async () => {

  const listings = await getFavoriteListings()
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState
      title="You have no favorites"
      subtitle="Please add a favorite to view it here"
    />
  }

  return (
    <FavoritesClient
      favorites={listings}
      currentUser={currentUser}
    />
  );
}

export default FavoritePage;