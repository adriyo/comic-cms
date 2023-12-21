import AuthProvider from '@/pages/AuthProvider';
import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactElement;
};

const CustomLayout = ({
  children,
  component,
}: {
  children: ReactNode;
  component: Page;
}): ReactElement => {
  const getLayout = component.getLayout ?? ((page) => page);

  return getLayout(<>{children}</>);
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <CustomLayout component={Component}>
        <Component {...pageProps} />
      </CustomLayout>
      <ToastContainer />
    </AuthProvider>
  );
};

export default App;
