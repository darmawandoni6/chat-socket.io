import InRoom from '@features/message/InRoom';
import MainContainer from '@features/message/shared/MainContainer';

const index = () => <InRoom />;

index.getLayout = function getLayout(page) {
  return <MainContainer>{page}</MainContainer>;
};
export default index;
