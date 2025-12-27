import AdvanceSearch from "@/app/components/property-list/search/";

type PageProps = {
  searchParams?: {
    location?: string;
    tag?: string;
  };
};

const Page = ({ searchParams }: PageProps) => {
  return (
    <AdvanceSearch
      location={searchParams?.location ?? ""}
      tag={searchParams?.tag ?? ""}
    />
  );
};

export default Page;
