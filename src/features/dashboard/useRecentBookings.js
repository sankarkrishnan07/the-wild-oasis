import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;
  const dateQuery = subDays(new Date(), numDays).toISOString();

  const { data: recentBookings, isLoading: isRecentBookingsLoading } = useQuery(
    {
      queryKey: ["bookings", `last-${numDays}-days`],
      queryFn: () => getBookingsAfterDate(dateQuery),
    }
  );

  return { recentBookings, isRecentBookingsLoading };
}
