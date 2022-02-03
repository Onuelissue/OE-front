import React from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';
import JSUtility from '../utilities/JSUtility';
import Logo from './Logo';

const DefaultHeader = () => (
  <Header>
    <Logo/>
  </Header>
);
export default DefaultHeader;

const Header = styled.div`
  display:flex;
  position:absolute;
  left: 0;
  right: 0;
  top: 0;
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color:${theme.colors.offWhite};
  padding: ${JSUtility.convertPxToVw(10)} ${JSUtility.convertPxToVw(90)} ${JSUtility.convertPxToVw(10)} ${JSUtility.convertPxToVw(90)};
  height: ${JSUtility.convertPxToVh(70)};
  box-shadow: 0px 2px 15px 3px ${theme.colors.blackAlpha03};
`;
