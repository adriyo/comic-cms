import Button from '@/components/Button';
import { TextField } from '@/components/Input';
import { MdDelete } from 'react-icons/md';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { RxUpload } from 'react-icons/rx';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import RootLayout from '@/components/RootLayout';
import ContentContainer from '@/components/ContentContainer';
import HeaderContainer from '@/components/HeaderContainer';
import { useRouter } from 'next/router';
import { useChapter } from './hooks';
import { ChapterRequest } from './types';

const PreviewImages = ({ files, onDelete }: { files: File[]; onDelete: (file: File) => void }) => {
  return (
    <div className="grid grid-cols-5 gap-8 pt-8">
      {files.map((file, index) => (
        <div key={index} className="tile">
          <div className={`relative border rounded-lg p-1`}>
            <button
              className="button w-10 h-10 absolute top-0 right-0"
              onClick={() => onDelete(file)}
            >
              <MdDelete />
            </button>
            <span className="text-sm">{file.name}</span>
            <Image
              src={URL.createObjectURL(file)}
              alt={`Image ${index}`}
              width={300}
              height={300}
              className="rounded mx-auto h-40 w-40 object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const UploadContainer = ({ onDrop }: { onDrop: (acceptedFiles: File[]) => void }) => {
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
      className={`mt-4 pt-12 pb-12 rounded border border-dashed  border-spacing-96 border-blue-200 flex flex-col justify-center items-center ${
        isDragActive ? 'bg-blue-200' : ''
      }`}
    >
      <input {...getInputProps()} type="file" className="file-input file-input-bordered w-fit" />
      <RxUpload className="w-16 h-16" />
      <br />
      <span>{'Drop the files here'}</span>
      <div className="divider">OR</div>
      <Button id="btnBrowse" title="Browse" onClick={open} />
    </div>
  );
};

const CreateChapter = () => {
  const router = useRouter();
  const { mutate, error, isLoading } = useChapter();
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState<string>();
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      console.log(acceptedFiles);
      setFiles([...files, ...acceptedFiles]);
    },
    [files],
  );

  const handleOnSubmit = () => {
    if (files.length == 0) {
      toast.error('File image tidak ditemukan', { hideProgressBar: true });
      return;
    }
    const request: ChapterRequest = {
      comicId: router.query.slug as string,
      title: title ?? '',
      images: files,
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
      toast.error('', { hideProgressBar: true });
    }
  }, [error]);

  const handleDeleteFile = (file: File) => {
    const updatedFiles = files.filter((existingFile) => existingFile !== file);
    setFiles(updatedFiles);
  };

  return (
    <div className="border border-collapse rounded-md bg-white content-container">
      <HeaderContainer title="Upload" onBackClicked={() => router.back()} />
      <ContentContainer>
        <div className="container flex flex-col">
          <div className="flex flex-wrap items-center bg-slate-50 pl-6 pr-6">
            <div className="join">
              <TextField
                label="Chapters"
                className="join-item"
                onEnterPress={handleOnSubmit}
                onChange={(e) => setTitle(e.target.value)}
                small
              />
              <div />
              <Button
                id="btn-submit"
                title="+ Submit"
                className="join-item mt-9 mb-0"
                small
                disabled={isLoading}
                loading={isLoading}
                onClick={handleOnSubmit}
              />
            </div>
          </div>
          <div>
            {files.length > 0 ? (
              <PreviewImages files={files} onDelete={handleDeleteFile} />
            ) : (
              <UploadContainer onDrop={onDrop} />
            )}
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

CreateChapter.getLayout = (page: any) => {
  return <RootLayout>{page}</RootLayout>;
};

export default CreateChapter;
