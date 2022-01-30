import React, {useCallback} from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';
import JSUtility from '../utilities/JSUtility';

type TextButtonInput = {
  text: string;
  onPress: ()=>void;
}
const TextButton = ({
  text,
  onPress
}:TextButtonInput) => {
  const onClick = useCallback(()=>{
    alert('dd');
    onPress();
  },[onPress]);

  return (
    <Button onClick={onClick}>
      {text}
    </Button>
  );
};
export default TextButton;

const Button = styled.button`
  cursor: pointer;
  text-align: left;
  fontSize:${JSUtility.convertPxToVw(15)};
  color:${theme.colors.black};
  border: 0;
  font-family: "yg-jalnan", sans-serif;
  background: ${theme.colors.transparent};

  :hover {
    color:${theme.colors.blackAlpha}
  }
`;