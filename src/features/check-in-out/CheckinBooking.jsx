import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useEffect, useState } from "react";
import { useCheckin } from "./useCheckIn";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();

  const { isLoading, booking = {} } = useBooking();
  const { isCheckingin, checkin } = useCheckin();
  const { settings = {}, isLoading: isSettingsLoading } = useSettings();

  const [confirmPayment, setConfirmPayment] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  useEffect(() => setConfirmPayment(booking.isPaid ?? false), [booking]);

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPayment) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  if (isLoading || isSettingsLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((checked) => !checked);
              setConfirmPayment(false);
            }}
          >
            Wants to Include Breakfast for{" "}
            {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id="confirm-payment"
          checked={confirmPayment}
          onChange={() => setConfirmPayment((checked) => !checked)}
          disabled={confirmPayment || isCheckingin}
        >
          I confirm that {guests.fullName} has paid the full amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmPayment || isCheckingin}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
