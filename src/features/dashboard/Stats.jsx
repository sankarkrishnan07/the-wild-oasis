import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import Proptypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";

function Stats({ recentBookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = recentBookings.length;
  const sales = recentBookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const numCheckins = confirmedStays.length;
  const occupancy =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        value={numBookings}
        icon={<HiOutlineBriefcase />}
        color="blue"
      />
      <Stat
        title="Sales"
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
        color="green"
      />
      <Stat
        title="Check ins"
        value={numCheckins}
        icon={<HiOutlineCalendarDays />}
        color="indigo"
      />
      <Stat
        title="Occupancy rate"
        value={`${Math.round(occupancy * 100)} %`}
        icon={<HiOutlineChartBar />}
        color="yellow"
      />
    </>
  );
}

Stats.propTypes = {
  recentBookings: Proptypes.any,
  confirmedStays: Proptypes.any,
  numDays: Proptypes.number,
  cabinCount: Proptypes.number,
};

export default Stats;
