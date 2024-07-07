import { useMutation } from "@tanstack/react-query";
import { createBooking as createBookingAPi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCreateBooking() {
  const { isPending: isBookingCreating, mutate: createBooking } = useMutation({
    mutationFn: createBookingAPi,
    onSuccess: () => toast.success("Booking created successfully"),
    onError: (err) => toast.error(err.message),
  });

  return { isBookingCreating, createBooking };
}
