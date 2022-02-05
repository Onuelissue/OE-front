import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
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
  STORAGE_KEY_USER_EMAIL,
  TermsOfService,
  RouteNames,
} from '../constants';
import CheckBox from 'src/components/CheckBox';
import CustomInput from 'src/components/CustomInput';
import styled from 'styled-components';
import JSUtility from 'src/utilities/JSUtility';
import ApiRequest from 'src/api/ApiRequest';

enum AgreementIds {
  TERMS_OF_SERVICE = 'terms_of_service',
  PRIVACY = 'privacy',
}

enum Inputs {
  ID = 'id',
  PASSWORD = 'password',
  PASSWORD_CHECK = 'passwordCheck',
  EMAIL_CHECK = 'emailCheck',
  DUPLICATED_EMAIL = 'duplicatedEmail',
}



const updateInputArrayState = (
  setState: Dispatch<SetStateAction<Inputs[]>>,
  ShouldRemove: boolean,
  id: Inputs,
) => {
  setState((prev) => {
    if (ShouldRemove) {
      return prev.filter((key) => key !== id);
    }
    return [...prev, id];
  })
};

const SignUp = () => {
  const navigate = useNavigate();
  
  // FIXME: Ref array로 한꺼번에 관리하도록
  const emailRef = useRef<HTMLInputElement>(null);
  const emailCheckRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCheckRef = useRef<HTMLInputElement>(null);
  const [checkedAgreements, setCheckedAgreements] = useState<AgreementIds[]>([]); // 체크 박스 배열
  const [inputErrors, setInputErrors] = useState<Inputs[]>([]); // 인풋 에러 배열
  const [finishedInputs, setFinishedInputs] = useState<Inputs[]>([]); // 입력 완료된 인풋 배열
  const [isCheckMailSent, setIsCheckMailSent] = useState(false); // 이메일 인증 번호 전송 여부
  const [inputValues, setInputValues] = useState({ // 인풋 값 배열
    id: '',
    password: '',
    passwordCheck: '',
    emailCheck: '',
  });
  const {id, password, passwordCheck, emailCheck } = inputValues;
  const requiredCheck = ( // 체크 박스 필수 사항 체크
    checkedAgreements.includes(AgreementIds.TERMS_OF_SERVICE)
    && checkedAgreements.includes(AgreementIds.PRIVACY)
  );
  // 체크 박스 눌렀을 때 
  const onPressCheckBox = useCallback((agreementKey) => {
    if (agreementKey == null) return ;
    setCheckedAgreements((prevCheckedAgreement) => {
      if (prevCheckedAgreement.includes(agreementKey)){
        return prevCheckedAgreement.filter((key) => key !== agreementKey);
      }
      return [...prevCheckedAgreement, agreementKey];
    })
  },[]);
  
  // 체크 박스 정보
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

  // 이메일 인증 번호 전송
  const sendEmailCerfication = useCallback(() => {
    if (finishedInputs.includes(Inputs.ID)) {
      alert('입력하신 메일로 인증번호를 전송했습니다.');
      setIsCheckMailSent(true);
      return;
    }
    alert('이메일 입력을 확인해주세요');
    return;
  }, [finishedInputs]);

  // 이메일 인증 번호 확인
  const checkEmailCerfication = useCallback(async () => {
    if (inputValues.emailCheck === '') {
      alert('인증 번호를 입력해주세요');
      return;
    }
    console.log(isCheckMailSent);
    if (finishedInputs.includes(Inputs.EMAIL_CHECK) || !isCheckMailSent) {
      return;
    }
    const correctNumber = await ApiRequest.checkEmailCertification(inputValues.emailCheck);
    if (correctNumber) {
      alert('인증이 완료되었습니다.');
    }
    updateInputArrayState(setFinishedInputs,!correctNumber,Inputs.EMAIL_CHECK);
    updateInputArrayState(setInputErrors,correctNumber,Inputs.EMAIL_CHECK);
  }, [finishedInputs, inputValues.emailCheck, isCheckMailSent]);
  
  // 이메일 중복 체크
  const emailDuplicationCheck = useCallback(async () => {
    const { id : email } = inputValues;
    if (inputErrors.includes(Inputs.ID) || inputValues.id === '') {
      alert('이메일을 제대로 입력해주세요');
      return;
    }
    try {
      const isAlreadyExist = await ApiRequest.checkEmailDuplication(email);
      updateInputArrayState(setInputErrors, isAlreadyExist, Inputs.DUPLICATED_EMAIL);
      updateInputArrayState(setFinishedInputs, !isAlreadyExist, Inputs.ID);
      console.log(isAlreadyExist);
    } catch(e) {
      console.log(e);
    }
  }, [inputErrors, inputValues]);

  // 이메일 비밀 번호 유효성 검사
  const validCheck = useCallback((name: Inputs , value: string) => {
    let isValid = true;
    // eslint-disable-next-line no-useless-escape
    var emailRegex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    var passwordRegex=/^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,15}$/;

    switch(name) {
      case Inputs.ID:
        isValid = (value !== '' &&  emailRegex.test(value)); 
        break;
      case Inputs.PASSWORD:
        isValid = (value !== '' &&  passwordRegex.test(value)); 
        break;
    }
    updateInputArrayState(setInputErrors, isValid, name );
    return isValid;
  }, []);

  // 입력 폼들 체크
  const requiredCheckAll = useCallback(() => {
    console.log(finishedInputs);
    if (!requiredCheck) {
      alert('필수 항목에 동의해주세요');
      return false;
    }
    if (!finishedInputs.includes(Inputs.ID)) {
      alert('이메일 입력이 완료되지 않았습니다.');
      emailRef.current?.focus();
      return false;
    }
    if (!finishedInputs.includes(Inputs.EMAIL_CHECK)) {
      alert('이메일 인증 완료되지 않았습니다.');
      emailCheckRef.current?.focus();
      return false;
    }
    if (!finishedInputs.includes(Inputs.PASSWORD)) {
      alert('비밀 번호를 입력해주세요.');
      passwordRef.current?.focus();
      return false;
    }
    if (!finishedInputs.includes(Inputs.PASSWORD_CHECK)) {
      alert('비밀 번호 확인을 입력해주세요.');
      passwordCheckRef.current?.focus();
      return false;
    }
    return true;
  },[finishedInputs, requiredCheck]);

  const submit = useCallback(async () => {
    const isAllValid = requiredCheckAll();
    if (isAllValid) {
      try {
        const result = await ApiRequest.signUp({
          email: inputValues.id,
          password: inputValues.password,
        });
        if (result) {
          //로컬 스토리지에 정보 저장
          localStorage.setItem(STORAGE_KEY_USER_EMAIL,inputValues.id);
          navigate(RouteNames.COMPLETE);
        }
      } catch(e) {
        console.log(e);
      }
    }
  }, [
    inputValues.id,
    inputValues.password,
    navigate,
    requiredCheckAll,
  ]);

  // input onChange
  const onChange = useCallback((e:any) => {
    const {value, name} = e.target;
    setInputValues((prev) => ({
      ...prev,
      [name] : value,
    }));
    // 각 input 별 오류 처리
    switch(name) {
      case Inputs.ID:
        if (finishedInputs.includes(Inputs.ID)) {
          setFinishedInputs((prev) => (
            prev.filter((key) => key!==Inputs.ID && key !== Inputs.EMAIL_CHECK)
          ));
        }
        setInputErrors((prev) => (
          prev.filter((key) => key !== Inputs.DUPLICATED_EMAIL)
        ));
        validCheck(name,value);
        break;
      case Inputs.EMAIL_CHECK:
        console.log(' 이메일 인증 번호');
        break;
      case Inputs.PASSWORD:
        const isValid = validCheck(name,value);
        updateInputArrayState(setFinishedInputs, !isValid, Inputs.PASSWORD);
        if (finishedInputs.includes(Inputs.PASSWORD)) {
          setFinishedInputs((prev) => (
            prev.filter((key) => key!==Inputs.PASSWORD && key !== Inputs.PASSWORD_CHECK)
          ));
        }
        if (inputValues.passwordCheck.length > 1) {
          updateInputArrayState(setInputErrors, inputValues.passwordCheck === value, Inputs.PASSWORD_CHECK );
        }
        break;
      case Inputs.PASSWORD_CHECK:
        const passwordCheckPass = inputValues.password === value;
        if (finishedInputs.includes(Inputs.PASSWORD_CHECK)) {
          setFinishedInputs((prev) => (
            prev.filter((key) => key !== Inputs.PASSWORD_CHECK)
          ));
        }
        if (passwordCheckPass) {
          setFinishedInputs((prev) => [...prev, Inputs.PASSWORD_CHECK]);
        }
        updateInputArrayState(setInputErrors, passwordCheckPass, Inputs.PASSWORD_CHECK );
        break;
    }
  },[finishedInputs, validCheck, inputValues.passwordCheck, inputValues.password]);


  const inputs = useMemo(() => ([
    {
      name: Inputs.ID,
      value: id,
      labelText: '이메일',
      errorText: inputErrors.includes(Inputs.ID)
        ? '올바른 이메일 형식이 아닙니다'
        : inputErrors.includes(Inputs.DUPLICATED_EMAIL)
          ? '이미 존재하는 이메일입니다.'
          :'올바른 이메일 형식이 아닙니다',
      placeholder:'이메일을 입력하세요 ex) onuelissue@gmail',
      onChange,
      ref: emailRef,
      error: inputErrors.includes(Inputs.ID) || inputErrors.includes(Inputs.DUPLICATED_EMAIL),
      width: 570,
      rightRenderView: (
        <CustomButton
          onPress={emailDuplicationCheck}
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
      ref: emailCheckRef,
      error: inputErrors.includes(Inputs.EMAIL_CHECK),
      rightRenderView: (
        <CustomButton
          onPress={checkEmailCerfication}
          text={ finishedInputs.includes(Inputs.EMAIL_CHECK) ? '인증 완료' :'인증 확인' }
          color={theme.colors.white}
          backgroundColor={finishedInputs.includes(Inputs.EMAIL_CHECK)? theme.colors.apple : theme.colors.grayishBrown }
        />
      ),
      leftRenderView: (
        <CustomButton
          onPress={sendEmailCerfication}
          text='인증번호 전송'
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
      ref: passwordRef,
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
      ref: passwordCheckRef,
      width: 737,
      error: inputErrors.includes(Inputs.PASSWORD_CHECK),
    },
  ]), [
    checkEmailCerfication,
    emailCheck,
    emailDuplicationCheck,
    finishedInputs,
    id,
    inputErrors,
    onChange,
    password,
    passwordCheck,
    sendEmailCerfication,
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
                      <CustomInput
                        targetName={item.name}
                        type={item.type}
                        value={item.value}
                        placeholder={item.placeholder}
                        onChange={item.onChange}
                        error={item.error}
                        width={item.width}
                        ref={item.ref}
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
        onPress={submit}
        text='회원 가입'
        color={theme.colors.white}
        backgroundColor={theme.colors.apple}
        hoverColor={theme.colors.treeGreen}
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