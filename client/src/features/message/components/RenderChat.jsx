import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';

import style from '../styles.module.scss';

function RenderChat() {
  const { profile } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  React.useEffect(() => {
    document.getElementById('bottom').scrollIntoView();
  }, [message.data]);

  const checkMark = React.useCallback((code) => {
    if (code) {
      return <i className="fas fa-check" />;
    }
    return <i className="fas fa-check-double" />;
  }, []);

  return (
    <>
      {message.data.map((item, i) => {
        if (typeof item === 'string') {
          return (
            <div className={style.container} key={i}>
              <div className={style.sperator}>{item}</div>
            </div>
          );
        }
        return (
          <div className={style.container} key={i}>
            <div
              className={style.chat}
              style={{
                float: profile.id === item.userId ? 'right' : 'left',
                backgroundColor: profile.id !== item.userId && 'white',
              }}
            >
              {item.message}
              <span className={style.time}>
                {`${moment(item.item).format('HH:mm')}`}{' '}
                {item.userId === profile.id && checkMark(item.code, item)}
              </span>
            </div>
          </div>
        );
      })}
      <div id="bottom" />
    </>
  );
}

export default React.memo(RenderChat);
