import React, {useCallback} from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';
import JSUtility from '../utilities/JSUtility';

type TextButtonInput = {
  text: string;
  onPress: ()=>void;
  color?: string;
  backgroundColor?: string;
}
const CustomButton = ({
  text,
  color,
  backgroundColor,
  onPress
}:TextButtonInput) => {
  const onClick = useCallback(()=>{
    onPress();
  },[onPress]);

  return (
    <Button
      onClick={onClick}
      color={ color || theme.colors.black }
      backgroundColor={ backgroundColor || theme.colors.transparent}
    >
      {text}
    </Button>
  );
};
export default CustomButton;

interface ButtonInput {
  color: string;
  backgroundColor: string;
}
const Button = styled.a<ButtonInput>`
  cursor: pointer;
  text-align: center;
  font-size:${JSUtility.convertPxToVw(15)};
  color:${(props) => props.color};
  padding: ${JSUtility.convertPxToVw(15)} ${JSUtility.convertPxToVw(30)}  ${JSUtility.convertPxToVw(15)}  ${JSUtility.convertPxToVw(30)}  ;
  border-radius: ${JSUtility.convertPxToVw(6)};
  background-color:${(props) => props.backgroundColor};

  :hover {
    background-color:${theme.colors.blackAlpha}
  }
`;