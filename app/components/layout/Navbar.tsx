'use client';

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import Categories from "./Categories";
import Container from "./Container";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";
// import Search from "./Search";
// import UserMenu from "./UserMenu";

interface Props {
  currentUser?: SafeUser | null
}

const Navbar: React.FC<Props> = ({
  currentUser
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py-4
          border-b-[1px]
        "
      >
      <Container>
        <div
          className="
            flex
            flex-row
            items-center
            justify-between
            gap-3
            md:gap-0
          "
        >
          <Image
            onClick={() => router.push('/')}
            className="hidden md:block cursor-pointer"
            src="/images/logo.png"
            height="100"
            width="100"
            alt="Logo"
          />
          <Search />
          <UserMenu currentUser={currentUser} />
        </div>
      </Container>
      <Categories />
    </div>
    {/* {isMainPage && <Categories />} */}
  </div>
  );
}


export default Navbar;