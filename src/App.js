import React, { useState } from 'react';
import Chat from './server';
import styled from 'styled-components';

function App() {
	const [roomList, setRoomList] = useState([]);
	const userInformation = {
		id: 3,
		name: 'dongha',
		isAdmin: false,
		isBlock: false,
	};

	const chat = new Chat();

	const createChatRoom = () => {
		chat.createRoom(userInformation);
		setRoomList(chat.roomList);
		console.log(chat.roomList);
	};

	return (
		<Container>
			<button onClick={createChatRoom}>채팅방 만들기</button>
			<Content>
				<div>채팅방 리스트</div>
				<ChatListContainer>
					{roomList.map((room) => (
						<>
							<div>방장: {room.admin.name}</div>
							<div>참가 유저: {room.joinedUserList}</div>
							<div>
								메시지들:
								{room.messageList.map((item) => (
									<div>{item.message}</div>
								))}
							</div>
						</>
					))}
				</ChatListContainer>
			</Content>
		</Container>
	);
}

export default App;

const Container = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;
const Content = styled.div`
	display: flex;
	flex-direction: column;
	padding-top: 30px;
	height: 100%;
`;

const ChatListContainer = styled.div``;
