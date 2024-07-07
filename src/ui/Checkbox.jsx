import PropTypes from "prop-types";
import StyledCheckbox from "./StyledCheckbox";


function Checkbox({ checked, onChange, disabled = false, id, children }) {
  return (
    <StyledCheckbox>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={!disabled ? id : ""}>{children}</label>
    </StyledCheckbox>
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  id: PropTypes.any,
  children: PropTypes.any,
};

export default Checkbox;
