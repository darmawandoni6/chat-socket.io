import Message from '@features/message';
import MainContainer from '@features/message/shared/MainContainer';

const index = () => <Message />;

index.getLayout = function getLayout(page) {
  return <MainContainer>{page}</MainContainer>;
};

export default index;
