import React, { useState, useRef } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Avatar, Input, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SendIcon from '@mui/icons-material/Send';
import {io} from 'socket.io-client'
import { useLocation } from 'react-router-dom';
import { Message } from '../../interface';
const socket = io('http://localhost:3000')

const Chat = () => {
    const chatInput = useRef<HTMLInputElement>()
    const [selectInfoMess, setSelectInfoMess] = useState<boolean>(true)
    const [message, setMessage] = useState<String>('')
    const [displayMessage, setDisplayMessage] = useState<Message[]>([])
    const search = useLocation().search
    const room = new URLSearchParams(search).get('room')
    const chatBoxRef = useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        socket.emit('join-room', room, (messRoom: String) => {
            setDisplayMessage(prev => [...prev, {status: 'send', message: messRoom}])
        })
    }, [room])

    React.useEffect(() => {
        if(chatBoxRef.current)
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }, [displayMessage]);

    socket.on('connect', () => {
        setDisplayMessage(prev => [...prev,  {status: 'send', message: `id: ${socket.id}`}])
    })

    socket.off('receive-message')
    socket.on('receive-message', (mess) => {
        console.log(mess)
        setDisplayMessage(prev => [...prev, {status: 'receive', message: mess.message}])
    })

    const sendMessage = () => {
        if(message) {
            setDisplayMessage(prev => [...prev, {status: 'send', message: message}])
            socket.emit('send-message', message, room)
            
            if(chatInput.current)
                chatInput.current.focus()

            setMessage('')
        }
    }

    return (
        <Container component="main" maxWidth="xl">
            <Grid container>
                <Grid item xs={3} className='grid__content list__container'>
                    <Item className='list__heading'>
                        <h1>Chat</h1>
                        <AddCircleOutlineIcon/>
                    </Item>
                    <Item className='list__heading'>
                        <input className='list__search' type="search" placeholder='Tìm kiếm bạn bè' />
                    </Item>
                    <Item>
                        <ListItemButton component="a" href="#simple-list">
                            <ListItemAvatar>
                                <Avatar/>
                            </ListItemAvatar>
                            <ListItemText 
                                primary="Game nhái tốc chiến"
                                secondary="best darius: manh co chua"
                            />
                        </ListItemButton>
                        <ListItemButton component="a" href="#simple-list">
                            <ListItemAvatar>
                                <Avatar/>
                            </ListItemAvatar>
                            <ListItemText 
                                primary="Game nhái tốc chiến"
                                secondary="best darius: manh co chua"
                            />
                        </ListItemButton>
                    </Item>
                </Grid>
                <Grid item xs={selectInfoMess ? 6 : 9} className='grid__content chat__container'>
                    <ListItem component="a" className='chat__heading'>
                        <ListItemAvatar>
                            <Avatar/>
                        </ListItemAvatar>
                        <ListItemText 
                            primary="Game nhái tốc chiến"
                            secondary="Đang hoạt động"
                        />
                        <ListItemIcon onClick={() => setSelectInfoMess(prev => !prev)}>
                            <InfoOutlinedIcon/>
                        </ListItemIcon>
                    </ListItem>
                    {/* <BoxChat/> */}
                    <div className='chat__box'>
                        <div className='chat__box__content' ref={chatBoxRef}>
                                {displayMessage.slice().reverse().map((mess: Message, index: number) => {
                                    return (
                                        <div
                                            key={index}
                                            className={mess.status === 'receive' ? 'chat__box__content__receive' : 'chat__box__content__send'}
                                        >
                                            {mess.message}
                                        </div>
                                )})}
                        </div>
                    </div>

                    <ListItem className='chat__footer'>
                        <Input
                            ref={chatInput}
                            className='chat__input'
                            type="search"
                            placeholder='Aa'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {if(message && e.key==='Enter') sendMessage()}}
                            autoFocus
                        />
                        {message ? <SendIcon style={{cursor: 'pointer', color: 'pink'}} onClick={sendMessage}/> : <SendIcon/>}
                    </ListItem>
                </Grid>
                {selectInfoMess && <Grid item xs={3} className='grid__content'>
                    <Item>
                        
                    </Item>
                </Grid>}
            </Grid>
        </Container>
    )
}

export default Chat