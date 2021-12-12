import styled from "styled-components";

const Item = styled.li`

`

export default function ChannelItem({onJoin, channel}) {
    return (
        <Item>
            <div>
                <img src={} alt=""/>
            </div>

            <div>
                <span className="name">{channel?.data?.name}</span>
                <p className="desc">{channel?.data?.description}</p>
            </div>
            <button onClick={() => onJoin(channel?.id)}>Join</button>
        </Item>
    )
} 