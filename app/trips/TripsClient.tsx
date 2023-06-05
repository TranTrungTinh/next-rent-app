'use client'

import { useRouter } from "next/navigation";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Container from "@/app/components/layout/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listings/ListingCard";

interface TripsClientProps {
  reservations: SafeReservation[]
  currentUser: SafeUser | null
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser
}) => {

  const router = useRouter();
  const [deleteId, setDeleteId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeleteId(id);

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
  }, [router]);

  return (
    <Container>
      <div className="
        pt-28
        pb-20
      ">
        <div className="flex flex-col gap-6">
          <Heading
            title="Your Trips"
            subtitle="Where you are going to stay"
          />

          <div
            className="
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
                reservation={reservation}
                currentUser={currentUser}
                actionId={reservation.id}
                onAction={onCancel}
                disabled={deleteId === reservation.id}
                actionLabel="Cancel Reservation"
                data={reservation.listing}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default TripsClient;