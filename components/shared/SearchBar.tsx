"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";

import { Input } from "../ui/input";

interface Props {
  routeType: string;
}

function Searchbar({ routeType }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  // query after 0.3s of no input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        router.push(`/${routeType}?q=` + search);
      } else {
        router.push(`/${routeType}`);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, routeType]);

  const handeSearchInput = (e: { target: { value: SetStateAction<string> } }) => {
    setSearch(e.target.value)
  }

  return (
    <div className='searchbar'>
      <Image
        src='/assets/search-gray.svg'
        alt='search'
        width={24}
        height={24}
        className='object-contain'
      />
      <Input
        id='text'
        value={search}
        onChange={handeSearchInput}
        placeholder={`${routeType !== "/search"
          ? "Search communities"
          : "Search creators"
          }`}
        className='no-focus searchbar_input'
      />
    </div>
  );
}

export default Searchbar;