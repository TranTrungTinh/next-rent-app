'use client'

import { useRouter } from "next/navigation";
import Heading from "../components/Heading";
import Container from "../components/layout/Container";
import ListingCard from "../components/listings/ListingCard";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { SafeListing, SafeUser } from "../types";

interface PropertiesClientProps {
  listings: SafeListing[]
  currentUser: SafeUser | null
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser
}) => {

  const router = useRouter();
  const [deleteId, setDeleteId] = useState('');

  const onDelete = useCallback((id: string) => {
    setDeleteId(id);

    axios.delete(`/api/listings/${id}`)
    .then(() => {
      toast.success('Listing deleted');
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
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deleteId === listing.id}
            actionLabel="Delete property"
          />
        ))}
      </div>
    </Container>
  );
}

export default PropertiesClient;