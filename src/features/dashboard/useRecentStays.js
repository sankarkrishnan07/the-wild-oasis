import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;
  const dateQuery = subDays(new Date(), numDays).toISOString();

  const { data: recentStays, isLoading: isRecentStaysLoading } = useQuery({
    queryKey: ["stays", `last-${numDays}-days`],
    queryFn: () => getStaysAfterDate(dateQuery),
  });

  const confirmedStays = recentStays?.filter(
    (recentStay) =>
      recentStay.status === "checked-in" || recentStay.status === "checked-out"
  );

  return { recentStays, isRecentStaysLoading, confirmedStays, numDays };
}
