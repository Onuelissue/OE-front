import React, { forwardRef } from 'react';
import { Container, NormalizedImg, Title } from 'src/styles/Common';
import theme from 'src/styles/theme';
import JSUtility from 'src/utilities/JSUtility';
import styled, { css } from 'styled-components';


type CustomInputProps = {
  value: string;
  errorText?: string;
  placeholder: string;
  onChange?: (e:any) => void;
  error: boolean;
  width?: number;
  type?: string;
  targetName: string;
};
const minWidth = 365;
const CustomInput = forwardRef<HTMLInputElement,CustomInputProps>((
  {
    value,
    errorText,
    placeholder,
    onChange,
    error,
    width,
    type,
    targetName,
  }: CustomInputProps, 
  ref
) => (
    <Container
      flexDirection='column'
      alignItems='start'
    >
      <>
        <Container
          flexDirection='row'
        >
          <Input
            type={ type || "text" }
            placeholder={placeholder}
            value = {value}
            onChange={onChange}
            width={width || minWidth}
            name={targetName}
            error={error}
            ref={ref}
          />
        {
          error && (
            <ErrorImg
              src="img/signUp/inputError.png"
              width={25}
            />
          )
        }
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
    </Container>
));

interface inputProps {
  width: number;
  error: boolean;
}
const Input = styled.input<inputProps>`
  ${(props) => 
    props.error &&
    css`
      border: solid 2px ${theme.colors.treeGreen};
    `
  };
  ${(props) => 
    ! props.error &&
    css`
      border: solid 2px ${theme.colors.pinkishGrey};
    `
  };
  font-size: ${JSUtility.convertPxToVw(17)};
  padding: ${JSUtility.convertPxToVw(15)} ${JSUtility.convertPxToVw(30)} ${JSUtility.convertPxToVw(15)} ${JSUtility.convertPxToVw(30)};
  border-radius: ${JSUtility.convertPxToVw(7)};
  width:${(props) => JSUtility.convertPxToVw(props.width)}
`;


const ErrorImg = styled(NormalizedImg)`
  display: block;
  position: relative;
  right: ${JSUtility.convertPxToVw(40)}; 
`;
export default CustomInput;