import React from 'react';
import {Section} from '../common/Components';
import {
  Description,
  ImgText,
  LeftContainer,
  NormalizedImg,
  RightContainer,
  Title 
} from 'src/styles/Common';
import theme from 'src/styles/theme';


const Sub2 = () => (
  <Section
    background={theme.colors.offWhite}
    flexDirection='row'
  >
      <LeftContainer>
        <Title
          fontSize={30}
        >
        "구독형 메일 서비스"
        </Title>
        <Description>
          신문 볼 시간도, 검색할 시간도 없는
          당신을 위한 솔루션.<br/>

          루틴에 따라 구독 시간을 설정하고 
          메일로 이슈 레터를 받아보세요.<br/>

        </Description>
      </LeftContainer>
      <RightContainer>
        <NormalizedImg
            src="img/sub2/mockup.png"
            alt="mockup"
            width={700}
          /> 
        <ImgText>
          상기 랭킹은 예시이며 실제 실시간 검색어 차트와 다를 수 있습니다.
        </ImgText>

      </RightContainer>

  </Section>
  )

export default Sub2;
