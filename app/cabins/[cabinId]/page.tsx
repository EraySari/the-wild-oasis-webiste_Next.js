import { getCabin, getCabins } from "@/app/_lib/data-service";
import { notFound } from "next/navigation";
import { BookingPanel } from "@/app/_components/BookingPanel";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import { CabinCard } from "@/app/_components/Cabin/Cabin";

export const revalidate = 60;
export async function generateMetadata({
  params,
}: {
  params: { cabinId: string };
}) {
  const cabin = await getCabin(params.cabinId);

  if (!cabin) {
    return {
      title: "Cabin not found",
    };
  }

  return {
    title: `Cabin ${cabin.name}`,
    description: cabin.description,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => {
    return { cabinId: String(cabin.id) };
  });

  return ids;
}

export default async function Page({
  params,
}: {
  params: { cabinId: string };
}) {
  const cabin = await getCabin(params.cabinId);

  if (!cabin) {
    return notFound();
  }

  return (
    <div className="max-w-[90rem] mx-auto mt-8 ">
      <CabinCard cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <BookingPanel cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
