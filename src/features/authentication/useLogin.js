import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending: isLoggingin, mutate: login } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/", { replace: true });
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  return { isLoggingin, login };
}
