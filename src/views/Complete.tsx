import React, { useEffect, useRef } from 'react';
import { SESSION_KEY_USER_EMAIL } from 'src/constants';
import { Section } from '../common/Components';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const Complete = () => {
  const navigate = useNavigate();
  const navigateRef = useRef<NavigateFunction>(navigate);
  useEffect(() => {
    console.log('완료 페이지');
    const userEmail = localStorage.getItem(SESSION_KEY_USER_EMAIL);
    if (userEmail == null) {
      alert('잘못된 접근입니다');
      navigateRef.current("/");
    }
  }, []);

  return (
    <Section>
      구독완료
    </Section>
  );
};
export default Complete;
