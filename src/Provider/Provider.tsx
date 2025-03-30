'use client';

import { store } from '@/redux/store/store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

interface Children {
  children: ReactNode;
}

const Providers = ({ children }: Children) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
