import styled from 'styled-components/native';

export const IconWrapper = styled.View`
  width: ${({size, circled}) => (circled ? size + 32 : size)}px;
  height: ${({size, circled}) => (circled ? size + 32 : size)}px;
  justify-content: center;
  align-items: center;
  ${({align}) => (align ? `align-self: ${align};` : null)}
  ${({fillColor}) =>
    fillColor
      ? `
    background-color: ${fillColor};
  `
      : null}
  ${({circled, fillColor, color = 'black'}) =>
    circled
      ? `
    padding: 16px;
    ${
      fillColor
        ? ''
        : `
      border-width: 2px;
      border-color: ${color};
    `
    }
    border-radius: 32px;
  `
      : null}
`;

export const IconRaster = styled.Image`
  max-width: 100%;
  max-height: 100%;
`;
