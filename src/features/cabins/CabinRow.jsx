import styled from "styled-components";
import PropTypes from "prop-types";

import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import CreateCabinForm from "./CreateCabinForm";
import {
  HiEllipsisVertical,
  HiPencil,
  HiSquare2Stack,
  HiTrash,
} from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabin } = useCreateCabin();

  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of cabin ${cabin.name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });
  }

  return (
    <Table.Row>
      <Img src={image} alt="cabin-image" />
      <Cabin>{name}</Cabin>
      <div>Fits upto {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{discount > 0 ? formatCurrency(discount) : "-"}</Discount>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id}>
              <HiEllipsisVertical />
            </Menus.Toggle>
            <Menus.List id={id}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Dupliacte
              </Menus.Button>

              <Modal.Control control="update">
                <Menus.Button icon={<HiPencil />}>Update</Menus.Button>
              </Modal.Control>

              <Modal.Control control="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Control>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window modalId="update">
            <CreateCabinForm cabinToUpdate={cabin} />
          </Modal.Window>

          <Modal.Window modalId="delete">
            <ConfirmDelete
              resourceName={name}
              onConfirm={() => deleteCabin(id)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

CabinRow.propTypes = {
  cabin: PropTypes.any,
};

export default CabinRow;
