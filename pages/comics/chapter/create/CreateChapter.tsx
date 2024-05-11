import Button from '@/components/Button';
import { TextField } from '@/components/Input';
import { MdDelete } from 'react-icons/md';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { RxUpload } from 'react-icons/rx';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import RootLayout from '@/components/RootLayout';
import ContentContainer from '@/components/ContentContainer';
import HeaderContainer from '@/components/HeaderContainer';
import { useRouter } from 'next/router';
import { useChapter, useFetchDetail } from './hooks';
import { ChapterImage, ChapterRequest } from './types';
import { z } from 'zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const PreviewImages = ({
  chapterImages,
  onDelete,
}: {
  chapterImages: ChapterImage[];
  onDelete: (file: ChapterImage) => void;
}) => {
  const rows = [];
  const imagesSize = chapterImages ? chapterImages.length : 0;
  const GridItem = ({ index, chapterImage }: { index: number; chapterImage: ChapterImage }) => {
    const filenameUrl = chapterImage.url?.split('/').pop() ?? '';
    const filename = chapterImage?.file?.name ?? filenameUrl;
    return (
      <div key={index} className="tile">
        <div className={`relative border rounded-lg p-1`}>
          <button
            type="button"
            className="border rounded-sm bg-gray-200 button w-10 h-10 absolute top-0 right-0 flex items-center justify-center"
            onClick={() => onDelete(chapterImage)}
          >
            <MdDelete className="w-6 h-6" color="#ff0000" />
          </button>
          <span className="text-sm line-clamp-1">{filename}</span>
          <Image
            src={
              chapterImage?.file ? URL.createObjectURL(chapterImage.file) : chapterImage?.url ?? ''
            }
            alt={`Image ${index}`}
            width={300}
            height={300}
            priority={true}
            className="rounded mx-auto h-40 w-40 object-cover"
          />
        </div>
      </div>
    );
  };

  for (let i = 0; i < imagesSize; i++) {
    rows.push(GridItem({ index: i, chapterImage: chapterImages?.[i] }));
  }
  return <div className="grid grid-cols-5 gap-8">{rows}</div>;
};

const UploadContainer = ({
  error,
  onDrop,
  onDelete,
  chapterImages,
}: {
  error?: string;
  onDrop: (acceptedFiles: File[]) => void;
  onDelete: (file: ChapterImage) => void;
  chapterImages: ChapterImage[];
}) => {
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      'image/*': ['.jpeg', '.png', '.webp', '.jpg'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`mt-4 p-4 rounded border border-dashed  ${error ? 'border-red-500' : 'border-blue-200'} flex flex-col justify-start items-start ${
        isDragActive ? 'bg-blue-200' : ''
      }`}
    >
      {chapterImages.length > 0 ? (
        <PreviewImages chapterImages={chapterImages} onDelete={onDelete} />
      ) : (
        <div className="flex w-full flex-col justify-center items-center">
          <input
            {...getInputProps()}
            type="file"
            className="file-input file-input-bordered w-fit"
          />
          <RxUpload className="w-16 h-16" />
          <br />
          <span>{'Drop the files here'}</span>
          <div className="divider">OR</div>
          <Button id="btnBrowse" title="Browse" type="button" onClick={open} />
        </div>
      )}
    </div>
  );
};

const validationSchema = z.object({
  title: z.string().min(1, { message: 'Required title' }),
  images: z.custom<ChapterImage[]>().refine((files) => files?.length > 0, 'Image is required.'),
  deletedImages: z.custom<number[]>().optional(),
});

