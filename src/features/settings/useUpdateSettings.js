import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: (data) => {
      toast.success("Settings updated successfully");
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => {
      toast.error("Could not update setting");
      console.error(err.message);
    },
  });

  return { isUpdating, updateSetting };
}

export default useUpdateSettings;
