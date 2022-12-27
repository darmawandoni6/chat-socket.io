/* eslint-disable no-unused-vars */

/* eslint-disable operator-linebreak */
import Image from 'next/image';
import { useRouter } from 'next/router';

import user from '@assets/images/user.jpg';
import Textarea from 'rc-textarea';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RenderChat from './components/RenderChat';
import messageAction from './data/message.action';
import style from './styles.module.scss';

function InRoom() {
  const [inputMsg, setInputMsg] = React.useState('');
  const [roomProfile, setRoomProfile] = React.useState({
    name: '',
    email: '',
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const { listRoom, selectRoom } = useSelector((state) => state.message);
  const { profile } = useSelector((state) => state.auth);

  React.useEffect(() => {
    const { id } = router.query;
    if (id) {
      dispatch(messageAction.listMessage(id));
    }
  }, [router]);

  React.useEffect(() => {
    if (!selectRoom.id && listRoom) {
      const { id } = router.query;
      const find = listRoom.find((item) => item.id === parseInt(id, 10));
      dispatch(messageAction.selectRoom(find));
    }
    if (selectRoom.id) {
      setRoomProfile((prev) => ({
        ...prev,
        name: selectRoom.members[0].user.name,
        email: selectRoom.members[0].user.email,
      }));
    }
  }, [selectRoom.id, listRoom]);

  const sendMessage = React.useCallback(() => {
    const { id: roomId } = router.query;
    const payload = {
      message: inputMsg.trim(),
      roomId,
      code: crypto.randomUUID(),
    };
    dispatch(messageAction.appendMessage({ ...payload, userId: profile.id }));
    dispatch(messageAction.sendMessage(payload));
    setInputMsg('');
  }, [inputMsg]);

  const handleKey = React.useCallback(
    (e) => {
      if (e.keyCode === 13 && e.ctrlKey) {
        sendMessage();
      }
    },
    [inputMsg],
  );
  return (
    <div className={style.right}>
      <header className="px-3 d-flex align-items-center border-bottom" style={{ minHeight: 60 }}>
        <div className={style.room}>
          <i className="fas fa-user-circle" style={{ fontSize: 24 }} />
          <div className={style.user}>
            <p className={style.name}>{roomProfile.name}</p>
            <p className={style.email}>{roomProfile.email}</p>
          </div>
        </div>
      </header>
      <section id="listChat" className={style.listChat}>
        <RenderChat />
      </section>
      <footer>
        <div className={style.inputMessage}>
          <div className={style.textArea}>
            <Textarea
              value={inputMsg}
              autoSize={{ minRows: 1, maxRows: 5 }}
              placeholder="Message ...."
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => handleKey(e)}
            />
          </div>
          <button className="btn" onClick={sendMessage}>
            <i className="fas fa-paper-plane" />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default InRoom;
