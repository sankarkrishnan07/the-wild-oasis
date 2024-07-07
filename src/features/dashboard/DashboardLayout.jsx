import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { recentBookings, isRecentBookingsLoading } = useRecentBookings();
  const { isRecentStaysLoading, confirmedStays, numDays } = useRecentStays();
  const { isLoading: isCabinsLoading, cabins } = useCabins();

  if (isRecentBookingsLoading || isRecentStaysLoading || isCabinsLoading)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        recentBookings={recentBookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={recentBookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
