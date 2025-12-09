"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Cabin, Settings } from "../_lib/data-service";

import { useReservation } from "./Reservation/ReservationContext";
import { useEffect, useMemo } from "react";

// function isAlreadyBooked(range, datesArr) {
//   return (
//     range.from &&
//     range.to &&
//     datesArr.some((date) =>
//       isWithinInterval(date, { start: range.from, end: range.to })
//     )
//   );
// }

interface DateSelectorProps {
  cabin: Cabin;
  bookedDates: Date[];
  settings: Settings;
}

function DateSelector({ cabin, bookedDates, settings }: DateSelectorProps) {
  const { regular_price, discount } = cabin;

  const { range, setRange, resetRange, num_nights, setTotalPrice } =
    useReservation();

  const { min_booking_length, max_booking_length } = settings;

  const discountValue = discount ?? 0;
  const hasDiscount = discountValue > 0;

  const pricePerNight = useMemo(
    () => regular_price - discountValue,
    [regular_price, discountValue]
  );

  useEffect(() => {
    setTotalPrice(num_nights > 0 ? pricePerNight * num_nights : 0);
  }, [num_nights, pricePerNight, setTotalPrice]);

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        selected={range}
        onSelect={setRange}
        min={min_booking_length + 1}
        max={max_booking_length}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 1}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={bookedDates}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {hasDiscount ? (
              <>
                <span className="text-2xl">${regular_price - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regular_price}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regular_price}</span>
            )}
            <span className="">/night</span>
          </p>
          {num_nights && hasDiscount ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{num_nights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">
                  ${(regular_price - discount) * num_nights}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
