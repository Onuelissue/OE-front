import React, {useCallback} from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';
import JSUtility from '../utilities/JSUtility';

type TextButtonInput = {
  fontSize?: number;
  text: string;
  onPress: ()=>void;
  color?: string;
}
const TextButton = ({
  fontSize,
  text,
  color,
  onPress
}:TextButtonInput) => {
  const onClick = useCallback(()=>{
    onPress();
  },[onPress]);

  return (
    <Button
      onClick={onClick}
      color={ color || theme.colors.black }
      fontSize={fontSize || 16}
    >
      {text}
    </Button>
  );
};
export default TextButton;


type StyledTextButtonInput = {
  fontSize?: number;
  color?: string;
}
const Button = styled.button<StyledTextButtonInput>`
  cursor: pointer;
  text-align: left;
  font-size:${(props) => JSUtility.convertPxToVw(props.fontSize)};
  color:${(props) => props.color};
  border: 0;
  font-family: "yg-jalnan", sans-serif;
  background: ${theme.colors.transparent};

  :hover {
    color:${theme.colors.blackAlpha}
  }
`;