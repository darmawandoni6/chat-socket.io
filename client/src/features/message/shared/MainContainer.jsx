import { useRouter } from 'next/router';

import authAction from '@features/auth/data/auth.action';
import cx from 'classnames';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { io } from 'socket.io-client';

import messageAction from '../data/message.action';
import style from '../styles.module.scss';
import CreateRoom from './components/CreateRoom';
import Profile from './components/Profile';

const socket = io('http://localhost:4500');

function MainContainer({ children }) {
  const [createRoom, setCreateRoom] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const { listRoom, selectRoom } = useSelector((state) => state.message);

  React.useEffect(() => {
    if (profile.id) {
      socket.emit('user_connect', profile);
    }
  }, [profile]);

  React.useEffect(() => {
    if (selectRoom.id) {
      socket.on(`receive_message-${selectRoom.id}`, (item) => {
        dispatch(messageAction.receiveMessage(item));
      });
    }
  }, [selectRoom.id]);

  React.useEffect(() => {
    socket.on('online', (item) => {
      dispatch(messageAction.onlineRoom(item));
    });
    socket.on('notif_message', (item) => {
      dispatch(messageAction.notifMessage(item));
    });
  }, [socket]);

  React.useEffect(() => {
    dispatch(authAction.profile());
    dispatch(messageAction.listRoom());
  }, []);

  const handleSelectRoom = React.useCallback(async (item, idx) => {
    await dispatch(messageAction.selectRoom(item, idx));
    router.push(`/message/room/${item.id}`);
  }, []);

  const showNotif = useCallback(
    (item) => {
      let notif = false;
      if (item.messages[0]) {
        notif = item.messages[0].userId !== profile.id;
      }
      return notif;
    },
    [profile],
  );
  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center py-5">
      <Row className=" border h-100 w-100" style={{ backgroundColor: 'white' }}>
        <Col lg="4" className="p-0 border h-100 ">
          <header
            className="px-3 d-flex align-items-center justify-content-center border-bottom"
            style={{ height: 60 }}
          >
            <div className="text-center w-100">
              <button className="btn fw-normal" onClick={() => setOpenProfile(true)}>
                {profile.name} <i className="fas fa-chevron-down ms-2" />
              </button>
            </div>
            <button className="btn" onClick={() => setCreateRoom(true)}>
              <i className="fas fa-edit" />
            </button>
            <CreateRoom isOpen={createRoom} toggle={() => setCreateRoom(false)} />
            <Profile isOpen={openProfile} toggle={() => setOpenProfile(false)} />
          </header>
          <section className={style.list}>
            {listRoom?.map((item, i) => (
              <div
                className={cx(
                  style.room,
                  parseInt(router.query.id, 10) === item.id ? style.active : '',
                )}
                key={i}
                role="button"
                tabIndex="0"
                onClick={() => handleSelectRoom(item, i)}
              >
                <i className="fas fa-user-circle" style={{ fontSize: 56 }} />
                {item.online && (
                  <div className={style.dot}>
                    <i className="fa-solid fa-circle" />
                  </div>
                )}
                {showNotif(item) && (
                  <div className={style.dotNotif}>
                    <i className="fa-solid fa-circle" />
                  </div>
                )}
                <div className={style.user}>
                  <p className={style.name}>{item.members[0].user.name}</p>
                  {item.messages[0] && (
                    <p className={style.message}>
                      {`${item.messages[0].user.name} : ${item.messages[0].message}`}
                    </p>
                    // <p className={style.message}>
                    //   {item.messages[0].message}
                    // </p>
                  )}
                  {/* messages[0].user */}
                </div>
              </div>
            ))}
          </section>
        </Col>
        <Col className="p-0 border h-100">{children}</Col>
      </Row>
    </Container>
  );
}

export default React.memo(MainContainer);
