import React from 'react';
import styled from 'styled-components';
import Colors from '../styles/Colors';
import JSUtility from '../utilities/JSUtility';
import {Section} from '../common/Components';

const Sub1 = () => (
  <Section>
    <Container>
      <LeftImg src="img/sub1/left.png" alt="left"/>
      <TextContainer>
        <Title>
          "언제 어디서든 실시간 검색어 확인"
        </Title>
        <Description>
          오늘 무슨 일이 있길래 다들 바쁘지? <br/>
          아직도 주변 살피기만 바쁜가요?<br/>
          이젠 세상 돌아가는 흐름을 가장 먼저 파악해 보세요!
        </Description>
      </TextContainer>
      <RightImg src="img/sub1/right.png" alt="right"/>
    </Container>
  </Section>
)

export default Sub1;

const Container = styled.div`
  display:flex;
  flex-direction: row;
  align-itmes: center;
  justify-content: center;
`;
const TextContainer = styled.div`
  display:flex;
  flex: 1;
  flex-direction: column;
  align-itmes: center;
  align-self:start;
  justify-content: center;
  margin-left: ${JSUtility.convertPxToVw(50)};
  margin-right: ${JSUtility.convertPxToVw(50)};
`;
const LeftImg = styled.img`
  width:${JSUtility.convertPxToVw(200)};
  height:${JSUtility.convertPxToVw(373)};

`;
const RightImg = styled.img`
  width:${JSUtility.convertPxToVw(259)};
  height:${JSUtility.convertPxToVw(205)};
  margin-top: ${JSUtility.convertPxToVh(-80)}
`;


const Title = styled.h1`
  font-size:${JSUtility.convertPxToVw(30)};
  margin-bottom: ${JSUtility.convertPxToVw(72)}
  line-height: 1.7;
  color:${Colors.black};
  align-self: center;
  text-align: center;
`;

const Description = styled.p`
  font-size:${JSUtility.convertPxToVw(20)};
  lien-height:${JSUtility.convertPxToVh(74)};
  color:${Colors.black};
  align-self: center;
  font-family: 'Noto Sans KR', sans-serif;
  text-align: center;
`;