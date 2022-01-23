import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import Colors from '../styles/Colors';
import JSUtility from '../utilities/JSUtility';
import {
  Main,
  Sub1,
  Sub2,
} from '../common/Views';
import {
  Logo,
  TextButton,
} from '../common/Components';
const Welcome = () => {

  const views = useMemo(()=>{
    const renders = [
      <Main/>,
      <Sub1/>,
      <Sub2/>,
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

  return (
    <>
      <Header>
        <Logo/>
        <TextButton
          onPress={()=>{}}
          text='로그인'
        />
        <Seperator/>
        <TextButton
          onPress={()=>{}}
          text='회원가입'
        />
      </Header>
        { renderViews() }
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
  background-color:${Colors.offWhite};
  padding: ${JSUtility.convertPxToVw(10)} ${JSUtility.convertPxToVw(90)} ${JSUtility.convertPxToVw(10)} ${JSUtility.convertPxToVw(90)};
  height: ${JSUtility.convertPxToVh(70)}
`
const Seperator = styled.div`
  width: 3vw;
`;

export default Welcome;