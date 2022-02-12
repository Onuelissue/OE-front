import React,
{
  useState,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import {
  DefaultHeader,
  Section,
} from '../common/Components';
import theme from 'src/styles/theme';
import ApiRequest from 'src/api/ApiRequest';
import { Container, Description, Seperater, Title } from 'src/styles/Common';
import CustomInput from 'src/components/CustomInput';
import styled from 'styled-components';
import JSUtility from 'src/utilities/JSUtility';
import { useNavigate } from 'react-router-dom';


enum Result {
  OK = 1,
  EMAIL_ERROR = 2,
}


const inputWidth = 300;

const FindPassword = () => {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const [id, setId] = useState('')
  const [idErrors, setIdErrors] = useState(false); // 인풋 에러 배열
  const [sendEmail, setSendEmail] = useState(false); // 인풋 에러 배열
   // 입력 폼들 체크

  const requiredCheckAll = useCallback(() => {
    if (id === '') {
      alert('이메일 입력이 완료되지 않았습니다.');
      emailRef.current?.focus();
      return false;
    }
    return true;
  },[id]);

  const submit = useCallback(async () => {
    const isAllValid = requiredCheckAll();
    if (isAllValid) {
      try {
        const result = await ApiRequest.resetPassword(id);
        switch (result){
          case Result.OK:
            setSendEmail(true);
          break;
          case Result.EMAIL_ERROR:
            emailRef.current?.focus();
            setIdErrors(true);
          break;
        }
      } catch(e) {
        console.log(e);
      }
    }
  }, [id, requiredCheckAll]);

  // input onChange
  const onChange = useCallback((e:any) => {
    const { value } = e.target;
    setId(value);
  },[]);


  const inputs = useMemo(() => ([
    {
      name: id,
      value: id,
      labelText: '이메일',
      errorText: idErrors
        ? '등록되지 않은 이메일입니다.'
        : '',
      placeholder:'이메일을 입력하세요',
      onChange,
      ref: emailRef,
      error: idErrors,
      width: inputWidth,
    },
  ]),
  [id, idErrors, onChange]);

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
                      <InputContainer
                        flexDirection='column'
                        alignItems='start'
                      >
                        <CustomInput
                          targetName={item.name}
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

  const renderFinishPage = useCallback(()=> (
    <Section
      flexDirection='column'
    >
      <Seperater
        direction='vertical'
        size={75}
      />
      <Title
        fontSize={25}
        color={theme.colors.grayishBrown}
      >
        인증번호 발송 완료
      </Title>
      <Description>
        입력하신 이메일로 임시 비밀번호를 발송했습니다. <br/>
        메일 확인 후 임시 비밀번호로 로그인해 주세요. <br/>
        로그인 후 비밀번호를 변경해 주시기 바랍니다.
      </Description>
      <DefaultHeader
        alignItems='center'
        height={120}
        fontSize={50}
      />
      <Seperater
        direction='vertical'
        size={55}
      />
      
      <Next onClick={()=> navigate('/')}>
        확인
      </Next>
    </Section>
  ), [navigate]);

  const renderSendPage = useCallback(()=> (
    <Section
      flexDirection='column'
    >
      <Seperater
        direction='vertical'
        size={75}
      />
      <Title
        fontSize={25}
        color={theme.colors.grayishBrown}
      >
        이메일 확인
      </Title>
      <Description>
        계정 확인 및 본인 확인을 위한 이메일 인증이 필요합니다.<br/>
        가입하신 이메일을 입력해 주세요.
      </Description>
      <DefaultHeader
        alignItems='center'
        height={120}
        fontSize={50}
      />
      <Seperater
        direction='vertical'
        size={55}
      />
      {renderInputs()}
      <Seperater
        direction='vertical'
        size={35}
      />
      <Next onClick={submit}>
        확인
      </Next>
    </Section>
  ), [renderInputs, submit]);


  if (sendEmail) {
    return renderFinishPage();
  }
  return renderSendPage();
}
export default FindPassword;

const InputContainer = styled(Container)`
  align-items: start;
  justify-content: space-between;
`;

const Next = styled.div`
  cursor: pointer;
  width: ${JSUtility.convertPxToVw(100)};
  padding-bottom: ${JSUtility.convertPxToVh(15)};
  background-color: ${theme.colors.apple};
  color:${theme.colors.white};
  border-radius: ${JSUtility.convertPxToVw(50)};
  padding: ${JSUtility.convertPxToVw(3)};
  font-size: ${JSUtility.convertPxToVw(15)};
  text-align: center; 
  &:hover, active {
    background-color: ${theme.colors.treeGreen};
    color:${theme.colors.white};
  }
`;

