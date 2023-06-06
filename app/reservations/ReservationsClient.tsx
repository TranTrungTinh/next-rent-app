'use client'

import { SafeReservation, SafeUser } from "../types";
import Heading from "../components/Heading";
import Container from "../components/layout/Container";
import ListingCard from "../components/listings/ListingCard";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface ReservationsClientProps {
  reservations: SafeReservation[]
  currentUser: SafeUser | null
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser
}) => {

  const router = useRouter();
  const [deleteId, setDeleteId] = useState('');

  const onCancel = useCallback((id: string) => {
    axios.delete(`/api/reservations/${id}`)
    .then(() => {
      toast.success('Reservation cancelled');
      router.refresh();
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error || 'Something went wrong');
    })
    .finally(() => {
      setDeleteId('');
    })
  }, [router])

  return (
    <Container>
      <Heading
        title="Your Reservations"
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
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            currentUser={currentUser}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deleteId === reservation.id}
            actionLabel="Cancel Reservation"
          />
        ))}

      </div>
    </Container>
  );
}

export default ReservationsClient;