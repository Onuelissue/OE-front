import React from 'react';
import theme from 'src/styles/theme';
import { 
  SectionContainer
} from 'src/styles/Common';

type SectionInput = {
  children: React.ReactNode;
  background?: string;
  flexDirection?:string;
}
const Section = ({ 
  children,
  background,
  flexDirection,
 }: SectionInput) => (
  <SectionContainer
    background={background || theme.colors.white}
    flexDirection={flexDirection || 'row'}
  >
    {children}
  </SectionContainer>
);

export default Section;

