import Container from "@/app/components/layout/Container";
import { IListingsParams, getListings } from "./actions/getListings";
import EmptyState from "./components/layout/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import { getCurrentUser } from "./actions/getCurrentUser";

interface HomeProps {
  searchParams: IListingsParams
};

export default async function Home({ searchParams }: HomeProps) {

  const listings = await getListings(searchParams)
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
