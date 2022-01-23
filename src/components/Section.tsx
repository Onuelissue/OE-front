import React from 'react';
import styled from 'styled-components';
import JSUtility from '../utilities/JSUtility';


type SectionInput = {
  children: React.ReactNode;
}
const Section = ({ children }: SectionInput) => (
  <Container>
    {children}
  </Container>
);

export default Section;

const Container = styled.div`
  display:flex;
  flex: 1;
  flex-direction: row;
  align-itmes: center;
  justify-content: center;
  padding: ${JSUtility.convertPxToVw(90)} 0.5vw ${JSUtility.convertPxToVw(90)} 0.5vw;
`; 