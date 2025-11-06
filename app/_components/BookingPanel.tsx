import {
  Cabin,
  getBookedDatesBycabin_id,
  getSettings,
} from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./Reservation/ReservationForm";

export async function BookingPanel({ cabin }: { cabin: Cabin }) {
  const [bookedDates, settings] = await Promise.all([
    getBookedDatesBycabin_id(cabin.id),
    getSettings(),
  ]);

  return (
    <div className="grid grid-cols-2 mt-8 border border-primary-800">
      <DateSelector
        cabin={cabin}
        bookedDates={bookedDates}
        settings={settings}
      />
      <ReservationForm maxCapacity={cabin.max_capacity} />
    </div>
  );
}
