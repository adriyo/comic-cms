import ContentContainer from '@/components/ContentContainer';
import RootLayout from '@/components/RootLayout';

const PropertiesPage = () => {
  return (
    <ContentContainer className="flex h-screen bg-red-500 justify-center items-center">
      <span className="loading" />
    </ContentContainer>
  );
};

PropertiesPage.getLayout = (page: any) => {
  return <RootLayout>{page}</RootLayout>;
};

export default PropertiesPage;
