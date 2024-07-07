import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { id } = useParams();

  const { isLoading, data: booking } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
  });

  return { isLoading, booking };
}
