import React,
{
  useState,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import {
  CustomButton,
  DefaultHeader,
  HighlightableText,
  Section,
} from '../common/Components';
import theme from 'src/styles/theme';
import ApiRequest from 'src/api/ApiRequest';
import { RouteNames, STORAGE_KEY_USER_EMAIL } from 'src/constants';
import { useNavigate } from 'react-router-dom';
import { Container, Seperater, Title } from 'src/styles/Common';
import CustomInput from 'src/components/CustomInput';
import styled from 'styled-components';


enum Result {
  OK = 1,
  EMAIL_ERROR = 2,
  PASSWORD_ERROR = 3,
}

enum Inputs {
  ID = 'id',
  PASSWORD = 'password',
}


const inputWidth = 300;

const SignIn = () => {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [inputValues, setInputValues] = useState({ // 인풋 값 배열
    id: '',
    password: '',
  });
  const [inputErrors, setInputErrors] = useState<Inputs[]>([]); // 인풋 에러 배열
  const {id, password} = inputValues;
   // 입력 폼들 체크

  const requiredCheckAll = useCallback(() => {
    if (id === '') {
      alert('이메일 입력이 완료되지 않았습니다.');
      emailRef.current?.focus();
      return false;
    }
    if (password === '') {
      alert('비밀 번호를 입력해주세요.');
      passwordRef.current?.focus();
      return false;
    }
    return true;
  },[id, password]);

  const submit = useCallback(async () => {
    const isAllValid = requiredCheckAll();
    if (isAllValid) {
      try {
        const result = await ApiRequest.signIn({
          email: inputValues.id,
          password: inputValues.password,
        });

        switch (result){
          case Result.OK:
            //로컬 스토리지에 정보 저장
            localStorage.setItem(STORAGE_KEY_USER_EMAIL,inputValues.id);
            navigate('/');
          break;
          case Result.EMAIL_ERROR:
            emailRef.current?.focus();
            setInputErrors((prev) => ([...prev, Inputs.ID]));
          break;
          case Result.PASSWORD_ERROR:
            passwordRef.current?.focus();
            setInputErrors((prev) => ([...prev, Inputs.PASSWORD]));
          break;

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
  },[]);


  const inputs = useMemo(() => ([
    {
      name: Inputs.ID,
      value: id,
      labelText: '이메일',
      errorText: inputErrors.includes(Inputs.ID)
        ? '등록되지 않은 이메일입니다.'
        : '',
      placeholder:'이메일을 입력하세요',
      onChange,
      ref: emailRef,
      error: inputErrors.includes(Inputs.ID),
      width: inputWidth,
    },
    { 
      name: Inputs.PASSWORD,
      type: 'password',
      value: password,
      labelText: '비밀번호',
      errorText: '비밀번호가 일치하지 않습니다.',
      placeholder:'비밀번호를 입력하세요',
      onChange,
      ref: passwordRef,
      width: inputWidth,
      error: inputErrors.includes(Inputs.PASSWORD),
    },
  ]),
  [
    id,
    inputErrors,
    onChange,
    password,
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

                      </InputContainer>
                      <Seperater
                        direction='horizontal'
                        size={15}
                      />
                  </Container>
              </React.Fragment>
            )
        })
      }
    </>
  ),[inputs]);
  return ( 
  
    <Section
      flexDirection='column'
    >
      <DefaultHeader alignItems='center'/>
      <Seperater
        direction='vertical'
        size={55}
      />
      {renderInputs()}
      <Seperater
        direction='vertical'
        size={35}
      />
      <CustomButton
        onPress={submit}
        text='로그인'
        color={theme.colors.white}
        backgroundColor={theme.colors.apple}
        hoverColor={theme.colors.treeGreen}
      />
      <Seperater
        direction='vertical'
        size={35}
      />
      <Wrapper
        onClick={()=> navigate(RouteNames.SIGN_UP)}
      >
        <HighlightableText
          text='아직 가입을 하지 않으셨나요? [회원가입]'
          fontSize={15}
          textColor={theme.colors.black}
          highlightedTextColor={theme.colors.apple}
        /> 
      </Wrapper>
      <Wrapper
        onClick={()=> navigate(RouteNames.FINDPASSWORD)}
      >
        <HighlightableText
          text='비밀번호를 잊으셨나요? [비밀번호 찾기]'
          fontSize={15}
          textColor={theme.colors.black}
          highlightedTextColor={theme.colors.apple}
        />
      </Wrapper>
    </Section>
  );
}
export default SignIn;

const InputContainer = styled(Container)`
  align-items: start;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  cursor: pointer;
`;

