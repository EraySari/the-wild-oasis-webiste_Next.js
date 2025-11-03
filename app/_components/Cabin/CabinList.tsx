import { getCabins } from "@/app/_lib/data-service";
import CabinCard from "./CabinCard";

export default async function CabinList({ filter }: { filter: string }) {
  const cabins = await getCabins();
  let displayCabins = [] as typeof cabins;

  if (filter === "all") displayCabins = cabins;

  if (filter === "small")
    displayCabins = cabins.filter((cabin) => cabin.max_capacity <= 3);

  if (filter === "medium")
    displayCabins = cabins.filter(
      (cabin) => cabin.max_capacity >= 4 && cabin.max_capacity <= 7
    );

  if (filter === "large")
    displayCabins = cabins.filter((cabin) => cabin.max_capacity >= 8);

  return displayCabins.length > 0 ? (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  ) : null;
}
