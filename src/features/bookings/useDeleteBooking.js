import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success(`Booking deleted successfully`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => {toast.error("There was an error deleting the booking");
        console.error(err)
    },
  });

  return { isDeleting, deleteBooking };
}
