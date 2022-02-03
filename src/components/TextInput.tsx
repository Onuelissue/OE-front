import React from 'react';
import { Container, NormalizedImg, Title } from 'src/styles/Common';
import theme from 'src/styles/theme';
import JSUtility from 'src/utilities/JSUtility';
import styled from 'styled-components';


type TextInputProps = {
  value: string;
  errorText?: string;
  placeholder: string;
  onChange?: (e:any) => void;
  error: boolean;
  width?: number;
  type?: string;
  name: string;
};
const minWidth = 365;
const TextInput = ({
  value,
  errorText,
  placeholder,
  onChange,
  error,
  width,
  type,
  name,
}:TextInputProps) => {
  return (
    <Container
      flexDirection='column'
      alignItems='start'
    >
      {
        error
        ? (
          <>
            <Container
              flexDirection='row'
            >
              <ErrInput
              type={ type || "text" }
              placeholder={placeholder}
              value = {value}
              onChange={onChange}
              width={width || minWidth}
              name={name}
              />
              <ErrorImg
                src="img/signUp/inputError.png"
                width={25}
              />
            </Container>
            {
              errorText && (
                <Title
                  fontSize={13}
                  color={theme.colors.treeGreen}
                >
                  {errorText}
                </Title>
              )
            }
          </>

        )
        : (
            <Input
              value={value}
              type={ type || "text" }
              placeholder={placeholder}
              onChange={onChange}
              width={width || minWidth}
              name={name}
            />
        )
      }
    </Container>
  );
};

interface inputProps {
  width: number;
}
const Input = styled.input<inputProps>`
  font-size: ${JSUtility.convertPxToVw(17)};
  padding: ${JSUtility.convertPxToVw(15)} ${JSUtility.convertPxToVw(30)} ${JSUtility.convertPxToVw(15)} ${JSUtility.convertPxToVw(30)};
  border-radius: ${JSUtility.convertPxToVw(7)};
  border: solid 2px ${theme.colors.pinkishGrey};
  width:${(props) => JSUtility.convertPxToVw(props.width)}
`;

const ErrInput = styled(Input)`
  border: solid 2px ${theme.colors.treeGreen};
`;
const ErrorImg = styled(NormalizedImg)`
  display: block;
  position: relative;
  right: ${JSUtility.convertPxToVw(40)}; 
`;
export default TextInput;