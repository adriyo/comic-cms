import ContentContainer from '@/components/ContentContainer';
import RootLayout from '@/components/RootLayout';

const EditChapter = () => {
  return (
    <ContentContainer>
      <div>Hello world</div>
    </ContentContainer>
  );
};

EditChapter.getLayout = (page: any) => {
  return <RootLayout>{page}</RootLayout>;
};

export default EditChapter;
