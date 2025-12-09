import { eachDayOfInterval } from "date-fns";
import { supabase } from "./supabase";

export type Cabin = {
  id: string;
  name: string;
  max_capacity: number;
  regular_price: number;
  discount: number | null;
  image: string | null;
  description: string | null;
};

export type Guest = {
  id: string;
  full_name: string;
  email: string;
  nationalty: string | null;
  national_id?: string | null;
  country?: string | null;
  country_flag?: string | null;
  [key: string]: unknown;
};

export type Booking = {
  id: string;
  created_at: string;
  start_date: string;
  end_date: string;
  num_nights: number;
  num_guests: number;
  total_price: number;
  status?: "unconfirmed" | "checked-in" | "checked-out" | "cancelled";
  guest_id: string;
  cabin_id: string;
  observations?: string;
};

export type Settings = {
  id: number;
  min_booking_length: number;
  max_booking_length: number;
  max_guest_perBooking: number;
  breakfast_price: number;
  [key: string]: unknown;
};

export type Country = { name: string; flag: string };

/* =========================
   GET
   ========================= */

export async function getCabin(id: string): Promise<Cabin | null> {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single<Cabin>();

  if (error) console.error(error);
  return data ?? null;
}

export async function getCabinPrice(
  id: string
): Promise<Pick<Cabin, "regular_price" | "discount"> | null> {
  const { data, error } = await supabase
    .from("cabins")
    .select("regular_price, discount")
    .eq("id", id)
    .single<Pick<Cabin, "regular_price" | "discount">>();

  if (error) console.error(error);
  return data ?? null;
}

export async function getCabins(): Promise<
  Array<
    Pick<
      Cabin,
      "id" | "name" | "max_capacity" | "regular_price" | "discount" | "image"
    >
  >
> {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, max_capacity, regular_price, discount, image")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return (data ?? []) as Array<
    Pick<
      Cabin,
      "id" | "name" | "max_capacity" | "regular_price" | "discount" | "image"
    >
  >;
}

export async function getGuest(email: string): Promise<Guest | null> {
  const { data } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single<Guest>();

  return data ?? null;
}

export async function getBooking(id: string): Promise<Booking> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single<Booking>();

  if (error || !data) {
    console.error(error);
    throw new Error("Booking could not get loaded");
  }

  return data;
}

type BookingListItem = Pick<
  Booking,
  | "id"
  | "created_at"
  | "start_date"
  | "end_date"
  | "num_nights"
  | "num_guests"
  | "total_price"
  | "guest_id"
  | "cabin_id"
>;

type CabinMini = Pick<Cabin, "name" | "image">;
export type BookingWithCabin = BookingListItem & { cabins: CabinMini | null };

export async function getBookings(
  guest_id: string
): Promise<BookingWithCabin[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, created_at, start_date, end_date, num_nights, num_guests, total_price, guest_id, cabin_id, cabins(name, image)"
    )
    .eq("guest_id", guest_id)
    .order("start_date");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  const normalized: BookingWithCabin[] = (data ?? []).map((row) => ({
    id: row.id,
    created_at: row.created_at,
    start_date: row.start_date,
    end_date: row.end_date,
    num_nights: row.num_nights,
    num_guests: row.num_guests,
    total_price: row.total_price,
    guest_id: row.guest_id,
    cabin_id: row.cabin_id,
    cabins: Array.isArray(row.cabins)
      ? row.cabins[0] ?? null
      : row.cabins ?? null,
  }));

  return normalized;
}

export async function getBookedDatesBycabin_id(
  cabin_id: string
): Promise<Date[]> {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayIso = today.toISOString();

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabin_id", cabin_id)
    .or(`start_date.gte.${todayIso},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  const bookedDates =
    (data as Booking[])
      .map((booking) =>
        eachDayOfInterval({
          start: new Date(booking.start_date),
          end: new Date(booking.end_date),
        })
      )
      .flat() ?? [];

  return bookedDates;
}

export async function getSettings(): Promise<Settings> {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .single<Settings>();

  //await new Promise((res) => setTimeout(res, 5000));

  if (error || !data) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}

export async function getCountries(): Promise<Country[]> {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries: Country[] = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

/* =========================
   CREATE
   ========================= */

export async function createGuest(newGuest: Omit<Guest, "id">): Promise<Guest> {
  const { data, error } = await supabase
    .from("guests")
    .insert([newGuest])
    .select()
    .single<Guest>();

  if (error || !data) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}

export async function createBooking(
  newBooking: Omit<Booking, "id" | "created_at">
): Promise<Booking> {
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    .select()
    .single<Booking>();

  if (error || !data) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  return data;
}

/* =========================
   UPDATE
   ========================= */

export async function updateGuest(
  id: string,
  updatedFields: Partial<Guest>
): Promise<Guest> {
  const { data, error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single<Guest>();

  if (error || !data) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  return data;
}

export async function updateBooking(
  id: string,
  updatedFields: Partial<Booking>
): Promise<Booking> {
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single<Booking>();

  if (error || !data) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

/* =========================
   DELETE
   ========================= */

export async function deleteBooking(id: string): Promise<null> {
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return null;
}
