'use client';

/* Core */
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

/* Instruments */
import { reduxStore } from '@/store/redux';

export function Providers(props: PropsWithChildren) {
  const { children } = props;
  return <Provider store={reduxStore}>{children}</Provider>;
}
