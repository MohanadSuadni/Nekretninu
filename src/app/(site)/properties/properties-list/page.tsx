'use client';

import { useSearchParams } from 'next/navigation';
import AdvanceSearch from "@/app/components/property-list/search/";

export default function Page() {
  const searchParams = useSearchParams();
  const params = {
    location: searchParams?.get('location') ?? "",
    tag: searchParams?.get('tag') ?? ""
  };

  return <AdvanceSearch location={params.location} tag={params.tag} />;
}
