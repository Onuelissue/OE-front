import React from 'react';
import styled from 'styled-components';
import Colors from '../styles/Colors';
import JSUtility from '../utilities/JSUtility';
import {Section} from '../common/Components';

const Main = () => (
  <Section>
    <LeftContainer>
      <Title>
        당신만 모르는 오늘의 이슈 <br/>
        오이가 전해줄게요!
      </Title>
      <Button>
        구독 신청하기
    </Button>
    </LeftContainer>
    <RightContainer>
      <img src="img/main/main.png" alt="main"/> 
      <ImgText>
        상기 랭킹은 예시이며 실제 실시간 검색어 차트와 다를 수 있습니다.
      </ImgText>
    </RightContainer>
  </Section>
);
export default Main;

const LeftContainer = styled.div`
  display:flex;
  flex: 1;
  flex-direction: column;
  align-itmes: start;
  justify-content: center;
`;
const RightContainer = styled.div`
  display:flex;
  flex: 1;
  flex-direction: column;
  align-itmes: center;
  justify-content: end;
  > img {
    width: ${JSUtility.convertPxToVw(400)};
    align-self: center;
  }
`;

const Title = styled.h1`
  font-size:${JSUtility.convertPxToVw(25)};
  line-height: 1.7;
  color:${Colors.black};
  align-self: center;
  text-align: center;
`;

const ImgText = styled.p`
  font-size:${JSUtility.convertPxToVw(5)};
  color:${Colors.pinkishGrey};
  align-self: center;
  text-align: center;
`;

const Button = styled.a`
  cursor: pointer;
  text-align: center;
  color:${Colors.white};
  font-size:${JSUtility.convertPxToVw(20)};
  width:${JSUtility.convertPxToVw(157)};
  padding: ${JSUtility.convertPxToVw(19)} ${JSUtility.convertPxToVw(53)};
  align-self:center;
  border: 0;
  border-radius:8px;
  background: ${Colors.apple};
  :hover {
    background: ${Colors.treeGreen};
  }
`;