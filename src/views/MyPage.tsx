import React, {
  useEffect,
  useCallback,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import useIsLogin from 'src/hooks/useIsLogin';
import {
  CustomButton,
  CustomInput,
} from 'src/common/Components'
import { 
  Container,
  NormalizedImg,
  Title,
  Description,
  Seperater,
} from 'src/styles/Common';

import {
  Inputs,
  STORAGE_KEY_USER_EMAIL,
} from '../constants';

import theme from 'src/styles/theme';
import JSUtility from 'src/utilities/JSUtility';
import styled from 'styled-components';
import {Logo, TextButton} from '../common/Components';
import useValidation from 'src/hooks/useValidation';
import { useDispatch, useSelector } from 'react-redux';
import * as configDuck from 'src/ducks/config';
import { RootState } from 'src/ducks';
import ApiRequest from 'src/api/ApiRequest';

const asideWidth = 440;

const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { checkIsValid } = useValidation();
  const { isLogin, userEmail } = useIsLogin();
  const [password, setPassword] = useState('')
  const [passwordErrors, setPasswordErrors] = useState(false); // 인풋 에러 배열
  const isSubscribed = useSelector((state: RootState) => state.config.isSubscribed);
  const [subscribedStatus, setSubscribedStatus] = useState(isSubscribed);
  const passwordButtonColor = !passwordErrors ? theme.colors.apple : theme.colors.grayishBrown;
  const passwordButtonHoverColor = !passwordErrors ? theme.colors.treeGreen : theme.colors.grayishBrown;
  const imgsrc = subscribedStatus? 'img/mypage/subscribed.png' : 'img/mypage/unsubscribed.png';

  useEffect(() => {
    // 유저 구독 상태 가져오기
    dispatch(configDuck.getUserSubribedStatus(userEmail ?? ''));

  }, [dispatch, userEmail]);
  
  useEffect(() => {
    console.log('완료 페이지');
    if (!isLogin) {
      alert('잘못된 접근입니다');
      navigate("/");
    }
  }, [
    dispatch,
    isLogin,
    navigate,
  ]);

  // input onChange
  const onChange = useCallback((e:any) => {
    const { value } = e.target;
    setPassword(value);
    if (!checkIsValid(Inputs.PASSWORD, value)) {
      console.log('err');
      setPasswordErrors(true);
      return;
    }
    setPasswordErrors(false);
  },[checkIsValid]);


  const onPressPasswordChange = useCallback(async () => {
    if (!password || passwordErrors) {
      alert('비밀번호를 올바르게 입력해주세요');
      return;
    }
    if (userEmail != null) {
      const result = await ApiRequest.updatePassword(userEmail);
      console.log(result);
    };
  }, [password, passwordErrors, userEmail]);

  const onPressSubribed = useCallback(async () => {
    setSubscribedStatus((prev) => !prev);
    if (userEmail != null) {
      //구독 상태 업데이트
      dispatch(configDuck.updateUserSubribedStatus({
        id: userEmail,
        subscribed: subscribedStatus,
      }));
    }
  }, [dispatch, subscribedStatus, userEmail]);

  const onPressLogOut = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY_USER_EMAIL);
    navigate("/");
  }, [navigate]);
  
  return (
  <Wrapper>
    <Aside>
      <Logo/>
    </Aside>
    <Section>
      <Header
        flexDirection='row'
      > 

        <Title
          fontSize={30}
          color={theme.colors.grayishBrown}
        >
            마이페이지
        </Title>
        <TextButton
          text='로그아웃'
          fontSize={20}
          color={theme.colors.grayishBrown}
          onPress={onPressLogOut}        
        />
      </Header>
      <Block
        flexDirection='column'
      >
        <Title
          fontSize={30}
          color={theme.colors.grayishBrown}
        >
            계정 관리
        </Title>
        <InnerBlock
          flexDirection='column'
        >
          <Container flexDirection='row'>
            <Title
              fontSize={20}
              color={theme.colors.grayishBrown}
            >
                구독 계정
            </Title>
            <Seperater
              direction='horizontal'
              size={30}
            />
            <Description>
              {userEmail}
            </Description>
          </Container>
          <Container
            flexDirection='row'
            alignItems='start'
          >
            <Title
              fontSize={20}
              color={theme.colors.grayishBrown}
            >
                비밀번호
            </Title>
            <Seperater
              direction='horizontal'
              size={30}
            />
            <Container
              flexDirection='column'
              alignItems='start'
              justifyContent='center'
            >
              <CustomInput
                targetName={Inputs.PASSWORD}
                value={password}
                placeholder='(8자~15자의 숫자와 영문 조합)'
                onChange={onChange}
                error={passwordErrors}
                width={300}
              />
              {
                passwordErrors && (
                  <Title
                    fontSize={13}
                    color={theme.colors.treeGreen}
                  >
                    잘못된 형식입니다.
                  </Title>  
                )
              }
            </Container>
            <Seperater
              direction='horizontal'
              size={15}
            />
            <CustomButton
              onPress={onPressPasswordChange}
              text='변경'
              color={theme.colors.white}
              hoverColor={passwordButtonHoverColor}
              backgroundColor={passwordButtonColor}
            />
          </Container>
        </InnerBlock>
      </Block>
      <Block
        flexDirection='column'
      >
        <Title
          fontSize={30}
          color={theme.colors.grayishBrown}
        >
            구독 설정
        </Title>
        <InnerBlock
          direction='center'
        >
          <NormalizedImg 
            src={imgsrc}
            alt="logo"
            width={500}
            onClick={onPressSubribed}
          />

        </InnerBlock>
      </Block>
    </Section>
  </Wrapper>
);
  }

const Wrapper = styled.div`
  display:flex;
  flex: 1;
  flex-direction: row;
`;
const Aside = styled(Container)`
  align-items: center;
  justify-content: center;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  width: ${JSUtility.convertPxToVw(asideWidth)};
  background-color: ${theme.colors.offWhite};
`;

const Section = styled.div`
  display:flex;
  flex: 1;
  flex-direction: column;
  margin-left: ${JSUtility.convertPxToVw(asideWidth)};
  padding-left:  ${JSUtility.convertPxToVw(23)};
  padding-right:  ${JSUtility.convertPxToVw(23)};
`;
const Header = styled(Container)`
  display:flex; 
  align-items: center;
  justify-content: space-between; 
  border-bottom: 1px solid ${theme.colors.border};
`;

const Block = styled(Header)`
  align-items: start;
`;

const InnerBlock = styled(Container)<{direction?: string}>`
  background-color: ${theme.colors.offWhite};
  align-self: center;
  align-items: ${(props) => props.direction || 'start'};
  padding-left: ${JSUtility.convertPxToVw(30)};
  width: ${JSUtility.convertPxToVw(870)};
  height: ${JSUtility.convertPxToVh(243)};
`;
export default MyPage;