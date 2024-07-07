import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <Modal>
      <Modal.Control control="create-cabin">
        <Button>Create new cabin</Button>
      </Modal.Control>
      <Modal.Window modalId="create-cabin">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
