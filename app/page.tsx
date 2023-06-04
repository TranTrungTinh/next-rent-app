import Container from "@/app/components/layout/Container";
import { getListings } from "./actions/getListings";
import EmptyState from "./components/layout/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import { getCurrentUser } from "./actions/getCurrentUser";

export default async function Home() {

  const listings = await getListings({})
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return <EmptyState showReset />
  }

  return (
    <Container>
      <div
        className="
          pt-52
          pb-20
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
        {listings.map(item => (
          <ListingCard key={item.id} data={item} currentUser={currentUser} />
        ))}
      </div>
    </Container>
  )
}
