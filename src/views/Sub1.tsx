import React from 'react';
import {Section} from '../common/Components';
import { 
  Container,
  Description,
  NormalizedImg,
  TextContainer,
  Title,
} from 'src/styles/Common';
import styled from 'styled-components';
import JSUtility from '../utilities/JSUtility';

const Sub1 = () => (
  <Section>
    <Container>
      <NormalizedImg
        src="img/sub1/left.png"
        alt="left"
        width={200}
      />
      <TextContainer>
        <Title       
          fontSize={30}
          marginBottom={72}
          >
          "언제 어디서든 실시간 검색어 확인"
        </Title>
        <Description>
          오늘 무슨 일이 있길래 다들 바쁘지? <br/>
          아직도 주변 살피기만 바쁜가요?<br/>
          이젠 세상 돌아가는 흐름을 가장 먼저 파악해 보세요!
        </Description>
      </TextContainer>
      <RightImg
        src="img/sub1/right.png"
        alt="left"
        width={259}
        height={205}
      />
    </Container>
  </Section>
)

export default Sub1;
const RightImg  = styled(NormalizedImg)`
  margin-top: ${JSUtility.convertPxToVh(-80)}
`;
