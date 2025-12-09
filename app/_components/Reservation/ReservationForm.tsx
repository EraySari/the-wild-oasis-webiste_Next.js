"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useReservation } from "./ReservationContext";
import { createBooking } from "@/app/_lib/data-service";

type FormValues = {
  numGuests: number;
  observations?: string;
};

function ReservationForm({
  maxCapacity,
  cabin_id,
}: {
  maxCapacity: number;
  cabin_id: string;
}) {
  const { range, total_price, num_nights } = useReservation();
  const dateFrom = range?.from?.toDateString();
  const dateTo = range?.to?.toDateString();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  console.log(total_price);
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    if (!range?.from || !range?.to) return;

    const payload = {
      cabin_id: cabin_id,
      guest_id: "1",
      start_date: range.from.toDateString(),
      end_date: range.to.toDateString(),
      num_guests: values.numGuests,
      num_nights: num_nights,
      total_price: total_price,
      observations: values.observations,
    };

    console.log(payload);

    // const newBooking = await createBooking(payload);
    // console.log(newBooking);
  };

  return (
    <div className="bg-primary-800">
      <div className="bg-primary-950 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        {/* <div className='flex gap-4 items-center'>
          <img
            // Important to display google profile images
            referrerPolicy='no-referrer'
            className='h-8 rounded-full'
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div> */}
      </div>

      <form
        className="py-10 px-16 text-lg flex gap-5 flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            {...register("numGuests", {
              required: "Please select number of guests",
              max: { value: maxCapacity, message: `Max ${maxCapacity} guests` },
              valueAsNumber: true,
            })}
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>

          {errors.numGuests && <p>{errors.numGuests.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
            {...register("observations")}
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <p className="text-primary-300 text-base">
            {dateFrom && dateTo ? `${dateFrom} - ${dateTo}` : null}
          </p>

          <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Reserve now
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
