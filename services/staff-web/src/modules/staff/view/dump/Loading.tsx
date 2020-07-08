import React from "react";
//@ts-ignore
import LoadingOverlay from "react-loading-overlay";
import styled from "styled-components";

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const Loading: React.FC = ({ children }) => (
  <LoadingContainer>
    <LoadingOverlay
      active={true}
      styles={{
        wrapper: {
          width: "100%",
          height: "100%",
          minHeight: "50px",
          overflow: "initial",
          display: "inherit",
          justifyContent: "inherit",
        },
      }}
      spinner
    >
      {children}
    </LoadingOverlay>
  </LoadingContainer>
);
export { Loading };
