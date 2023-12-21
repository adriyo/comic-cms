import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { LocalStorageKeys } from '../../utils/constants';
import Button from '@/components/Button';
import { TextField } from '@/components/Input';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>();
  const [passwordError, setPasswordError] = useState<string | null>();
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, 'accessToken');
      setLoading(false);
      router.replace('/');
    }, 2000);
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
                enabled={loading}
                errorMessage={emailError}
                isFullWidth
              />
              <TextField
                id="txt-password"
                type="password"
                label="Password"
                placeholder="*********"
                enabled={loading}
                errorMessage={passwordError}
                isFullWidth
              />
              <div className="flex">
                <label className="label cursor-pointer">
                  <input id="remember" type="checkbox" className="checkbox" />
                  <span className="ml-3 label-text">Remember me</span>
                </label>
              </div>
              <Button id="btn-login" title="Login" loading={loading} type={'submit'} isFullWidth />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
