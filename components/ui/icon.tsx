import React from 'react';
import { FadeImg } from './fade-image';

function Icon({ src, className }: { src: string; className?: string }) {
  return <FadeImg className={className} src={`./icons/${src}.svg`} />;
}

export default Icon;
