import React from 'react';
import styled from 'styled-components';
import Colors from '../styles/Colors';
import JSUtility from '../utilities/JSUtility';

const Logo = () => (
  <Container href="#">
    <img 
      src="img/logo.png"
      alt="logo"
    />
    <Title> 오이 </Title>
  </Container>
);
export default Logo;

const Container = styled.a`
  display:flex;
  flex: 1;
  flex-direction: row;
  align-itmes: center;
  justify-content: flex-start;
  text-decoration: none;
  > img {
    width:${JSUtility.convertPxToVw(35)};
    margin-right:${JSUtility.convertPxToVw(15)};
    align-self: center;
  }
`;

const Title = styled.h1`
  font-size:${JSUtility.convertPxToVw(30)};
  color:${Colors.apple};
  align-self: center;
`;