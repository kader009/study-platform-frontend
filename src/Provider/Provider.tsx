'use client';

import { store } from '@/redux/store/store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';

interface Children {
  children: ReactNode;
}

const Providers = ({ children }: Children) => {
  return (
    <Provider store={store}>
      <Toaster position="top-center" />
      {children}
    </Provider>
  );
};

export default Providers;
