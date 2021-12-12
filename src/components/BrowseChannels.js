import { useEffect, useState } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import styled from "styled-components";
import ChannelItem from "./ChannelItem";

const Container = styled.div`

`

export default function BrowseChannels() {
    const {client} = useChatContext()
    const [channels, setChannels] = useState([])
    const [loadingChannels, setLoadingChannels] = useState(true)

    useEffect(() => {
        const fetchChannels = async () => {
            const response = client.queryChannels()

            const filteredChannels = response.filter(c => c.type === "team")
            
            setChannels(filteredChannels)
            setLoadingChannels(true)

        }

        fetchChannels()
    })

    return (
        <Container> 
            {loadingChannels ? (<div className="loading-channels">Loading channels ....</div>) 
            : 
            (
                <ul>
                {channels.map((c) => <ChannelItem key={c.cid} onJoin={null}></ChannelItem>)}
                </ul>
            
            )}
        </Container>
    )
}