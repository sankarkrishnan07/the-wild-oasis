import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";
import PropTypes from "prop-types";

function CheckoutButton({ bookingId }) {
  const { isCheckingout, checkout } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingout}
    >
      Check out
    </Button>
  );
}

CheckoutButton.propTypes = {
  bookingId: PropTypes.any,
};

export default CheckoutButton;
