import React from 'react';
import { 
  Button,
  ImgText,
  LeftContainer,
  NormalizedImg,
  RightContainer,
  Title,
} from 'src/styles/Common';
import styled from 'styled-components';
import {Section} from '../common/Components';

type MainInput = {
  link: string;
};

const Main = ({
  link,
}:MainInput) => (
  <Section>
    <LeftContainer>
      <Title
        fontSize={30}
      >
        당신만 모르는 오늘의 이슈 <br/>
        오이가 전해줄게요!
      </Title>
      <Button to={link}>
        구독 신청하기
    </Button>
    </LeftContainer>
    <RightContainer>
      <RightImg
        src="img/main/main.png"
        alt="main"
        width={470}
      /> 
      <ImgText>
        상기 랭킹은 예시이며 실제 실시간 검색어 차트와 다를 수 있습니다.
      </ImgText>
    </RightContainer>
  </Section>
);
export default Main;
const RightImg = styled(NormalizedImg)`
  align-self: center;
`;