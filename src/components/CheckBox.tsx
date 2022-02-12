import React, { useCallback } from 'react';
import { Container, NormalizedImg, Title } from 'src/styles/Common';
import theme from 'src/styles/theme';
import JSUtility from 'src/utilities/JSUtility';
import styled from 'styled-components';


type CheckBoxProps = {
  id?: string;
  isChecked: boolean;
  text: string;
  setIsChecked: (id?: string) => void;
  openUrl?: string;
};
const CheckBox = ({
  id,
  isChecked,
  text,
  setIsChecked,
  openUrl,
}:CheckBoxProps) => {
  const imgName = isChecked ? 'checkbox_check.png' : 'checkbox.png';
  const imgSource = `img/signUp/${imgName}`;
  const onClick = useCallback(() => {
    setIsChecked(id);
  },[
    id,
    setIsChecked
  ]);
  return (
    <StyledContainer
      flexDirection='row'
    >
      <NormalizedImg
        width={30}
        src={imgSource}
        alt="logo"
        onClick={onClick}
      />
        <StyledTitle
          fontSize={17}
        >
          {text}
        </StyledTitle>
        { openUrl && (
          <StyledLink href={openUrl}>
            <Title
              fontSize={15}
              color={theme.colors.pinkishGrey}
            > 더보기 </Title>
          </StyledLink>
        )}
    </StyledContainer>
  );
};
export default CheckBox;

const StyledContainer = styled(Container)`
  align-items: center;
  justify-content: start;
  width: ${JSUtility.convertPxToVw(800)};
  align-self:start;
`;

const StyledTitle = styled(Title)`
  flex: 1;
  text-align: left;
  margin-left: ${JSUtility.convertPxToVw(15)};
  justify-selft: center;
`;

const StyledLink = styled.a`
  text-decoration:none;
  margin-right: ${JSUtility.convertPxToVw(15)}
`;