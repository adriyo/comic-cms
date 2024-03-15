import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Routes } from '@/utils/constants';
import Button from '@/components/Button';
import { TextField } from '@/components/Input';
import { toast } from 'react-toastify';
import { useLogin } from '@/src/pages/user/hooks';

const LoginPage = () => {
  const [emailError, setEmailError] = useState<string | null>();
  const [passwordError, setPasswordError] = useState<string | null>();
  const router = useRouter();
  const { isLoading, error, data, mutate } = useLogin();

  const onRegisterClicked = () => {
    router.push(Routes.REGISTER);
  };

  useEffect(() => {
    if (data && data.data) {
      toast.success(`${data.message}`, { hideProgressBar: true });
      router.replace(Routes.MAIN);
    }
  }, [data, router]);

  useEffect(() => {
    if (error) {
      toast.error(`${error}`, { hideProgressBar: true });
    }
  }, [error]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!formData.get('txt-email')) {
      setEmailError('Email cannot be empty');
      return;
    }
    setEmailError(null);
    if (!formData.get('txt-password')) {
      setPasswordError('Password cannot be empty');
      return;
    }
    setPasswordError(null);
    mutate({
      email: formData.get('txt-email') as string,
      password: formData.get('txt-password') as string,
    });
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center md:h-screen">
        <label className="flex items-center mb-6 text-2xl font-semibold">CMS</label>
        <div className="w-full rounded-lg shadow border sm:max-w-md xl:p-0 ">
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <TextField
                id="txt-email"
                label="Your Email"
                placeholder="name@company.com"
                type="email"
                enabled={isLoading}
                errorMessage={emailError}
                isFullWidth
              />
              <TextField
                id="txt-password"
                type="password"
                label="Password"
                placeholder="*********"
                enabled={isLoading}
                errorMessage={passwordError}
                isFullWidth
              />
              <div className="flex">
                <label className="label cursor-pointer">
                  <input id="remember" type="checkbox" className="checkbox" />
                  <span className="ml-3 label-text">Remember me</span>
                </label>
              </div>
              <Button
                id="btn-login"
                title="Login"
                loading={isLoading}
                disabled={isLoading}
                type={'submit'}
                isFullWidth
              />
              <div className="divider">or</div>
              <Button
                id="btn-register"
                title="Register"
                type={'button'}
                disabled={isLoading}
                isFullWidth
                className="btn-outline"
                onClick={onRegisterClicked}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
