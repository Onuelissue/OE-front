import React, {useCallback} from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';
import JSUtility from '../utilities/JSUtility';

type TextButtonInput = {
  text: string;
  onPress: ()=>void;
  color?: string;
}
const TextButton = ({
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
    >
      {text}
    </Button>
  );
};
export default TextButton;

const Button = styled.button<{color:string}>`
  cursor: pointer;
  text-align: left;
  fontSize:${JSUtility.convertPxToVw(16)};
  color:${(props) => props.color};
  border: 0;
  font-family: "yg-jalnan", sans-serif;
  background: ${theme.colors.transparent};

  :hover {
    color:${theme.colors.blackAlpha}
  }
`;