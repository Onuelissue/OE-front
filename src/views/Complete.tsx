import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DefaultHeader, Section, TextButton } from '../common/Components';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import useIsLogin from 'src/hooks/useIsLogin';
import { Container, NormalizedImg, Seperater, Title } from 'src/styles/Common';
import JSUtility from 'src/utilities/JSUtility';
import styled from 'styled-components';
import theme from 'src/styles/theme';



const CustomTitleFontSize = 25;
const imgSize = 250;
const Complete = () => {
  const navigate = useNavigate();
  const navigateRef = useRef<NavigateFunction>(navigate);
  const [ renderNextPage, setRenderNextPage ] = useState(false);
  const { isLogin } = useIsLogin();
  useEffect(() => {
    console.log('완료 페이지');
    if (!isLogin) {
      alert('잘못된 접근입니다');
      navigateRef.current("/");
    }
  }, [isLogin]);

  const onPressNext = () => {
    setRenderNextPage(true);
  };

  const renderOnboarding2 = useCallback(() => (
    <SecondWrapper
      flexDirection='column'
    >
      <NormalizedImg
        src="img/complete/second_center.png"
        width={imgSize+100}
        height={imgSize-30}
        alt="left"
      />
      <Container
        flexDirection='column'
      >
        <Title
          fontSize={CustomTitleFontSize}
          color={theme.colors.grayishBrown}
        >
          설정이 끝났어요!<br/>
          마이페이지에서는 구독 설정을 변경할 수 있어요
        </Title>
        <GotoMyPage
          fontSize={CustomTitleFontSize}
          color={theme.colors.treeGreen}
          onClick={() => navigateRef.current('/mypage')}
        >
          마이페이지로 가볼까요?
        </GotoMyPage>
        <TextButton
          text='홈으로 가기'
          fontSize={CustomTitleFontSize}
          color={theme.colors.grayishBrown}
          onPress={() => navigateRef.current('/')}
        />
      </Container>
    </SecondWrapper>
  ), []);

  const renderOnboarding1 = useCallback(() => (
    <Wrapper
      flexDirection='column'
    >
      <Title
        fontSize={40}
        color={theme.colors.grayishBrown}
      >가입을 환영해요!</Title>
      <Title
        fontSize={CustomTitleFontSize}
        color={theme.colors.grayishBrown}
      >
        이제부터 하루에 2번<br/>구독을 받아볼 수 있답니다!
      </Title>
      <Next onClick={onPressNext}>
          좋아요!
      </Next>
      <Container>
        <Container
          flexDirection='column'
        >
          <NormalizedImg
            src="img/complete/left.png"
            width={imgSize}
            height={imgSize}
            alt="left"
          />
          <Container>
            <NormalizedImg
              src="img/complete/sun.png"
              width={65}
              alt="sun"
            />
            <CustomTitle
              fontSize={CustomTitleFontSize}
              color={theme.colors.grayishBrown}
            >
              오전 8시
            </CustomTitle>
          </Container>
        </Container>
        <Seperater
          direction='horizontal'
          size={300}
        />
        <Container
          flexDirection='column'
        >
          <NormalizedImg
            src="img/complete/right.png"
            width={imgSize+150}
            height={imgSize}
            alt="left"
          />
          <Container>
            <NormalizedImg
              src="img/complete/moon.png"
              width={65}
              alt="moon"
            />
            <CustomTitle
              fontSize={CustomTitleFontSize}
              color={theme.colors.grayishBrown}
            >
              오후 8시
            </CustomTitle>
          </Container>  
        </Container>
      </Container>
    </Wrapper>
  ), []);
  return (
    <Section>
      <DefaultHeader
        alignItems='start'
      />
      { 
        renderNextPage
        ? renderOnboarding2()
        : renderOnboarding1()
      }
    </Section>
  );
};
export default Complete;

const Wrapper = styled(Container)`
  padding: ${JSUtility.convertPxToVw(10)} ${JSUtility.convertPxToVw(230)} ${JSUtility.convertPxToVw(10)} ${JSUtility.convertPxToVw(230)};
`;

const CustomTitle = styled(Title)`
  margin-top: ${JSUtility.convertPxToVw(20)};
`;

const Next = styled.div`
  cursor: pointer;
  width: ${JSUtility.convertPxToVw(110)};
  padding-bottom: ${JSUtility.convertPxToVh(15)};
  color: ${theme.colors.grayishBrown};
  border: solid ${JSUtility.convertPxToVw(10)} ${theme.colors.apple};
  border-radius: ${JSUtility.convertPxToVw(50)};
  box-shadow: 0 ${JSUtility.convertPxToVw(8)} ${JSUtility.convertPxToVw(10)} 0 rgba(0, 0, 0, 0.16);
  padding: ${JSUtility.convertPxToVw(3)} ${JSUtility.convertPxToVw(5)} ${JSUtility.convertPxToVw(3)} ${JSUtility.convertPxToVw(5)};
  background-color: ${theme.colors.white};
  font-size: ${JSUtility.convertPxToVw(20)};
  text-align: center; 
  &:hover, active {
    background-color: ${theme.colors.apple};
    color:${theme.colors.white};
  }
`;

const GotoMyPage = styled(Title)`
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color:${theme.colors.apple};
  }
`;

const SecondWrapper = styled(Container)`
  background-image: url('img/complete/bg.png');
  background-size: 100%;
  background-repeat: no-repeat;
  margin-left:${JSUtility.convertPxToVw(-65)};
  flex: 1;
  padding-top: ${JSUtility.convertPxToVw(100)};
`;
