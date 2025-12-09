"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useReservation } from "./Reservation/ReservationContext";

export function ReservationReminder() {
  const { range, resetRange } = useReservation();

  if (!range?.to || !range?.from) return null;
  return (
    <div className="fixed left-1/2 bottom-6 border -translate-x-1/2 flex items-center gap-5 px-5 py-3 rounded-full bg-accent-600 border-none text-lg">
      <p>
        Don't forget to your reserve dates from <br />
        <span className="font-bold">{`${range?.from?.toDateString()} - ${range?.to?.toDateString()}`}</span>
      </p>

      <button
        className="w-6 h-6 transition-all duration-200 ease-in-out
hover:text-accent-700 hover:scale-125 "
        onClick={resetRange}
      >
        <XMarkIcon />
      </button>
    </div>
  );
}
