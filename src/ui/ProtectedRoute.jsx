import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-grey-50);
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading)
    return (
      <Wrapper>
        <Spinner />
      </Wrapper>
    );

  if (isAuthenticated) return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.any,
};

export default ProtectedRoute;
