import Button from '@/components/Button';
import ContentContainer from '@/components/ContentContainer';
import HeaderContainer from '@/components/HeaderContainer';
import { Select2, Select, TextArea, TextDatePicker, TextField } from '@/components/Input';
import { SelectOption } from '@/components/Input/types';
import RootLayout from '@/components/RootLayout';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const validationSchema = z.object({
  title: z.string().min(1, { message: 'Required title' }),
  status: z.string().min(1, { message: 'Required status' }),
  author: z.string().min(1, { message: 'Required author' }),
  genre: z.string().min(1, { message: 'Required genre' }),
  publishedAt: z.date(),
  description: z.string().min(1, { message: 'Required description' }),
});

const authorOptions = [
  { value: 'akira-toriyama', label: 'Akira Toriyama' },
  { value: 'masashi-kishimoto', label: 'Masashi Kishimoto' },
  { value: 'hirohiko-araki', label: 'Hirohiko Araki' },
  { value: 'mashima-hiro', label: 'Mashima Hiro' },
];

const genreOptions = [
  { value: 'action', label: 'Action' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'drama', label: 'Drama' },
  { value: 'fantasy', label: 'Fantasy' },
];

const statusOptions: SelectOption[] = [
  { id: 1, value: 'ongoing', label: 'On Going' },
  { id: 2, value: 'hiatus', label: 'Hiatus' },
  { id: 3, value: 'ongoing', label: 'Completed' },
];

const CreateComicPage = () => {
  type ValidationSchema = z.infer<typeof validationSchema>;
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });
  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    console.log(data);
  };
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [author, setAuthor] = useState<string>();
  const [genre, setGenre] = useState<string>();

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const watchAllFields = watch();
  useEffect(() => {
    const subscription = watch((value, { name, type }) => console.log(value, name, type));
    return () => subscription.unsubscribe();
  }, [watch]);
  return (
    <div className="border rounded-lg bg-white dark:bg-slate-800">
      <HeaderContainer title="Kembali" onBackClicked={() => router.back()} />
      <ContentContainer className="flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row">
            <TextField
              isFullWidth
              {...register('title')}
              id="title"
              label="Title"
              errorMessage={errors.title?.message}
              containerClassName="basis-1/2"
            />
            <div className="w-3" />
            <Select
              {...register('status')}
              id="status"
              label="Status"
              options={statusOptions}
              containerClassName="basis-1/2"
              errorMessage={errors.status?.message}
            />
          </div>
          <div className="flex flex-row">
            <Controller
              name="author"
              control={control}
              render={({ field: { value, onChange, ...fields } }) => (
                <Select2
                  id="author"
                  label="Author"
                  containerClassName="basis-1/3"
                  isFullWidth
                  options={authorOptions}
                  value={author ?? ''}
                  errorMessage={errors.author?.message}
                  control={control}
                  onOptionSelected={(option) => {
                    onChange(option.value);
                    setAuthor(option.value);
                  }}
                  {...fields}
                />
              )}
            />
            <div className="w-3" />
            <Controller
              name="genre"
              control={control}
              render={({ field: { value, onChange, ...fields } }) => (
                <Select2
                  id="genre"
                  options={genreOptions}
                  label="Genre"
                  containerClassName="basis-1/3"
                  errorMessage={errors.genre?.message}
                  control={control}
                  value={genre ?? ''}
                  onOptionSelected={(option) => {
                    onChange(option.value);
                    setGenre(option.value);
                  }}
                  isFullWidth
                  {...fields}
                />
              )}
            />
            <div className="w-3" />
            <Controller
              name="publishedAt"
              control={control}
              render={({ field: { onChange } }) => (
                <TextDatePicker
                  id="publishedAt"
                  label="Published Year"
                  containerClassName="basis-1/3"
                  selectedDate={selectedDate}
                  onChange={(date) => {
                    onChange(date);
                    handleDateChange(date);
                  }}
                  errorMessage={errors.publishedAt?.message}
                />
              )}
            />
          </div>
          <TextArea
            id="description"
            {...register('description')}
            label="Description"
            errorMessage={errors.description?.message}
            isFullWidth
          />
          <div className="h-6" />
          <Button id="btn-submit" title="Submit" type="submit" />
        </form>
      </ContentContainer>
    </div>
  );
};

CreateComicPage.getLayout = (page: any) => {
  return <RootLayout>{page}</RootLayout>;
};

export default CreateComicPage;
