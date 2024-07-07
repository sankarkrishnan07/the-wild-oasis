import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateCabin } = useMutation({
    mutationFn: ({ updateCabinData, id }) =>
      createUpdateCabin(updateCabinData, id),
    onSuccess: (data) => {
      toast.success(`Cabin ${data.name} updated successfully `);
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      toast.error(err.message);
      console.error(err);
    },
  });

  return { isUpdating, updateCabin };
}

