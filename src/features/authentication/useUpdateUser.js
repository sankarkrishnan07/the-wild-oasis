import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
        queryClient.invalidateQueries({ active: true });
    //   queryClient.setQueryData(["user", user]);
      toast.success("Account updated successfully");
    },
    onError: (error) => toast.error(error.message),
  });

  return { isUpdating, updateUser };
}
