import React from 'react';
import {
  Section,
  HighlightableText,
} from '../common/Components';
import {
  LeftContainer,
  NormalizedImg,
  RightContainer,
} from 'src/styles/Common';
import styled from 'styled-components';
import theme from 'src/styles/theme';
import JSUtility from 'src/utilities/JSUtility';


const Sub3 = () => (
  <Section
    flexDirection='row'
  >   
    <LeftContainerInherit>
      <NormalizedImg
        width={293}
        src="img/sub3/person.png"
        alt="person"
      />
    </LeftContainerInherit>
    <RightContainerInherit>
        <HighlightableText
          text='[오이]가 알려주는\n 실시간 검색 랭킹'
          fontSize={30}
          textColor={theme.colors.black}
          highlightedTextColor={theme.colors.apple}
        />
    </RightContainerInherit>

  </Section>
  )

export default Sub3;

const LeftContainerInherit = styled(LeftContainer)`
  padding-left: ${JSUtility.convertPxToVw(142)};
`;
const RightContainerInherit = styled(RightContainer)`
  align-self:center;
`;
