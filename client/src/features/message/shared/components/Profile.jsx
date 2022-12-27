import authAction from '@features/auth/data/auth.action';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';

import style from '../../styles.module.scss';

function Profile({ isOpen, toggle }) {
  const { profile, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!profile) return null;

  const logOuth = useCallback(async () => {
    const err = await dispatch(authAction.logOut());
    if (!err) window.location.href = '/';
  }, []);

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalBody className={style.profilePopUp}>
        <i className="fas fa-user-circle" style={{ fontSize: 56 }} />
        <div className={style.container}>
          <p className={style.title}>{profile.name}</p>
          <p>{profile.email}</p>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn w-100" onClick={logOuth} disabled={loading}>
          {loading ? 'Loading ...' : 'Log Out'}
        </button>
      </ModalFooter>
    </Modal>
  );
}

export default React.memo(Profile);
