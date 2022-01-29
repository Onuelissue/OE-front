import React, { useCallback } from 'react';
import { InsideText, Title } from 'src/styles/Common';
import theme from 'src/styles/theme';
import JSUtility from '../utilities/JSUtility';

type HighlightableTextInput = {
  text: string;
  fontSize: number;
  textColor?: string;
  highlightedTextColor: string;
}

type parsedText = {
  text: string;
  isHighlighted: boolean;
}
const HighlightableText = ({
  text,
  fontSize,
  textColor = theme.colors.black,
  highlightedTextColor,
}:HighlightableTextInput) => { 
  console.log(JSUtility.parseHighlightedText(text));
  const t = useCallback(() => (
    <Title
      fontSize={fontSize}
      color={textColor}
    >
      {
        JSUtility.parseHighlightedText(text).map(
          (obj:parsedText, index:number) => {
            const {text:t, isHighlighted} = obj;
            if (t === '\\n') {
              return(
                <br/>
              )
            }
            if (isHighlighted) {
              return (
                <InsideText key={`page-${index}`}
                  fontSize={fontSize}
                  color={highlightedTextColor}
                >
                  {t}
                </InsideText>
              )
            }
            return t;
          }
        )
      }
    </Title>
  ),[
    text,
    fontSize,
    textColor,
    highlightedTextColor,
  ]);
  
  return (
    <div>
      {t()}
    </div>
  );
};
export default HighlightableText;

