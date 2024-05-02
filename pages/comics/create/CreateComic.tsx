import Button from '@/components/Button';
import ContentContainer from '@/components/ContentContainer';
import HeaderContainer from '@/components/HeaderContainer';
import { Select, TextArea, TextField } from '@/components/Input';
import { SelectOption } from '@/components/Input/types';
import RootLayout from '@/components/RootLayout';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { useComic, useOptions } from './hooks';
import SelectMultiple from '@/components/Input/SelectMultiple';
import { useFetchDetail } from '../hooks';
import { ComicRequest } from '../types';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const optionSchema = z.object({
  id: z.number(),
  label: z.string(),
  value: z.string(),
});

const validationSchema = z.object({
  title: z.string().min(1, { message: 'Required title' }),
  alternativeTitle: z.string().optional(),
  status: z.string(),
  type: z.string(),
  authors: z.array(optionSchema).optional(),
  genres: z.array(optionSchema).optional(),
  tags: z.array(optionSchema).optional(),
  artists: z.array(optionSchema).optional(),
  translators: z.array(optionSchema).optional(),
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

const formatDate = (dateString: string, format: string = 'yyyy-MM-dd'): string => {
  const [day, month, year] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  let formattedDate = format;

  formattedDate = formattedDate.replace('yyyy', String(date.getFullYear()));
  formattedDate = formattedDate.replace('MM', String(date.getMonth() + 1).padStart(2, '0'));
  formattedDate = formattedDate.replace('dd', String(date.getDate()).padStart(2, '0'));

  return formattedDate;
};

const CreateComicPage = () => {
  const {
    genreOptions,
    authorOptions,
    statusOptions,
    typeOptions,
    artistOptions,
    tagOptions,
    translatorOptions,
  } = useOptions();
  const { isLoading, error, mutate } = useComic();
  const [isRouterReady, setRouterReady] = useState<Boolean>(false);
  const router = useRouter();
  const slugId = router.query.id as string | undefined;
  const {
    isLoading: loadingFetchDetail,
    data: detailResponse,
    error: errorDetail,
    refetch,
  } = useFetchDetail(slugId ?? '');

  type ValidationSchema = z.infer<typeof validationSchema>;
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      status: statusOptions[0].value,
      type: typeOptions[0].value,
      genres: [],
      authors: [],
      tags: [],
      translators: [],
      artists: [],
    },
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const selectedStatus: SelectOption | undefined = statusOptions.find(
      (option) => option.value === data.status,
    );
    const selectedType: SelectOption | undefined = typeOptions.find(
      (option) => option.value === data.type,
    );

    const genreIds = data.genres?.filter((option) => option.value !== '').map((genre) => genre.id);
    const authorIds = data.authors
      ?.filter((option) => option.value !== '')
      .map((author) => author.id);
    const tagIds = data.tags?.filter((option) => option.value !== '').map((tag) => tag.id);
    const artistIds = data.artists
      ?.filter((option) => option.value !== '')
      .map((artist) => artist.id);
    const translatorIds = data.translators
      ?.filter((option) => option.value !== '')
      .map((translator) => translator.id);

    const newGenres = data.genres
      ?.filter((option) => option.value === '')
      .map((option) => option.label);
    const newAuthors = data.authors
      ?.filter((option) => option.value === '')
      .map((option) => option.label);
    const newTags = data.tags
      ?.filter((option) => option.value === '')
      .map((option) => option.label);
    const newArtists = data.artists
      ?.filter((option) => option.value === '')
      .map((option) => option.label);
    const newTranslators = data.translators
      ?.filter((option) => option.value === '')
      .map((option) => option.label);

    const requestBody: ComicRequest = {
      title: data.title,
      alternativeTitle: data.alternativeTitle,
      type: selectedType?.id!,
      published_date: data.publishedDate,
      authors: authorIds,
      newAuthors: newAuthors,
      genres: genreIds,
      newGenres: newGenres,
      tags: tagIds,
      newTags: newTags,
      artists: artistIds,
      newArtists: newArtists,
      translators: translatorIds,
      newTranslators: newTranslators,
      description: data.description,
      thumbnail: data?.thumbnail?.[0],
      status: selectedStatus?.id!,
    };

    mutate(requestBody, {
      onSuccess: () => {
        toast.success('Data berhasil disimpan', { hideProgressBar: true });
        router.back();
      },
    });
  };

  useEffect(() => {
    if (!detailResponse) return;
    setValue('title', detailResponse.title);
    setValue('alternativeTitle', detailResponse.alternative_title);
    setValue('description', detailResponse.description ?? '');
    if (detailResponse.status) {
      setValue('status', detailResponse.status.id.toString());
    }
    if (detailResponse.type) {
      setValue('type', detailResponse.type.id.toString());
    }

    if (detailResponse.published_date) {
      const parsedDate = formatDate(detailResponse.published_date);
      setValue('publishedDate', parsedDate);
    }

    if (detailResponse.authors) {
      setValue(
        'authors',
        detailResponse.authors.map((item) => ({
          id: item.id,
          label: `${item.name}`,
          value: item.id.toString(),
        })),
      );
    }

    if (detailResponse.genres) {
      setValue(
        'genres',
        detailResponse.genres.map((item) => ({
          id: item.id,
          label: `${item.name}`,
          value: item.id.toString(),
        })),
      );
    }

    if (detailResponse.tags) {
      setValue(
        'tags',
        detailResponse.tags.map((item) => ({
          id: item.id,
          label: `${item.name}`,
          value: item.id.toString(),
        })),
      );
    }

    if (detailResponse.artists) {
      setValue(
        'artists',
        detailResponse.artists.map((item) => ({
          id: item.id,
          label: `${item.name}`,
          value: item.id.toString(),
        })),
      );
    }

    if (detailResponse.translators) {
      setValue(
        'translators',
        detailResponse.translators.map((item) => ({
          id: item.id,
          label: `${item.name}`,
          value: item.id.toString(),
        })),
      );
    }
  }, [detailResponse]);

  useEffect(() => {
    if (!router.isReady) return;
    setRouterReady(true);
    if (slugId) {
      refetch();
    }
  }, [router.isReady]);

  useEffect(() => {
    if (error) {
      toast.error(`${error}`, { hideProgressBar: true });
    }

    if (errorDetail) {
      toast.error(`${errorDetail}`, { hideProgressBar: true });
    }
  }, [error, errorDetail]);

  if (!isRouterReady || loadingFetchDetail) {
    return (
      <div className="flex p-40 justify-center items-center">
        <span className="loading loading-lg" />
      </div>
    );
  }

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
            <div className="basis-1/3">
              <Controller
                name="authors"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SelectMultiple
                    label="Authors"
                    id="authors"
                    placeholder="Type authors here..."
                    onSelectedOptionsChange={(value) => {
                      onChange(value);
                    }}
                    value={value}
                    options={authorOptions}
                    control={control}
                  />
                )}
              />
            </div>
            <div className="w-3" />
            <div className="basis-1/3">
              <Controller
                name="genres"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SelectMultiple
                    label="Genres"
                    id="genres"
                    placeholder="Type genres here..."
                    options={genreOptions}
                    control={control}
                    onSelectedOptionsChange={(value) => onChange(value)}
                    value={value}
                  />
                )}
              />
            </div>
            <div className="w-3" />
            <div className="basis-1/3">
              <Controller
                name="tags"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SelectMultiple
                    label="Tags"
                    id="tags"
                    placeholder="Type tags here..."
                    onSelectedOptionsChange={(value) => {
                      onChange(value);
                    }}
                    value={value}
                    options={tagOptions}
                    control={control}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="basis-1/3">
              <Controller
                name="artists"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SelectMultiple
                    label="Artist"
                    id="artists"
                    placeholder="Type artists here..."
                    onSelectedOptionsChange={(value) => {
                      onChange(value);
                    }}
                    value={value}
                    options={artistOptions}
                    control={control}
                  />
                )}
              />
            </div>
            <div className="w-3" />
            <div className="basis-1/3">
              <Controller
                name="translators"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SelectMultiple
                    label="Translators"
                    id="translators"
                    placeholder="Type translators here..."
                    options={translatorOptions}
                    control={control}
                    onSelectedOptionsChange={(value) => onChange(value)}
                    value={value}
                  />
                )}
              />
            </div>
            <div className="w-3" />
            <TextField
              isFullWidth
              {...register('publishedDate')}
              id="publishedDate"
              label="Published Date"
              errorMessage={errors.publishedDate?.message}
              containerClassName="basis-1/3"
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
