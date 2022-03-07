import JSUtility from 'src/utilities/JSUtility';

const colors={
  apple: '#50cb43',
  treeGreen: '#258113',
  black: '#000000',
  transparent: 'transparent',
  blackAlpha: 'rgba(0, 0, 0, 0.5)',
  blackAlpha03: 'rgba(0, 0, 0, 0.03)',
  offWhite: '#f7fff5',
  pinkishGrey: '#c7c7c7',
  white:'white',
  grayishBrown: '#484747',
  border: '#f2f2f2',
};

const fonts = {
  family: {
    base : `"yg-jalnan", sans-serif`,
    description: `'Noto Sans KR', sans-serif`,
  },
  size: {
    title: JSUtility.convertPxToVw(40),
    sm : JSUtility.convertPxToVw(20),
  }
}

const defaultTheme = {
  colors,
  fonts,
}

export default defaultTheme;

