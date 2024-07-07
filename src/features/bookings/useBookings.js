import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue }; //default filter method is equal, for others pass method parameter with values like "lte", "gte" etc...

  const sort = searchParams.get("sortBy") || "startDate-asc";
  const [field, value] = sort.split("-");
  const sortBy = { field, value };

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const { isLoading, data: { data: bookings, count } = {} } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings(filter, sortBy, page),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings(filter, sortBy, page + 1),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings(filter, sortBy, page - 1),
    });
  }

  return { isLoading, bookings, count };
}
