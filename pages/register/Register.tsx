import Button from '@/components/Button';
import HeaderContainer from '@/components/HeaderContainer';
import { TextField } from '@/components/Input';
import { Routes } from '@/utils/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const validationSchema = z.object({
  name: z.string().min(1, { message: 'Required name' }),
  email: z.string().min(1, { message: 'Required email' }).email('This is not a valid email.'),
  password: z.string().min(1, { message: 'Required password' }),
});

const SuccessModal = ({
  visible,
  handleOnCloseDialog,
}: {
  visible: boolean;
  handleOnCloseDialog: () => void;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  if (visible) {
    dialogRef.current?.showModal();
  }
  return (
    <div>
      <dialog id="my_modal_1" className="modal" ref={dialogRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Your account has been created</h3>
          <p className="py-4">Please check your email to confirm your account.</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn-close-dialog" onClick={handleOnCloseDialog}>
                Back to Login
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  type ValidationSchema = z.infer<typeof validationSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessModalVisible(true);
    }, 1000);
  };

  const onSuccessClose = () => {
    setSuccessModalVisible(false);
    router.push(Routes.LOGIN);
  };

  return (
    <>
      <SuccessModal visible={successModalVisible} handleOnCloseDialog={onSuccessClose} />
      <div className="flex flex-col items-center justify-center h-screen">
        <span className="mb-6 text-2xl font-semibold">Register</span>
        <div className="w-full rounded-lg shadow border sm:max-w-md">
          <HeaderContainer title="Login" onBackClicked={() => router.back()} />
          <form onSubmit={handleSubmit(onSubmit)} className="p-4">
            <TextField
              id="name"
              {...register('name')}
              label="Name"
              isFullWidth
              errorMessage={errors.name?.message}
            />
            <TextField
              id="email"
              {...register('email')}
              label="Email"
              type="email"
              isFullWidth
              errorMessage={errors.email?.message}
            />
            <TextField
              id="password"
              {...register('password')}
              label="Password"
              isFullWidth
              type="password"
              errorMessage={errors.password?.message}
            />
            <div className="flex justify-center">
              <Button
                id="btn-register"
                title="Submit"
                type="submit"
                isFullWidth
                loading={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
