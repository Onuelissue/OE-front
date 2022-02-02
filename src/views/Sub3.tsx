import React from 'react';
import {
  Section,
  HighlightableText,
} from '../common/Components';
import {
  NormalizedImg,
  RightContainer,
  Button,
  Container,
} from 'src/styles/Common';
import styled from 'styled-components';
import theme from 'src/styles/theme';


const Sub3 = () => (
  <Section
    flexDirection='row'
  >   
    <Container>
      <NormalizedImg
        width={253}
        src="img/sub3/person.png"
        alt="person"
      />
    <RightContainerInherit>
        <HighlightableText
          text='[오이]가 알려주는\n 실시간 검색 랭킹'
          fontSize={40}
          textColor={theme.colors.black}
          highlightedTextColor={theme.colors.apple}
        />
        <Button>
          구독 신청하기
      </Button>
    </RightContainerInherit>

    </Container>

  </Section>
  )

export default Sub3;

const RightContainerInherit = styled(RightContainer)`
  align-self: center;
`;
