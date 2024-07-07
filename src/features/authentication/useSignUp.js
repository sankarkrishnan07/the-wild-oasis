import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { isPending: isSigningUp, mutate: signUp } = useMutation({
    mutationFn: signUpApi,
    onSuccess: ({ user }) => {
      toast.success(
        `Account ${user.user_metadata.fullName} successfully created! Please verify the new account from the user's email address.`
      );
    },
    onError: (error) => toast.error(error.message),
  });

  return { isSigningUp, signUp };
}
