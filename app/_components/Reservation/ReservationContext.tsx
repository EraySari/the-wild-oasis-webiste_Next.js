"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { DateRange } from "react-day-picker";

type ReservationContextType = {
  range: DateRange | undefined;
  setRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  resetRange: () => void;
  num_nights: number;
  total_price: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
};

const ReservationContext = createContext<ReservationContextType | null>(null);

function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [total_price, setTotalPrice] = useState(0);

  const resetRange = useCallback(() => {
    setRange(undefined);
  }, []);

  const num_nights = useMemo(() => {
    if (!range?.from || !range?.to) return 0;
    const diff =
      (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24);
    return Math.ceil(diff);
  }, [range]);

  const value = useMemo(
    () => ({
      range,
      setRange,
      resetRange,
      num_nights,
      total_price,
      setTotalPrice,
    }),
    [range, resetRange, num_nights, total_price]
  );
  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) throw new Error("Context was used outside provider");
  return context;
}

export { ReservationProvider, useReservation };
