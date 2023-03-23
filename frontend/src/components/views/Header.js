import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: ${props => props.height}px;
  background: ${props => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = props => {
    return (
        <Container height={props.height}>

        </Container>
    );
};
export default Header;