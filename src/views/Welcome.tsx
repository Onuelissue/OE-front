import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';
import JSUtility from '../utilities/JSUtility';
import { useNavigate } from "react-router-dom";
import {
  Main,
  Sub1,
  Sub2,
  Sub3,
} from '../common/Views';
import {
  Logo,
  TextButton,
} from '../common/Components';
import {
  PrivacyPolicy,
  TermsOfService,
  TermsOfEmail,
} from '../constants';

import { Container, Title } from 'src/styles/Common';
const Welcome = () => {
  const navigate = useNavigate();
  const isAnonymous = true;
  const signUpLink = "/signup";
  const views = useMemo(()=>{
    const renders = [
      <Main link={signUpLink}/>,
      <Sub1/>,
      <Sub2/>,
      <Sub3 link={signUpLink}/>,
    ]
    return renders;
  },[]);
  
  const renderViews = useCallback(()=>(
    <>
    {
      views.map((view,index) => {
        return (
          <React.Fragment key={`page-${index}`}>
            {view}
          </React.Fragment>
        )
      })
    }
    </>
  ),[views]);
  
  const opneURl = useCallback((url) => {
    window.location.href=url;
  },[]);
  return (
    <>
      <Header>
        <Logo/>
        {
          isAnonymous
          ? (
            <>
              <TextButton
                onPress={() => navigate("signin")}
                text='로그인'
              />
              <Seperator/>
              <TextButton
                onPress={() => navigate("signup")}
                text='구독하기'
              />
            </>

          )
          : (
            <>
              <TextButton
                onPress={()=>{}}
                text='로그아웃'
              />
              <Seperator/>
              <TextButton
                onPress={()=>{}}
                text='마이페이지'
              />
            </>
          )
        }
      </Header>
        { renderViews() }
      <Footer>
        <Logo/>
        <Wrapper>
          <Container
            flexDirection='row'
          >
            <Title fontSize={14}> &nbsp;문의 사항  </Title>
            <Small fontSize={10}>onuelissue@gmail.com</Small>

          </Container>
          <Container
            flexDirection='row'
          >
            <TextButton
              onPress={()=>opneURl(TermsOfService)}
              text='이용약관'
            />
            <TextButton
              onPress={()=>opneURl(PrivacyPolicy)}
              text='개인정보처리방침'
            />
            <TextButton
              onPress={()=>opneURl(TermsOfEmail)}
              text='이메일무단수집거부'
            />
          </Container>

        </Wrapper>
      </Footer>
    </>
  );
}

const Header = styled.div`
  display:flex;
  position:fixed;
  left: 0;
  right: 0;
  top: 0;
  flex: 1;
  flex-direction: row;
  background-color:${theme.colors.offWhite};
  padding: ${JSUtility.convertPxToVw(10)} ${JSUtility.convertPxToVw(90)} ${JSUtility.convertPxToVw(10)} ${JSUtility.convertPxToVw(90)};
  height: ${JSUtility.convertPxToVh(70)};
  box-shadow: 0px 2px 15px 3px ${theme.colors.blackAlpha03};
`
const Seperator = styled.div`
  width: 3vw;
`;

const Footer = styled.div`
  display:flex;
  flex: 1;
  flex-direction: row;
  align-itmes: center;
  justify-content: center;
  background-color:${theme.colors.offWhite};
  padding: ${JSUtility.convertPxToVw(30)} ${JSUtility.convertPxToVw(90)} ${JSUtility.convertPxToVw(30)} ${JSUtility.convertPxToVw(90)};
`;

const Wrapper = styled(Container)`
  flex-direction:column;
  flex: 1;
  align-items:start;
  justify-self: center;
  position:absolute; 
  left:${JSUtility.convertPxToVw(250)};
`;

const Small = styled(Title)`
  align-self:center;
  margin-left: ${JSUtility.convertPxToVw(10)};
`;
export default Welcome;