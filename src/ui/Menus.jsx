import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: absolute;
  z-index: 1;
  min-width: max-content;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosistion] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ open, close, openId, position, setPosistion }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
}

function Toggle({ children, id }) {
  const { openId, open, close, setPosistion } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosistion({
      // x: window.innerWidth - rect.width - rect.x,
      // y: rect.y + rect.height + 8,
      x: -8,
      y: rect.height + 8,
    });

    openId !== id ? open(id) : close();
  }

  return <StyledToggle onClick={handleClick}>{children}</StyledToggle>;
}

function List({ children, id }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  return (
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.propTypes = {
  children: PropTypes.any,
};

Menu.propTypes = {
  children: PropTypes.any,
};

Toggle.propTypes = {
  children: PropTypes.any,
  id: PropTypes.any,
};

List.propTypes = {
  children: PropTypes.any,
  id: PropTypes.any,
};

Button.propTypes = {
  children: PropTypes.any,
  icon: PropTypes.any,
  onClick: PropTypes.func,
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
