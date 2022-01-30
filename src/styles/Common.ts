
import styled, { css } from 'styled-components';
import JSUtility from '../utilities/JSUtility';
import theme from './theme';


interface SectionInput {
  background: string;
  flexDirection: string;
}
export const SectionContainer = styled.div<SectionInput>`
  display:flex;
  flex: 1;
  align-itmes: center;
  justify-content: center;
  flex-direction: ${(props) => props.flexDirection};
  background: ${(props) => props.background};
  padding: ${JSUtility.convertPxToVw(90)} 0.5vw ${JSUtility.convertPxToVw(90)} 0.5vw;
`; 

export const LeftContainer = styled.div`
  display:flex;
  flex: 1;
  flex-direction: column;
  align-itmes: start;
  justify-content: center;
`;
export const RightContainer = styled.div`
  display:flex;
  flex: 1;
  flex-direction: column;
  align-itmes: center;
  justify-content: end;
`;
interface TitleInput {
  fontSize: number;
  marginBottom?: number;
  color?: string;
};

export const Title = styled.h1<TitleInput>`
  font-size:${props => JSUtility.convertPxToVw(props.fontSize)};
  line-height: 1.7;
  margin-bottom:${props => (
    props.marginBottom? JSUtility.convertPxToVw(props.marginBottom) : 0 
  )}
  align-self: center;
  text-align: center;
  color:${props => props.color || theme.colors.black};
`;
export const InsideText = styled.span<TitleInput>`
  font-size:${props => JSUtility.convertPxToVw(props.fontSize)};
  line-height: 1.7;
  margin-bottom:${props => (
    props.marginBottom? JSUtility.convertPxToVw(props.marginBottom) : 0 
  )}
  align-self: center;
  text-align: center;
  color:${props => props.color || theme.colors.black};
`;

export const ImgText = styled.p`
  font-size:${JSUtility.convertPxToVw(5)};
  color:${theme.colors.pinkishGrey};
  align-self: center;
  text-align: center;
`;

export const Button = styled.a`
  cursor: pointer;
  text-align: center;
  color:${theme.colors.white};
  font-size:${JSUtility.convertPxToVw(20)};
  width:${JSUtility.convertPxToVw(157)};
  padding: ${JSUtility.convertPxToVw(19)} ${JSUtility.convertPxToVw(53)};
  align-self:center;
  border: 0;
  border-radius:8px;
  background: ${theme.colors.apple};
  :hover {
    background: ${theme.colors.treeGreen};
  }
`;

export const Container = styled.div<{flexDirection?:string}>`
  display:flex;
  flex-direction: ${(props) => props.flexDirection ?? 'row'};
  align-itmes: center;
  justify-content: center;
`;
export const TextContainer = styled.div`
  display:flex;
  flex: 1;
  flex-direction: column;
  align-itmes: center;
  align-self:start;
  justify-content: center;
  margin-left: ${JSUtility.convertPxToVw(50)};
  margin-right: ${JSUtility.convertPxToVw(50)};
`;

interface imgInput {
  width: number;
  height?: number;
}
export const NormalizedImg = styled.img<imgInput>`
  width:${(props) => JSUtility.convertPxToVw(props.width)};
  ${props => props.height && css`
    height:${JSUtility.convertPxToVw(props.height)};
  `};
`;

export const LeftImg = styled.img`
  width:${JSUtility.convertPxToVw(200)};
  height:${JSUtility.convertPxToVw(373)};

`;
export const RightImg = styled.img`
  width:${JSUtility.convertPxToVw(259)};
  height:${JSUtility.convertPxToVw(205)};
  margin-top: ${JSUtility.convertPxToVh(-80)}
`;


export const Description = styled.p`
  font-size:${JSUtility.convertPxToVw(20)};
  lien-height:${JSUtility.convertPxToVh(74)};
  color:${theme.colors.black};
  align-self: center;
  font-family: 'Noto Sans KR', sans-serif;
  text-align: center;
`;