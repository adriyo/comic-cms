import Button from '@/components/Button';
import ContentContainer from '@/components/ContentContainer';
import HeaderContainer from '@/components/HeaderContainer';
import { Select2, Select, TextArea, TextDatePicker, TextField } from '@/components/Input';
import { SelectOption } from '@/components/Input/types';
import RootLayout from '@/components/RootLayout';
import { useComic } from '@/src/pages/comics/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const validationSchema = z.object({
  title: z.string().min(1, { message: 'Required title' }),
  status: z.string().min(1, { message: 'Required status' }),
  author: z.string().min(1, { message: 'Required author' }),
  genre: z.string().min(1, { message: 'Required genre' }),
  thumbnail: z
    .custom<File[]>()
    .refine((files) => files?.length == 1, 'Image is required.')
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.',
    ),
  publishedAt: z.date(),
  description: z.string().min(1, { message: 'Required description' }),
});

const authorOptions: SelectOption[] = [
  { id: 1, value: 'akira-toriyama', label: 'Akira Toriyama' },
  { id: 1, value: 'masashi-kishimoto', label: 'Masashi Kishimoto' },
  { id: 1, value: 'hirohiko-araki', label: 'Hirohiko Araki' },
  { id: 1, value: 'mashima-hiro', label: 'Mashima Hiro' },
];

const genreOptions: SelectOption[] = [
  { id: 1, value: 'action', label: 'Action' },
  { id: 2, value: 'adventure', label: 'Adventure' },
  { id: 3, value: 'drama', label: 'Drama' },
  { id: 4, value: 'fantasy', label: 'Fantasy' },
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
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const { loading, error, saveComic } = useComic();

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    try {
      const selectedGenre: SelectOption | undefined = genreOptions.find(
        (option) => option.value === data.genre,
      );
      const selectedAuthor: SelectOption | undefined = authorOptions.find(
        (option) => option.value === data.author,
      );

      await saveComic({
        title: data.title,
        author: selectedAuthor!,
        publicationYear: data.publishedAt,
        genre: selectedGenre!,
        description: data.description,
        thumbnail: data.thumbnail[0],
        status: data.status,
      });
      toast.success('Data berhasil disimpan', { hideProgressBar: true });
      router.back();
    } catch (error) {
      toast.error(`Data gagal disimpan: ${error}`, { hideProgressBar: true });
    }
  };
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [author, setAuthor] = useState<string>();
  const [genre, setGenre] = useState<string>();

  if (error != null) {
    toast.error(`Error: ${error}`, { hideProgressBar: true });
  }

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

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
          <div className="container">
            <div>
              <label htmlFor="thumbnail" className="label text-sm">
                <span className="label-text">Thumbnail</span>
              </label>
              <input
                {...register('thumbnail')}
                type="file"
                accept=".jpg, .jpeg, .png, .webp"
                className="file-input file-input-bordered file-input-sm"
              />
              {errors.thumbnail?.message ? (
                <label className="label">
                  <span className="label-text-alt text-red-500">
                    {errors.thumbnail?.message + ''}
                  </span>
                </label>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="h-6" />
          <Button id="btn-submit" title="Submit" type="submit" loading={loading} />
        </form>
      </ContentContainer>
    </div>
  );
};

CreateComicPage.getLayout = (page: any) => {
  return <RootLayout>{page}</RootLayout>;
};

export default CreateComicPage;
