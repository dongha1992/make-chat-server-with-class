class Chat {
  #password = null;
  constructor() {
    this.roomList = [];
  }

  createRoom(user) {
    if (user.isAdmin) {
      return console.log('이미 다른 방을 생성하셨습니다.');
    }

    user.isAdmin = true;
    const roomInformation = {
      roomId: this.roomList.length + 1,
      admin: user,
      joinedUserList: [],
      messageList: [],
      isPrivate: false,
    };

    this.roomList = [...this.roomList, roomInformation];
  }

  deleteRoom(roomId, user) {
    let findChatRoom = this._findChatRoom(roomId);
    if (user.id !== findChatRoom.admin.id) {
      return console.log('방장만 방을 삭제할 수 있습니다.');
    }
    this.roomList = this.roomList.filter((room) => room.roomId !== roomId);
  }

  joinRoom(roomId, user, ...args) {
    const userPassword = args[0];
    let findChatRoom = this._findChatRoom(roomId);
    if (!findChatRoom) {
      return console.log('존재하지 않는 방입니다.');
    } else if (this.isPrivate) {
      if (this.#password === userPassword) {
        findChatRoom.joinedUserList = [...findChatRoom.joinedUserList, user];
      } else {
        return console.log('비밀번호를 잘못 입력하셨습니다. ');
      }
    }
  }

  exitRoom(roomId, user) {
    let findChatRoom = this._findChatRoom(roomId);
    findChatRoom.joinedUserList = findChatRoom.joinedUserList.filter(
      (_user) => _user.id !== user.id
    );
  }

  changeToPrivat(user, password) {
    this.isPrivate = true;
    this.#password = password;
  }

  kickout(roomId, user, targetUser) {
    let findChatRoom = this._findChatRoom(roomId);
    if (findChatRoom.admin.id !== user.id) {
      return console.log('방장만 사용 가능합니다.');
    }
    findChatRoom.joinedUserList = findChatRoom.joinedUserList.filter(
      (_user) => _user.id !== targetUser.id
    );
  }

  blockUser(roomId, user, targetUser) {
    let findChatRoom = this._findChatRoom(roomId);
    if (findChatRoom.admin.id !== user.id) {
      return console.log('방장만 사용 가능합니다.');
    }

    findChatRoom.joinedUserList = findChatRoom.joinedUserList.map((_user) => {
      if (_user.id === targetUser.id) {
        return { ..._user, isBlock: !_user.isBlock };
      } else {
        return user;
      }
    });
  }

  chat(roomId, user, message) {
    let findChatRoom = this._findChatRoom(roomId);
    let findUserInChatRoom = this._findUserInChatRoom(findChatRoom, user);
    if (!findUserInChatRoom) {
      return console.log('방에 입장하지 않으셨습니다.');
    } else if (findUserInChatRoom.isBlock) {
      return;
    }

    const messageInformation = {
      user: findUserInChatRoom,
      message,
    };
    findChatRoom.messageList = [
      ...findChatRoom.messageList,
      messageInformation,
    ];
  }

  _findChatRoom(roomId) {
    return this.roomList.find((room) => room.roomId === roomId);
  }

  _findUserInChatRoom(findChatRoom, user) {
    return findChatRoom.joinedUserList.find((_user) => _user.id === user.id);
  }
}

// const myAccount = {
//   id: 3,
//   name: 'dongha',
//   isAdmin: false,
//   isBlock: false,
// };
// const yourAccount = {
//   id: 2,
//   name: 'person_id_2',
//   isAdmin: false,
//   isBlock: false,
// };
// const anotherAccount = {
//   id: 1,
//   name: 'person_id_1',
//   isAdmin: false,
//   isBlock: false,
// };

// const chat_1 = new Chat();

// chat_1.createRoom(myAccount);
// chat_1.createRoom(yourAccount);
// chat_1.joinRoom(1, yourAccount);
// chat_1.chat(1, yourAccount, '안녕하세요.');
// chat_1.joinRoom(1, anotherAccount);
// chat_1.exitRoom(1, yourAccount);
// chat_1.deleteRoom(1, myAccount);
// chat_1.blockUser(1, myAccount, anotherAccount);
// chat_1.changeToPrivat(myAccount, '0000');
// chat_1.joinRoom(1, anotherAccount, '0000');
// chat_1.blockUser(1, myAccount, anotherAccount);
// chat_1.chat(1, anotherAccount, 'block test(should be not displaying)');
// chat_1.blockUser(1, myAccount, anotherAccount);
// chat_1.chat(1, anotherAccount, 'block test(should be displaying)');
// chat_1.joinRoom(1, yourAccount, '0000');
// chat_1.kickout(1, myAccount, anotherAccount);

export default Chat;
