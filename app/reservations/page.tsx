import { getCurrentUser } from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import EmptyState from "../components/layout/EmptyState";
import ReservationsClient from "./ReservationsClient";

const ReservationPage = async () => {

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState
      title="You are not logged in"
      subtitle="Please login to view your reservations"
    />
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (!reservations.length) {
    return <EmptyState
      title="You have no reservations"
      subtitle="Please make a reservation to view it here"
    />
  }

  return (
    <ReservationsClient
      reservations={reservations}
      currentUser={currentUser}
    />
  );
}

export default ReservationPage;