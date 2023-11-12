//@ts-nocheck
import {IconWrapper} from './styled';
import glyphs, {aliases} from './glyphs';
import {useMemo} from 'react';

export default ({name, size = 20, fill = '#222'}: any) => {
  const Glyph = useMemo(
    () => glyphs[name] || (aliases[name] ? glyphs[aliases[name]] : undefined),
    [name],
  );

  console.log('icon', name, JSON.stringify(glyphs[name]));

  return (
    <IconWrapper>
      <Glyph width={size} height={size} fill={fill} />
    </IconWrapper>
  );
};
