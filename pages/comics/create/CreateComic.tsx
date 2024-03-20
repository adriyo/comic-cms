import Button from '@/components/Button';
import ContentContainer from '@/components/ContentContainer';
import HeaderContainer from '@/components/HeaderContainer';
import { Select2, Select, TextArea, TextField } from '@/components/Input';
import { SelectOption } from '@/components/Input/types';
import RootLayout from '@/components/RootLayout';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { useComic, useOptions } from './hooks';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const validationSchema = z.object({
  title: z.string().min(1, { message: 'Required title' }),
  alternativeTitle: z.string().optional(),
  status: z.string(),
  type: z.string(),
  author: z.string().optional(),
  genre: z.string().optional(),
  publishedDate: z.string().optional(),
  thumbnail: z
    .custom<File[]>()
    .refine((files) => files?.length == 1, 'Image is required.')
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.',
    ),
  description: z.string().min(1, { message: 'Required description' }),
});

const CreateComicPage = () => {
  const { genreOptions, authorOptions, statusOptions, typeOptions } = useOptions();
  const { isLoading, error, mutate } = useComic();
  const router = useRouter();
  const [author, setAuthor] = useState<string>();
  const [genre, setGenre] = useState<string>();

  type ValidationSchema = z.infer<typeof validationSchema>;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      status: statusOptions[0].value,
      type: typeOptions[0].value,
    },
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const selectedGenre: SelectOption | undefined = genreOptions.find(
      (option) => option.value === data.genre,
    );
    const selectedAuthor: SelectOption | undefined = authorOptions.find(
      (option) => option.value === data.author,
    );
    const selectedStatus: SelectOption | undefined = statusOptions.find(
      (option) => option.value === data.status,
    );
    const selectedType: SelectOption | undefined = typeOptions.find(
      (option) => option.value === data.type,
    );

    const genreIds = selectedGenre ? [selectedGenre.id] : undefined;
    const authorIds = selectedAuthor ? [selectedAuthor.id] : undefined;

    mutate(
      {
        title: data.title,
        alternativeTitle: data.alternativeTitle,
        authors: authorIds,
        type: selectedType?.id!,
        published_date: data.publishedDate,
        genres: genreIds,
        description: data.description,
        thumbnail: data?.thumbnail?.[0],
        status: selectedStatus?.id!,
      },
      {
        onSuccess: () => {
          toast.success('Data berhasil disimpan', { hideProgressBar: true });
          router.back();
        },
      },
    );
  };

  useEffect(() => {
    if (error) {
      toast.error(`${error}`, { hideProgressBar: true });
    }
  }, [error]);

  return (
    <section className="border rounded-lg bg-white dark:bg-slate-800">
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
            <TextField
              isFullWidth
              {...register('alternativeTitle')}
              id="alternativeTitle"
              label="Alternative Title"
              errorMessage={errors.alternativeTitle?.message}
              containerClassName="basis-1/2"
            />
          </div>
          <div className="flex flex-row">
            <Controller
              name="status"
              control={control}
              render={({ field: { value, onChange, ...fields } }) => (
                <Select
                  {...fields}
                  id="status"
                  label="Status"
                  options={statusOptions}
                  containerClassName="basis-1/2"
                  value={value}
                  errorMessage={errors.status?.message}
                  onChange={(val) => onChange(val.value)}
                />
              )}
            />
            <div className="w-3" />
            <Controller
              name="type"
              control={control}
              render={({ field: { value, onChange, ...fields } }) => (
                <Select
                  {...fields}
                  id="type"
                  label="Type"
                  options={typeOptions}
                  containerClassName="basis-1/2"
                  value={value}
                  errorMessage={errors.type?.message}
                  onChange={(val) => onChange(val.value)}
                />
              )}
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
            <TextField
              isFullWidth
              {...register('publishedDate')}
              id="publishedDate"
              label="Published Date"
              errorMessage={errors.publishedDate?.message}
              containerClassName="basis-1/2"
              type="date"
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
          <Button id="btn-submit" title="Submit" type="submit" loading={isLoading} />
        </form>
      </ContentContainer>
    </section>
  );
};

CreateComicPage.getLayout = (page: any) => {
  return <RootLayout>{page}</RootLayout>;
};

export default CreateComicPage;
