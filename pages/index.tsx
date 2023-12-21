import { useRouter } from 'next/router';
import { Routes } from '../utils/constants';

const Main = () => {
  const router = useRouter();
  router.push(Routes.COMICS);
};

export default Main;
