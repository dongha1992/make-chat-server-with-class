import React from 'react';
import Chat from './server';
import styled from 'styled-components';

function App() {
	const userInformation = {
		id: 3,
		name: 'dongha',
		isAdmin: false,
		isBlock: false,
	};

	const chat = new Chat(userInformation);
	console.log(chat);

	const createChatRoom = () => {
		chat.createRoom();
	};

	return (
		<Container>
			<button onClick={createChatRoom}>채팅방 만들기</button>
			<div></div>
		</Container>
	);
}

export default App;

const Container = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
`;
const Content = styled.div``;
