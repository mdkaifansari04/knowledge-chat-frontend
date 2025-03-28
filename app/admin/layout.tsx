import type { PropsWithChildren } from 'react';
import AuthWrapper from '../provider/adminAuthWrapper';

export default function Layout({ children }: PropsWithChildren) {
  return <AuthWrapper>{children}</AuthWrapper>;
}
