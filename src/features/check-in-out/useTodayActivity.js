import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const { isLoading: isActivitiesLoading, data: activities } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
  });

  return { isActivitiesLoading, activities };
}
