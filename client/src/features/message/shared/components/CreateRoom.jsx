import { useRouter } from 'next/router';

import { usePopUpLoading } from '@components/PopUpLoading';
import messageAction from '@features/message/data/message.action';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import style from '../../styles.module.scss';

function CreateRoom({ isOpen, toggle }) {
  const [checkUser, setCheckUser] = useState([]);
  const [userList, setUserList] = useState([]);
  const router = useRouter();
  const { setOpen } = usePopUpLoading();

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.message);

  useEffect(() => {
    if (users.data) {
      setUserList(users.data);
    }
  }, [users.data]);

  const handleChange = useCallback((e) => {
    const { value } = e.target;
    dispatch(messageAction.listUser({ search: value }));
  }, []);

  const removeList = useCallback(
    (item) => {
      const idxUser = checkUser.findIndex((u) => u.id === item.id);
      checkUser.splice(idxUser, 1);
      setCheckUser([...checkUser]);
      setUserList((prev) => [...prev, item]);
    },
    [checkUser],
  );

  const handleCreateRoom = useCallback(async (item) => {
    const payload = {
      id: item.id,
      name: item.name,
    };
    setOpen(true);
    const { data } = await dispatch(messageAction.createRoom(payload));
    setOpen(false);
    toggle();
    if (data) {
      router.push(`/message/room/${data.id}`);
    }
  }, []);

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader style={{ position: 'relative' }}>List User</ModalHeader>

      <ModalBody>
        <div className={style.rowAddUser}>
          {checkUser.map((item) => (
            <div className={style.userAd} key={item.id}>
              {item.name}
              <button className="btn" onClick={() => removeList(item)}>
                x
              </button>
            </div>
          ))}
        </div>
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col">
            <div className="form">
              <i className="fa fa-search" />
              <input
                type="text"
                className="form-control form-input"
                placeholder="Search anything..."
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className={style.listUser}>
          {userList.map((item) => (
            <div key={item.id} className={style.user} onClick={() => handleCreateRoom(item)}>
              <i className="fas fa-user-circle" />
              <div>
                <p>{item.name}</p>
                <span>{item.email}</span>
              </div>
            </div>
          ))}
        </div>
        {users.loading && (
          <div className="py-3 text-center">
            <PropagateLoader color="#049f99" />
          </div>
        )}
      </ModalBody>
    </Modal>
  );
}

export default React.memo(CreateRoom);
