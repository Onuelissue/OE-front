import _ from 'lodash';


const JSUtility = {
  convertPxToVw(value) {
    const viewPortWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vw = 100 * (value / viewPortWidth);
    return `${vw}vw`;
  },

  convertPxToVh(value) {
    const viewPortHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const vh = 100 * (value / viewPortHeight);
    return `${vh}vh`;
  },
  parseHighlightedText(text) {
    let isHighlighted = false;
    const textArr = Array.from(text);
    return textArr.reduce((acc, char, index) => {
      if (char === '[') {
        isHighlighted = true;
      } else if (char === ']') {
        isHighlighted = false;
      }
      
      const isFirstChar = (index === 0);
      const isStartOfHighlight = (char === '[');
      const isAfterEndOfHighlight = (textArr[index - 1] === ']');
      const isStartOfTextFragment = isFirstChar || isStartOfHighlight || isAfterEndOfHighlight;
      const isLineBreak = (_.join(textArr.slice(index-2,index),"") === '\\n');
      if (isLineBreak) {
        const prev = {
          text: _.last(acc).text.slice(0,-2),
          isHighlighted,
        }
        console.log('edit' , acc);
        const lineBreak = {
          text: _.join(textArr.slice(index-2,index),""),
          isHighlighted,
        };
        const newText = {
          text: '',
          isHighlighted,
        }
        return [...acc.slice(0,-1), prev, lineBreak, newText];
      }
      const textFragment = isStartOfTextFragment
        ? {
          text: '',
          isHighlighted,
        }
        : _.last(acc);

      const updatedTextFragment = (char !== '[' && char !== ']')
        ? {
          text: `${textFragment.text}${char}`,
          isHighlighted,
        }
        : textFragment;

      if (isStartOfTextFragment) {
        return [...acc, updatedTextFragment];
      }

      return [...acc.slice(0, -1), updatedTextFragment];
    }, []);
  }
};
export default JSUtility;