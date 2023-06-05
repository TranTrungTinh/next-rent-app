import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import EmptyState from "../components/layout/EmptyState";
import TripsClient from "./TripsClient";

const TripsPage = async () => {

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState
      title="You are not logged in"
      subtitle="Please login to see your trips"
    />
  }

  const reservations = await getReservations({ userId: currentUser.id })

  if (!reservations.length) {
    return <EmptyState
      title="You have no trips"
      subtitle="Please book a listing to see it here"
    />
  }

  return (
    <TripsClient
      reservations={reservations}
      currentUser={currentUser}
    />
  );
}

export default TripsPage;