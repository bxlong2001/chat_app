import React, { useState } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BoxChat from './BoxChat/BoxChat';
import SendIcon from '@mui/icons-material/Send';

const Chat = () => {
    const [selectInfoMess, setSelectInfoMess] = useState<boolean>(true)
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
                <Grid item xs={selectInfoMess ? 6 : 9} className='grid__content'>
                    <Item>
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
                        <BoxChat/>
                        <ListItem className='chat__footer'>
                            <input className='chat__input' type="search" placeholder='Aa' />
                            <ListItemIcon>
                                <SendIcon/>
                            </ListItemIcon>
                        </ListItem>
                    </Item>
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