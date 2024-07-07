import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isLoading, booking } = useBooking();
  const { isCheckingout, checkout } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  if (!booking) return <Empty resource="booking" />;

  const { id, status } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal>
          <Modal.Control control="delete">
            <Button variation="danger">Delete Booking</Button>
          </Modal.Control>
          <Modal.Window modalId="delete">
            <ConfirmDelete
              resourceName={`booking #${id}`}
              onConfirm={() =>
                deleteBooking(id, {
                  onSuccess: navigate(-1),
                })
              }
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${id}`)}>Check in</Button>
        )}
        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(id)}
            disabled={isCheckingout}
          >
            Check Out
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
