import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending: isLoggingout, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
        console.log("yes")
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { isLoggingout, logout };
}
