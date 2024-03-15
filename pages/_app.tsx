import AuthProvider from '@/pages/AuthProvider';
import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <CustomLayout component={Component}>
          <Component {...pageProps} />
        </CustomLayout>
      </QueryClientProvider>
      <ToastContainer />
    </AuthProvider>
  );
};

export default App;
