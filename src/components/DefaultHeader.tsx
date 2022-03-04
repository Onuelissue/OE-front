import React from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';
import JSUtility from '../utilities/JSUtility';
import Logo from './Logo';


type DefaultHeaderProps = {
  alignItems?: string;
  height?:number;
  fontSize?:number;
}
const DefaultHeader = ({
  alignItems,
  height,
  fontSize,
}: DefaultHeaderProps) => (
  <Header
    alignItems={alignItems || 'center'}
    height={height || 80}
  >
    <Logo fontSize={fontSize}/>
  </Header>
);
export default DefaultHeader;

const Header = styled.div<DefaultHeaderProps>`
  display:flex;
  position:absolute;
  left: 0;
  right: 0;
  top: 0;
  flex: 1;
  flex-direction: column;
  align-items: ${(props) => props.alignItems};
  justify-content: center;
  background-color:${theme.colors.offWhite};
  padding: ${JSUtility.convertPxToVw(10)} ${JSUtility.convertPxToVw(90)} ${JSUtility.convertPxToVw(10)} ${JSUtility.convertPxToVw(90)};
  height: ${(props) => JSUtility.convertPxToVh(props.height)};
  box-shadow: 0px 2px 15px 3px ${theme.colors.blackAlpha03};
`;
