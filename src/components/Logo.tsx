import React from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';
import JSUtility from '../utilities/JSUtility';
import { Link } from 'react-router-dom';

type LogoInput = {
  fontSize?: number;
}
const Logo = ({
  fontSize,
}:LogoInput) => (
  <Container to ="/">
    <img 
      src="img/logo.png"
      alt="logo"
    />
    <Title
      fontSize={fontSize || 35}
    > 오이 </Title>
  </Container>
);
export default Logo;

const Container = styled(Link)`
  display:flex;
  flex: 1;
  flex-direction: row;
  align-item: center;
  justify-content: flex-start;
  text-decoration: none;
  > img {
    width:${JSUtility.convertPxToVw(45)};
    margin-right:${JSUtility.convertPxToVw(15)};
    align-self: center;
  }
`;

const Title = styled.h1<{fontSize:number}>`
  font-size:${(props) => JSUtility.convertPxToVw(props.fontSize)};
  color:${theme.colors.apple};
  align-self: center;
`;