const CreateChapter = () => {
  type ValidationSchema = z.infer<typeof validationSchema>;
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      images: [],
      title: '',
    },
  });
  const router = useRouter();
  const slug = router.query.slug as string[] | undefined;
  const comicId = slug?.[0] as string | undefined;
  const chapterId = slug?.[2] as string | undefined;
  const {
    isLoading: isLoadingDetail,
    data: detailResponse,
    error: errorDetail,
    refetch,
  } = useFetchDetail(comicId, chapterId);
  const { mutate, error, isLoading } = useChapter();
  const [isRouterReady, setRouterReady] = useState(false);
  const onDrop = (acceptedFiles: File[]) => {
    const existingFiles: ChapterImage[] = getValues('images');
    const lastIndex =
      (existingFiles.length ? existingFiles[existingFiles.length - 1].index : 0) ?? 0;
    const newFiles = acceptedFiles.map((item, index) => ({
      index: index + lastIndex + 1,
      file: item,
    }));
    setValue('images', existingFiles.concat(newFiles), { shouldValidate: true });
  };
  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const images = data.images
      .map((item) => item.file as File)
      .filter((item) => item !== undefined);

    const request: ChapterRequest = {
      comicId: comicId ?? '',
      chapterId: chapterId,
      title: data.title,
      images: images,
      deletedImages: data.deletedImages,
    };
    mutate(request, {
      onSuccess: () => {
        toast.success('success', { hideProgressBar: true });
        router.back();
      },
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(`${error}`, { hideProgressBar: true });
    }
    if (errorDetail) {
      toast.error(errorDetail.message, { hideProgressBar: true });
    }
  }, [error, errorDetail]);

  useEffect(() => {
    if (!router.isReady) return;
    setRouterReady(true);
    if (chapterId) {
      refetch();
    }
  }, [router.isReady]);

  useEffect(() => {
    if (!detailResponse) return;
    const chapterImages = detailResponse.images.map((item, index) => ({
      id: item.id,
      index: index + 1,
      url: item.url,
      file: item.file,
    }));
    setValue('title', detailResponse.title);
    setValue('images', chapterImages);
  }, [detailResponse]);

  const handleDeleteFile = (file: ChapterImage) => {
    const files = getValues('images') as ChapterImage[];
    const deletedIds = files
      .filter((existingFile) => existingFile.index === file.index)
      .map((deletedFile) => deletedFile.id)
      .filter((file) => file !== undefined);

    const existingDeletedIds = getValues('deletedImages') || [];
    const updatedDeletedIds = [...existingDeletedIds, ...deletedIds];

    const updatedFiles = files.filter((existingFile) => existingFile.index !== file.index);
    setValue('images', updatedFiles, { shouldValidate: true });
    setValue('deletedImages', updatedDeletedIds);
  };

  if (!isRouterReady || isLoadingDetail) {
    return (
      <div className="flex p-40 justify-center items-center">
        <span className="loading loading-lg" />
      </div>
    );
  }

  return (
    <div className="border border-collapse rounded-md bg-white content-container">
      <HeaderContainer title="Upload" onBackClicked={() => router.back()} />
      <ContentContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container flex flex-col">
            <div className="flex flex-wrap items-center bg-slate-50 pl-6 pr-6">
              <div className="join">
                <TextField
                  {...register('title')}
                  label="Chapters"
                  className="join-item"
                  errorMessage={errors.title?.message}
                  small
                />
                <div />
                <Button
                  id="btn-submit"
                  type="submit"
                  title="+ Submit"
                  className="join-item mt-9 mb-0"
                  small
                  disabled={isLoading}
                  loading={isLoading}
                />
              </div>
            </div>
            <div>
              {errors?.images?.message && (
                <label className="label">
                  <span className="label-text-alt text-red-500">{errors?.images?.message}</span>
                </label>
              )}
              <Controller
                control={control}
                name="images"
                render={({ field: { value, onChange, ...fields } }) => (
                  <UploadContainer
                    onDrop={onDrop}
                    chapterImages={watch('images')}
                    onDelete={handleDeleteFile}
                    error={errors?.images?.message}
                  />
                )}
              />
            </div>
          </div>
        </form>
      </ContentContainer>
    </div>
  );
};

CreateChapter.getLayout = (page: any) => {
  return <RootLayout>{page}</RootLayout>;
};

export default CreateChapter;
