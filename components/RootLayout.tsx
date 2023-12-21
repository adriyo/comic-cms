import Head from 'next/head';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { ReactNode } from 'react';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div>
        <Head>
          <title>Comic - CMS</title>
        </Head>
        <div className="bg-base-100 drawer lg:drawer-open">
          <input id="drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            <Navbar />
            <main className="container p-4 bg-slate-50">{children}</main>
          </div>
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
