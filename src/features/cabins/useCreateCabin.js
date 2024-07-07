import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createUpdateCabin,
    onSuccess: (data) => {
      toast.success(`Cabin ${data.name} created successfully `);
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      toast.error(err.message);
      console.error(err);
    },
  });

  return { isCreating, createCabin };
}
