"use client";

import { useSearchParams } from "next/navigation";
import AdvanceSearch from "@/app/components/property-list/search";

export default function ClientPage() {
  const searchParams = useSearchParams();

  const location = searchParams.get("location") ?? "";
  const tag = searchParams.get("tag") ?? "";

  return <AdvanceSearch location={location} tag={tag} />;
}
