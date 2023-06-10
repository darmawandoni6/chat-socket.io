import moment from 'moment';

const findUser = (users = [], id) => {
  const find = users.find((item) => item.id === id);
  if (find) {
    return find.id;
  }
  return false;
};

const renderMessage = (messages) => {
  const listChat = [];
  if (messages) {
    const now = moment().format('YYYY-MM-DD');
    messages.forEach((element) => {
      let { createdAt } = element;
      const createdMsg = moment(createdAt).format('YYYY-MM-DD');
      createdAt = moment(createdMsg);
      const dif = moment(now).diff(createdAt, 'days');
      if (dif === 0) {
        if (!listChat.find((item) => item === 'Today')) {
          listChat.push('Today');
        }
      } else if (dif === 1) {
        if (!listChat.find((item) => item === 'Tomorow')) listChat.push('Tomorow');
      } else if (!listChat.find((item) => item === createdMsg)) {
        listChat.push(createdMsg);
      }
      listChat.push(element);
    });
  }
  return listChat;
};

export default {
  handleSendMessage: (messages, send) => {
    const payloadSend = {
      id: crypto.randomUUID(),
      replyId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: send.userId,
      roomMemberId: send.roomId,
      message: send.message,
      code: send.code,
    };

    return renderMessage([...messages, payloadSend]);
  },
  handleReceiveMessages: (messages = [], receive) => {
    const i = messages.findIndex((item) => item.code === receive.code);
    if (i >= 0) {
      delete messages[i].code;
      return [...messages];
    }
    return renderMessage([...messages, receive]);
  },
  handleListMessages: (messages) => {
    return renderMessage(messages);
  },
  handleOnlineRoom: (listRoom = [], user) => {
    listRoom.forEach((element, i) => {
      const { members } = element;
      const idx = members.findIndex((item) => findUser(user, item.userId));
      listRoom[i].online = false;
      if (idx >= 0) listRoom[i].online = true;
    });
    return [...listRoom];
  },
  handleNotifMessage: (listRoom = [], notif) => {
    const idx = listRoom.findIndex((item) => item.id === notif.roomMemberId);
    if (idx >= 0) {
      listRoom[idx] = {
        ...listRoom[idx],
        message: notif,
      };
    }
    return [...listRoom];
  },
  handleReadNotifMessage: (listRoom = [], idx) => {
    listRoom[idx] = {
      ...listRoom[idx],
      notif: false,
    };
    return [...listRoom];
  },
};
