import { getCurrentUser } from "../actions/getCurrentUser";
import { getListings } from "../actions/getListings";
import EmptyState from "../components/layout/EmptyState";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState
      title="You are not logged in"
      subtitle="Please login to view your properties"
    />
  }

  const listings = await getListings({ userId: currentUser.id })

  if (!listings.length) {
    return <EmptyState
      title="You have no properties"
      subtitle="Please add a property to view it here"
    />
  }

  return (
    <PropertiesClient
      listings={listings}
      currentUser={currentUser}
    />
  );
}

export default PropertiesPage;