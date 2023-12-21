import RootLayout from '@/components/RootLayout';

const NotFoundPage = () => {
  return <div>Error page</div>;
};

NotFoundPage.getLayout = (page: any) => {
  return <RootLayout>{page}</RootLayout>;
};

export default NotFoundPage;
