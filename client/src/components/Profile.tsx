import { ThemeProvider, useTheme } from '@emotion/react'
import { Autocomplete, Avatar, Box, Button, Card, CardActions, CardContent, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Slider, Stack, Switch, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import EventNoteIcon from '@mui/icons-material/EventNote';
import React, { useEffect } from 'react';
import { getUserAvatar, getUserLatestBodyRecord, getUserProfile, udpateUserBodyRecord, updateUserAvatar, updateUserProfile, } from '../services/user.service';
import { useAvatar } from './Dashboard';
import { getAllergies } from '../services/food.service';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function Profile() {

    const theme = useTheme();

    const [avatar, setAvatar] = useAvatar();
    const [email, setEmail] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [gender, setGender] = React.useState('other');
    const [isVegi, setVegi] = React.useState(false);
    const [allergeticOptions, setAllergeticOptions] = React.useState<readonly {id: number, label: string}[]>([]);
    const [allergetics, setAllergetics] = React.useState<{id: number, label: string}[]>([]);
    const [birthdate, setBirthdate] = React.useState<Dayjs | null>(null);
    const [uploadCount, setUploadCount] = React.useState(0);
    const [weight, setWeight] = React.useState(0);
    const [height, setHeight] = React.useState(0);

    const handleSubmit = () => {
        const allergens = allergetics.map(v => v.id);
        
        const profileJson = {
            'userName': userName,
            'gender': gender,
            'isVegi': isVegi,
            'birthdate': birthdate?.toISOString(),
            'allergens': allergens
        }
        updateUserProfile(profileJson).then(() => {
            alert('success');
        })
    }

    const handleAvatarUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (event.target.files) {
            const file = event.target.files[0];
            const formData = new FormData();

            formData.append("file", file);
            updateUserAvatar(formData).then(res => {
                setUploadCount(uploadCount + 1);
            });
        }
    }

    const handleBodyRecordUpdate = () => {
        udpateUserBodyRecord(height, weight).then(response => {
            setHeight(response.data.height);
            setWeight(response.data.weight);
        });
    }

    useEffect(() => {
        getUserProfile().then(response => {
            let user = response.data;
            setUserName(user.username);
            setEmail(user.email);
            setGender(user.gender);
            setVegi(user.vegi);
            setBirthdate(dayjs(user.birthdate));
            setAllergetics(user.allergens)
        });

        getUserLatestBodyRecord().then(response => {
            setHeight(response.data.height);
            setWeight(response.data.weight);
        });

        getAllergies().then(response => {
            const allergies = response.data.allergies;
            setAllergeticOptions(allergies);
        });

        getUserAvatar().then(response => {
            const blob = response.data
            setAvatar(blob);
            if (uploadCount === 0) {
                setUploadCount(uploadCount + 1);
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
                                        <Avatar src={avatar ? URL.createObjectURL(avatar) : '/broken_image.jpg'} sx={{ width: 126, height: 126 }} />
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
                                        Height (cm)
                                    </Typography>
                                    <Slider value={height} valueLabelDisplay="auto" onChangeCommitted={(e, value) => { if (typeof value === 'number') { setHeight(value) } }} min={100} max={200} />
                                    <Typography id="input-slider" gutterBottom>
                                        Weight (kg)
                                    </Typography>
                                    <Slider value={weight} valueLabelDisplay="auto" onChangeCommitted={(e, value) => { if (typeof value === 'number') { setWeight(value) } }} min={0} max={150}/>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={handleBodyRecordUpdate}>Update Body Record</Button>
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
                                            onChange={(e) => {setUserName(e.target.value)}}
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
                                                <FormControlLabel value="female" control={<Radio />} label={<Typography variant='body2'>Female</Typography>} />
                                                <FormControlLabel value="male" control={<Radio />} label={<Typography variant='body2'>Male</Typography>} />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>


                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Your Birth Date"
                                            value={birthdate}
                                            onChange={(newValue) => {
                                                setBirthdate(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>

                                    <Typography variant="overline" display="block" gutterBottom>
                                        Preferences
                                    </Typography>
                                    <Box>
                                        <FormControlLabel control={<Switch checked={isVegi} onClick={() => setVegi(!isVegi)} />} label="I am Vegi" />
                                        <Autocomplete
                                            multiple
                                            size='small'
                                            options={allergeticOptions}
                                            filterSelectedOptions
                                            value={allergetics}
                                            onChange={(e, v) => {
                                                setAllergetics(v);
                                            }}
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