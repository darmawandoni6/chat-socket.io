import MainLayout from '@components/MainLayout';
import Home from '@features/Home';

const index = () => <Home />;

index.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
export default index;
