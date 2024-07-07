import { HiArrowRightStartOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const { isLoggingout, logout } = useLogout();

  return (
    <ButtonIcon onClick={logout} disabled={isLoggingout}>
      {isLoggingout ? <SpinnerMini /> : <HiArrowRightStartOnRectangle />}
    </ButtonIcon>
  );
}

export default Logout;
