import { useRouter } from 'next/router';

import { useSelector } from 'react-redux';
import { Button } from 'reactstrap';

import style from '../styles.module.scss';

function OutRoom() {
  const router = useRouter();
  const { loading } = useSelector((state) => state.message);

  if (loading) {
    return (
      <div className={style.outRoom}>
        <h1>Loading ...</h1>
      </div>
    );
  }

  return (
    <div className={style.outRoom}>
      <div className={style.icon}>
        <i className="fas fa-paper-plane" />
      </div>
      <p className={style.title}>Your Messages</p>
      <p className={style.desc}>Send private photos and messages to a friend or group.</p>
      <Button color="primary" onClick={() => router.push('/message/room/1')}>
        Send Messages
      </Button>
    </div>
  );
}

export default OutRoom;
