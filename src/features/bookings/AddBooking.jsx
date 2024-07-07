import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateBookingForm from "./CreateBookingForm";

function AddBooking() {
  return (
    <Modal>
      <Modal.Control control="newBooking">
        <Button>New Booking</Button>
      </Modal.Control>
      <Modal.Window modalId="newBooking">
        <CreateBookingForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddBooking;
