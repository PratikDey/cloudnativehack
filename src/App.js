import {useState, useEffect} from 'react'
import {StreamChat} from "stream-chat"
import {Chat, Channel, Window, ChannelHeader, MessageInput, MessageList, ChannelList} from "stream-chat-react"
import 'stream-chat-react/dist/css/index.css'

import styled from 'styled-components'
import CustomChannelList from './components/CustomChannelList'
import ChannelBody from './components/ChannelBody'
const Container = styled.div`
  display: flex;
  .left-column {
    width: 300px;
  }

  .right-column {
    flex: 1;
  }
`



const API_KEY = process.env.REACT_APP_API_KEY 


const USER1 = {
  id: "user1",
  name: "user1"
}

const USER2 = {
  id: "user1",
  name: "user1"
}

const USER3 = {
  id: "user1",
  name: "user1"
}

const users = [USER1, USER2, USER3]

const getRandomUser = () => {
  const randomIndex = Math.floor(Math.random() * users.length);
  return users[randomIndex];
}

function App() {

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [creatingChannels, setCreatingChannels] = useState(false);
  useEffect(() => {
    async function initChat() {
      const client = StreamChat.getInstance('qyffjs3422yc');

      const user = getRandomUser()

      client.connectUser(user, client.devToken(user.id))

      const channel = client.channel("team", "general", {
        name: "General",
      });

      await channel.create()
      channel.addMembers([user.id])
      setChannel(channel)
      setChatClient(client)
    }

    initChat()

    return () => {
      if(chatClient) chatClient.disconnectUser()
    }
  }, [])


  if(!chatClient || !channel) return(
    <></>
  )

  return (
    <div>
      <Chat client={chatClient} theme={'messaging light'}>
        <Container>
          <div className='left-column'>
            <CustomChannelList/>
          </div>
          <div className='right-column'>
            <Channel>
              <ChannelBody></ChannelBody>
            </Channel>
          </div>
        </Container>
      </Chat>
    </div>
  );
}

export default App;
