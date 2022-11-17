import { ThemeProvider, useTheme } from '@emotion/react'
import { Autocomplete, Avatar, Box, Button, Card, CardActions, CardContent, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Slider, Stack, Switch, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import EventNoteIcon from '@mui/icons-material/EventNote';
import React, { useEffect, useState } from 'react';
import { getUserAvatar, getUserProfile, updateUserAvatar, } from '../services/user.service';
import { useOutletContext } from 'react-router-dom';
import { useAvatar } from './Dashboard';

export default function Profile() {
    const theme = useTheme();

    const [avatar, setAvatar] = useAvatar();
    const [email, setEmail] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [gender, setGender] = React.useState('other');
    const [isVegi, setVegi] = React.useState(false);
    const [uploadCount, setUploadCount] = React.useState(0);


    const handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
        alert('submit');
    }

    const handleAvatarUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (event.target.files) {
            const file = event.target.files[0];
            const formData = new FormData();

            formData.append("file", file);
            updateUserAvatar(formData).then(res => {
                setUploadCount(uploadCount+1);
            });
        }
    }

    useEffect(() => {
        getUserProfile().then(response => {
            let user = response.data;
            setUserName(user.username);
            setEmail(user.email); 
            setGender(user.gender);
            setVegi(user.vegi);
        });

        getUserAvatar().then(response => {
            const blob =  response.data 
            setAvatar(blob);
            if (uploadCount === 0) {
                setUploadCount(uploadCount+1);
            }
        })
    }, [uploadCount]);
    return (
        <ThemeProvider theme={theme}>
            <Box>
                <Grid container spacing={2}>
                    <Grid xs={1}>

                    </Grid>
                    <Grid xs={8}>
                        <Typography variant='h4' gutterBottom>
                            Profile
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid xs={1}></Grid>

                    <Grid xs={3} >
                        <Stack spacing={4}>
                            <Card >
                                <CardContent>
                                    <Stack spacing={2} sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Avatar src={avatar? URL.createObjectURL(avatar) : '/broken_image.jpg'} sx={{ width: 126, height: 126 }} />
                                        <Typography variant='caption' >
                                            Allowed *.jpeg, *.jpg, *.png, *.gif
                                            max size of 3.1 MB
                                        </Typography>
                                    </Stack>

                                </CardContent>
                                <CardActions sx={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                    <IconButton color="primary" aria-label="upload picture" component="label">
                                        <input hidden accept="image/*" type="file" onChange={handleAvatarUpdate} />
                                        <PhotoCamera />
                                    </IconButton>
                                </CardActions>
                            </Card>
                            <Card >
                                <CardContent>
                                    <EventNoteIcon />

                                    <Typography id="input-slider" gutterBottom>
                                        Height
                                    </Typography>
                                    <Slider defaultValue={170} aria-label="Default" valueLabelDisplay="on" />
                                    <Typography id="input-slider" gutterBottom>
                                        Weight
                                    </Typography>
                                    <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="on" />
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Update Body Record</Button>
                                </CardActions>
                            </Card>
                        </Stack>

                    </Grid>
                    <Grid xs={6}>
                        <Card>
                            <CardContent>
                                <Box component={'form'} sx={{
                                    '& .MuiTextField-root': { m: 1 },
                                }} onSubmit={handleSubmit}>
                                    <Typography variant="overline" display="block" gutterBottom>
                                        Basic Info
                                    </Typography>
                                    <Box sx={{
                                        display: 'grid',
                                        gap: 1,
                                        gridTemplateColumns: 'repeat(2, 1fr)',
                                    }}>
                                        <TextField
                                            required
                                            label="User Name"
                                            value={userName}
                                        />
                                        <TextField
                                            disabled
                                            label="Email Address"
                                            value={email}
                                        />

                                    </Box>

                                    <div>
                                        <FormControl sx={{
                                            margin: 1
                                        }}>
                                            <FormLabel>Gender</FormLabel>
                                            <RadioGroup row value={gender} onChange={e => setGender((e.target as HTMLInputElement).value)}>
                                                <FormControlLabel value="female" control={<Radio/> } label={<Typography variant='body2'>Female</Typography>}/>
                                                <FormControlLabel value="male" control={<Radio />} label={<Typography variant='body2'>Male</Typography>} />
                                                <FormControlLabel value="other" control={<Radio />} label={<Typography variant='body2'>Other</Typography>} />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>

                                    <Typography variant="overline" display="block" gutterBottom>
                                        Preferences
                                    </Typography>
                                    <Box>
                                        <FormControlLabel control={<Switch checked={isVegi} onClick={() => setVegi(!isVegi)}/>} label="I am Vegi" />
                                        <Autocomplete
                                            multiple
                                            size='small'
                                            options={[
                                                {
                                                    id: 1,
                                                    title: 'gluten'
                                                }, {
                                                    id: 2,
                                                    title: 'seafood'
                                                }, {
                                                    id: 3,
                                                    title: 'milk'
                                                }
                                            ]}
                                            getOptionLabel={(option) => option.title}
                                            // defaultValue={[top100Films[13]]}
                                            filterSelectedOptions
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="I am allergetic to"
                                                    placeholder=""
                                                />
                                            )}
                                        />
                                    </Box>

                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        mr: 3
                                    }}>
                                        <Button variant='contained' type='submit'>
                                            Save Changes
                                        </Button>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </Box>
        </ThemeProvider>
    )
}