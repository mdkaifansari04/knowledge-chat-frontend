import { FadeImg } from '../ui/fade-image';

function Logo() {
  return (
    <>
      <FadeImg src="/logo/the-online-co-logo-light.svg" className="hidden w-16 py-4 dark:block" />
      <FadeImg src="/logo/the-online-co.png" className="block w-20 py-4 dark:hidden" />
    </>
  );
}

export default Logo;
