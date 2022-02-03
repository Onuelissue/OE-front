import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CustomButton,
  DefaultHeader,
  Section,
  TextButton,
} from '../common/Components';
import { useNavigate } from 'react-router-dom';
import { Container, Seperater, Title } from 'src/styles/Common';
import theme from '../styles/theme';
import {
  PrivacyPolicy,
  TermsOfService,
} from '../constants';
import CheckBox from 'src/components/CheckBox';
import TextInput from 'src/components/TextInput';
import styled from 'styled-components';
import JSUtility from 'src/utilities/JSUtility';

enum AgreementIds {
  TERMS_OF_SERVICE = 'terms_of_service',
  PRIVACY = 'privacy',
}

enum Inputs {
  ID = 'id',
  PASSWORD = 'password',
  PASSWORD_CHECK = 'passwordCheck',
  EMAIL_CHECK = 'emailCheck',
}



const SignUp = () => {
  const navigate = useNavigate();
  const [checkedAgreements, setCheckedAgreements] = useState<AgreementIds[]>([]);
  const [inputErrors, setInputErrors] = useState<Inputs[]>([]);
  const [finishedInputs, setFinishedInputs] = useState<Inputs[]>([]);
  const [inputValues, setInputValues] = useState({
    id: '',
    password: '',
    passwordCheck: '',
    emailCheck: '',
  });
  const {id, password, passwordCheck, emailCheck } = inputValues;
  const requiredCheck = (
    checkedAgreements.includes(AgreementIds.TERMS_OF_SERVICE)
    && checkedAgreements.includes(AgreementIds.PRIVACY)
  );
  const onPressCheckBox = useCallback((agreementKey) => {
    if (agreementKey == null) return ;
    setCheckedAgreements((prevCheckedAgreement) => {
      if (prevCheckedAgreement.includes(agreementKey)){
        return prevCheckedAgreement.filter((key) => key !== agreementKey);
      }
      return [...prevCheckedAgreement, agreementKey];
    })
  },[]);
  
  const checkBoxes = useMemo(() => ([
    {
      id: AgreementIds.TERMS_OF_SERVICE,
      isChecked: checkedAgreements.includes(AgreementIds.TERMS_OF_SERVICE),
      setIsChecked: onPressCheckBox,
      text: '이용약관 동의(필수)',
      openUrl: TermsOfService,
    },
    {
      id: AgreementIds.PRIVACY,
      isChecked: checkedAgreements.includes(AgreementIds.PRIVACY),
      setIsChecked: onPressCheckBox,
      text: '개인정보 처리방침 동의(필수)',
      openUrl: PrivacyPolicy,
    },
  ]), [
    checkedAgreements,
    onPressCheckBox,
  ]);

  const onChange = (e:any) => {
    const {value, name} = e.target;
    setInputValues((prev) => ({
      ...prev,
      [name] : value,
    }));
    switch(name) {
      case Inputs.ID:
        console.log(' 아이디');
        break;
      case Inputs.EMAIL_CHECK:
        console.log(' 이메일 인증 번호');
        break;
      case Inputs.PASSWORD:
        console.log(' 비밀 번호 ');
        break;
      case Inputs.PASSWORD_CHECK:
        console.log(' 비밀 번호 확인 ');
        break;
    }
  };


  const inputs = useMemo(() => ([
    {
      name: Inputs.ID,
      value: id,
      labelText: '아이디',
      errorText: '이미 존재하는 아이디입니다.',
      placeholder:'이메일을 입력하세요 ex) onuelissue@gmail',
      onChange,
      error: inputErrors.includes(Inputs.ID),
      width: 570,
      rightRenderView: (
        <CustomButton
          onPress={()=>{}}
          text={ finishedInputs.includes(Inputs.ID) ? '사용 가능' :'중복 확인' }
          color={theme.colors.white}
          backgroundColor={finishedInputs.includes(Inputs.ID)? theme.colors.apple : theme.colors.grayishBrown }
        />
      )
    },
    {
      name: Inputs.EMAIL_CHECK,
      value:emailCheck,
      labelText: ' ',
      errorText: '인증 번호가 일치하지 않습니다.',
      placeholder:'인증 번호 입력',
      onChange,
      error: inputErrors.includes(Inputs.EMAIL_CHECK),
      rightRenderView: (
        <CustomButton
          onPress={()=>{}}
          text={ finishedInputs.includes(Inputs.ID) ? '인증 완료' :'인증 확인' }
          color={theme.colors.white}
          backgroundColor={finishedInputs.includes(Inputs.ID)? theme.colors.apple : theme.colors.grayishBrown }
        />
      ),
      leftRenderView: (
        <CustomButton
          onPress={()=>{}}
          text='이메일 인증하기'
          color={theme.colors.white}
          backgroundColor={theme.colors.grayishBrown}
        />
      )
    },
    { 
      name: Inputs.PASSWORD,
      type: 'password',
      value: password,
      labelText: '비밀번호',
      errorText: '잘못된 형식입니다.',
      placeholder:'(8자~15자의 숫자와 영문 조합)',
      onChange,
      width: 737,
      error: inputErrors.includes(Inputs.PASSWORD),
    },
    {
      name: Inputs.PASSWORD_CHECK,
      type: 'password',
      value: passwordCheck,
      labelText: '비밀번호 확인',
      errorText: '비밀번호가 일치하지 않습니다.',
      placeholder:'비밀번호를 재입력해주세요',
      onChange,
      width: 737,
      error: inputErrors.includes(Inputs.PASSWORD_CHECK),
    },
  ]), [
    emailCheck,
    finishedInputs,
    id,
    inputErrors,
    password,
    passwordCheck
  ]);

  const renderInputs = useCallback(() => (
    <>
      {
        inputs.map((item, index) => {
            return (
                <React.Fragment key= {`inputs-${index}`}>
                <Container
                  flexDirection='column'
                  alignItems='start'
                >
                  <Title fontSize={20}>{item.labelText}</Title>
                  <InputContainer
                  >
                    {item.leftRenderView && (
                      <>
                      {item.leftRenderView}
                      <Seperater
                        direction='horizontal'
                        size={15}
                      />
                      </>
                    )}
                    <Container
                      flexDirection='column'
                      alignItems='start'
                    >
                      <TextInput
                        name={item.name}
                        type={item.type}
                        value={item.value}
                        placeholder={item.placeholder}
                        onChange={onChange}
                        error={item.error}
                        width={item.width}
                      />
                      {
                        item.error && (
                          <Title
                            fontSize={13}
                            color={theme.colors.treeGreen}
                          >
                            {item.errorText}
                          </Title>  
                        )
                      }

                    </Container>
                    <Seperater
                      direction='horizontal'
                      size={15}
                    />
                    {item.rightRenderView && (
                      item.rightRenderView
                    )}
                  </InputContainer>
                </Container>
              </React.Fragment>
            )
        })
      }
    </>
  ),[inputs]);
  const renderCheckBoxes = useCallback(() => (
    <>
      {
        checkBoxes.map((item, index) => (
          <React.Fragment key= {`checkBox- ${index}`}>
            <CheckBox
              id={item.id}
              isChecked={item.isChecked}
              setIsChecked={item.setIsChecked}
              text={item.text}
              openUrl={item.openUrl}
            />
          </React.Fragment>
        ))
      }
    </>
  ), [checkBoxes]);
  return (
    <Section
      flexDirection='column'
    >
      <DefaultHeader/>
      <Seperater
        direction='vertical'
        size={15}
      />
      <Container
        flexDirection='row'
      >
        <Title
          fontSize={18}
        >
        이미 가입을 하셨나요?
        </Title>
        <TextButton
          text="로그인"
          onPress={()=>navigate("/signin")}
          color={theme.colors.apple}
        />
      </Container>
      <Container
        flexDirection='column'
      >
        {renderCheckBoxes()}
      </Container>
        {renderInputs()}

      <Seperater
        direction='vertical'
        size={15}
      />
      <CustomButton
        onPress={()=>{}}
        text='회원 가입'
        color={theme.colors.white}
        backgroundColor={theme.colors.apple}
      />
    </Section>
  );
};
export default SignUp;


const InputContainer = styled(Container)`
  width: ${JSUtility.convertPxToVw(800)};
  align-items: start;
  justify-content: space-between;
`;