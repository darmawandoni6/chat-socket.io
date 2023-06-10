import Image from 'next/image';

import React from 'react';

import { listChat, listMessage } from './constants/dummy';
import styles from './styles.module.scss';

const Home = () => {
  const handleTail = ({ msg, prev }) => {
    if (prev < 0) return true;
    if (msg.isSender === listMessage[prev].isSender) return false;
    return true;
  };
  return (
    <div className={styles.Home}>
      <div className={styles.left}>
        <header>
          <Image src="/images/me.jpg" width={40} height={40} alt="" />
          <div className={styles.rightIcons}>
            <Image src="/images/status.svg" width={24} height={24} alt="" />
            <Image src="/images/message-icon.svg" width={24} height={24} alt="" />
            <Image src="/images/menu-icon.svg" width={24} height={24} alt="" />
          </div>
        </header>
        <div className={styles.searchChat}>
          <div className={styles.searchBar}>
            <Image src="/images/search-icon.svg" width={28} height={35} alt="" />
            <input type="text" placeholder="Search or start new chat" />
          </div>
        </div>
        <div className={styles.chats}>
          {listChat.map((item, i) => (
            <div className={styles.chat} key={i}>
              <div className={styles.chatLeft}>
                <Image src={item.img} width={50} height={50} alt={item.name} />
              </div>
              <div className={styles.chatRight}>
                <section>
                  <span className={styles.contactName}>{item.name}</span>
                  <span className={styles.chatDate}>{item.chatDate}</span>
                </section>
                <section>
                  <div className={styles.chatRightBottomLeft}>
                    <Image
                      width={20}
                      height={18}
                      className={styles.doubleCheckMark}
                      src="/images/double-check-seen.svg"
                    />
                    {item.isTyping ? (
                      <span className={styles.chatMessageTyping}>Alice is typing...</span>
                    ) : (
                      <span className={styles.chatMessage}>{item.lastMessage}</span>
                    )}
                  </div>
                  <div className={styles.chatRightBottomRight}>
                    {item.unread > 0 && (
                      <span className={styles.unreadMessagesNumber}>{item.unread}</span>
                    )}
                    <span className={styles.chatOptions}>
                      <Image width={18} height={18} src="/images/down-arrow.svg" />
                    </span>
                  </div>
                </section>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <Image width={40} height={40} src="/images/timmy-m-harley.jpg" alt="" />
            <div className={styles.contactName}>
              <span className={styles.name}>Timmy M Harley</span>
              <spa className={styles.status}>Online </spa>
            </div>
          </div>
          <div className={styles.headerRight}>
            <Image
              width={24}
              height={24}
              className={styles.searchIcon}
              src="/images/search-icon.svg"
              alt=""
            />
            <Image
              width={24}
              height={24}
              className={styles.menuIcon}
              src="/images/menu-icon.svg"
              alt=""
            />
          </div>
        </div>
        <div className={styles.chatWindow}>
          {listMessage.map((item, i) => (
            <div className={item.isSender ? styles.sender : styles.receiver} key={i}>
              {handleTail({ msg: item, prev: i - 1 }) && (
                <span className={styles.messageTail}>
                  {item.isSender ? (
                    <Image width={8} height={13} src="/images/message-tail-sender.svg" alt="" />
                  ) : (
                    <Image width={8} height={13} src="/images/message-tail-receiver.svg" alt="" />
                  )}
                </span>
              )}
              {item.type === 'text' && (
                <>
                  <span className={styles.message}>{item.message}</span>
                  <span className={styles.messageTime}>{item.time}</span>
                </>
              )}
              {item.type === 'img' && (
                <div className={styles.image}>
                  <img src={item.imgUrl} alt="" />
                  <span className={styles.messageTime}>{item.time}</span>
                </div>
              )}
              {item.isSender && (
                <span className={styles.messageStatus}>
                  <Image width={16} height={14} src="/images/double-check-seen.svg" alt="" />
                </span>
              )}
            </div>
          ))}

          {/* <div className={styles.receiver}>
            <span className={styles.messageTail}>
              <Image width={8} height={13} src="/images/message-tail-receiver.svg" alt="" />
            </span>
            <span className={styles.message}>Im doing fine! What about you??</span>
            <span className={styles.messageTime}>21:35</span>
          </div> */}
        </div>
        <div className={styles.messageBar}>
          <div className={styles.barLeft}>
            <Image width={24} height={24} src="/images/icons.svg" alt="" />
            <Image width={24} height={24} src="/images/attach-icon.svg" alt="" />
          </div>
          <div className={styles.inputMessage}>
            <input type="text" placeholder="Type a message" />
          </div>
          <div className={styles.barRight}>
            <Image width={24} height={24} src="/images/audio-icon.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
