import { ThemeProvider, useTheme } from "@emotion/react"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Chip, Collapse, Container, Divider, FormControl, IconButton, IconButtonProps, InputLabel, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, MenuItem, Select, SelectChangeEvent, Slider, Stack, styled, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import HeightIcon from '@mui/icons-material/Height';
import NoMealsIcon from '@mui/icons-material/NoMeals';
import CakeIcon from '@mui/icons-material/Cake';
import React, { useEffect } from "react";
import SpaIcon from '@mui/icons-material/Spa';
import { green, pink, teal } from '@mui/material/colors';
import { getBreakfasts, getLunches, getDinners } from "../services/food.service";
import { getUserLatestBodyRecord, getUserProfile } from "../services/user.service";
import dayjs, { Dayjs } from "dayjs";

interface Image {
    name: string,
    path: string
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));



export default function Food() {
    const theme = useTheme();
    const [option, setOption] = React.useState('2');
    const [exercise, setExercise] = React.useState('2');
    const [expanded, setExpanded] = React.useState(false);

    const [totalCal, setTotalCal] = React.useState(0);

    const [breakfastPercent, setBreakFastPercent] = React.useState(30);
    const [lunchPercent, setLunchPercent] = React.useState(40);
    const [dinnerPercent, setDinnerPercent] = React.useState(30);

    const [breakfastCal, setBreakFastCal] = React.useState(0);
    const [lunchCal, setLunchCal] = React.useState(0);
    const [dinnerCal, setDinnerCal] = React.useState(0);

    const [breakfasts, setBreakFasts] = React.useState<Image[]>([]);
    const [lunches, setLunches] = React.useState<Image[]>([]);
    const [dinners, setDinners] = React.useState<Image[]>([]);


    const [weight, setWeight] = React.useState(0);
    const [height, setHeight] = React.useState(0);
    const [gender, setGender] = React.useState('');
    const [age, setAge] = React.useState(0);
    const [isVegi, setVegi] = React.useState(false);
    const [birthdate, setBirthdate] = React.useState<Dayjs | null>(null);
    const [allergetics, setAllergetics] = React.useState<{ id: number, label: string }[]>([]);

    const [bmr, setBMR] = React.useState(0);


    useEffect(() => {
        getUserProfile().then(r1 => {
            getUserLatestBodyRecord().then(r2 => {
                let user = r1.data;
                setGender(user.gender);
                setVegi(user.vegi);
                setBirthdate(dayjs(user.birthdate));
                setAllergetics(user.allergens);

                let height = r2.data.height;
                let weight = r2.data.weight;
                setHeight(height);
                setWeight(weight); 
                
                let age = dayjs().diff(dayjs(user.birthdate), 'year');
                setAge(age);


                let bmr = 0;
                if (user.gender === 'male') {
                    bmr = 66.4730 + (13.7516 * weight) + (5.0033 * height) - (6.7550 * age)
                } else {
                    bmr = 655.1 + (9.5634 * weight) + (1.8496 * height) - (4.6756 * age);
                }

                setBMR(bmr);
                setTotalCal(bmr * 1.37)
                setBreakFastCal(bmr * 1.37 * 0.3);
                setLunchCal(bmr * 1.37 * 0.4);
                setDinnerCal(bmr * 1.37 * 0.3);
            })
        })



    }, []);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const params1 = [0.8, 1, 1.2]
    const params2 = [1.2, 1.37, 1.725]
    const handleOptionChange = (e: SelectChangeEvent) => {
        setOption(e.target.value);
        console.log(params1[parseInt(e.target.value, 10) - 1]);

        setTotalCal(bmr * params1[parseInt(e.target.value) - 1] * params2[parseInt(exercise) - 1]);
    }

    const handleExerciseChange = (e: SelectChangeEvent) => {
        setExercise(e.target.value);
        setTotalCal(bmr * params1[parseInt(option) - 1] * params2[parseInt(e.target.value) - 1]);
    }

    const handleBreakfastPercentChange = (e: Event, newValue: number | number[]) => {
        const value = newValue as number;
        setBreakFastPercent(value);
        setBreakFastCal(value * totalCal / 100);

        if (value + lunchPercent > 100) {
            setDinnerPercent(0);
        } else {
            setDinnerPercent(100 - value - lunchPercent);
        }
        setDinnerCal(totalCal * dinnerPercent / 100);
    }

    const handleLunchPercentChange = (e: Event, newValue: number | number[]) => {
        const value = newValue as number;
        setLunchPercent(value);
        setLunchCal(value * totalCal / 100);

        if (value + breakfastPercent > 100) {
            setDinnerPercent(0);
        } else {
            setDinnerPercent(100 - value - breakfastPercent);
        }
        setDinnerCal(totalCal * dinnerPercent / 100);
    }

    const valueLabelFormat = (value: number) => {
        return `${value}%`;
    }

    const handleGenerate = () => {

        getBreakfasts(breakfastCal, isVegi).then(response => {
            setBreakFasts(response.data.foods);
        });

        getLunches(lunchCal, isVegi).then(response => {
            setLunches(response.data.foods);
        });

        getDinners(dinnerCal, isVegi).then(response => {
            setDinners(response.data.foods);
        })
    };


    return (
        <ThemeProvider theme={theme}>
            <Box>
                <Container>
                    <Card>
                        <CardHeader title="Calories Recommend" />
                        <CardContent sx={{ display: "flex", columnGap: 5 }}>
                            <Box>
                                <FormControl sx={{ pr: 5, pb: 3 }}>
                                    <InputLabel>I would like to</InputLabel>
                                    <Select
                                        value={option}
                                        label="Age"
                                        onChange={handleOptionChange}
                                        fullWidth
                                    >
                                        <MenuItem value={1}>Lose Weight</MenuItem>
                                        <MenuItem value={2}>Maintain Weight</MenuItem>
                                        <MenuItem value={3}>Gain Weight</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ pb: 3 }}>
                                    <InputLabel>My exercise level</InputLabel>
                                    <Select
                                        value={exercise}
                                        label="Age"
                                        onChange={handleExerciseChange}
                                        fullWidth
                                    >
                                        <MenuItem value={1}>Never exercise</MenuItem>
                                        <MenuItem value={2}>Lightly exercise</MenuItem>
                                        <MenuItem value={3}>Exercise a lot</MenuItem>
                                    </Select>
                                </FormControl>

                                <Typography color={"text.secondary"}>
                                    The recommend daily calories for you is
                                </Typography>



                                <Typography sx={{ color: '#40916C', fontSize: 34, fontWeight: 'medium' }}>
                                    {new Intl.NumberFormat('en-IN', {
                                        maximumFractionDigits: 2
                                    }).format(totalCal)} K
                                </Typography>

                                <Divider variant="middle" />
                                <Box>
                                    <Typography gutterBottom>Breakfast: {new Intl.NumberFormat('en-IN', {
                                        maximumFractionDigits: 2
                                    }).format(breakfastCal)} K </Typography>
                                    <Slider value={breakfastPercent} onChange={handleBreakfastPercentChange} valueLabelDisplay="auto" valueLabelFormat={valueLabelFormat} min={0} max={100} />
                                    <Typography gutterBottom>Lunch: {new Intl.NumberFormat('en-IN', {
                                        maximumFractionDigits: 2
                                    }).format(lunchCal)} K</Typography>
                                    <Slider value={lunchPercent} onChange={handleLunchPercentChange} valueLabelDisplay="auto" valueLabelFormat={valueLabelFormat} min={0} max={100} />
                                    <Typography gutterBottom>Dinner: {new Intl.NumberFormat('en-IN', {
                                        maximumFractionDigits: 2
                                    }).format(dinnerCal)} K</Typography>
                                    <Slider value={dinnerPercent} valueLabelDisplay="auto" valueLabelFormat={valueLabelFormat} />

                                </Box>



                                <Button variant="contained" onClick={handleGenerate}>
                                    Generate today's meal
                                </Button>
                            </Box>

                            <Divider orientation="vertical" flexItem />
                            <Box sx={{ display: "flex", flexDirection: "column", rowGap: 2 }}>
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <Avatar sx={{ bgcolor: green[500] }}><CakeIcon /></Avatar>
                                    <Typography variant="body1">Birthdate: {birthdate?.format('DD/MM/YYYY')}</Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <Avatar sx={{ bgcolor: green[500] }}><MonitorWeightIcon /></Avatar>
                                    <Typography variant="body1">Weight: {weight} kg</Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <Avatar sx={{ bgcolor: green[500] }}><HeightIcon /></Avatar>
                                    <Typography variant="body1">Height: {height} cm</Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <Avatar sx={{ bgcolor: green[500] }}><NoMealsIcon /></Avatar>
                                    <Typography>Allergens:</Typography>
                                    {allergetics.map(allergetic => {
                                        return <Chip label={allergetic.label} />
                                    })}
                                </Stack>
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <Avatar sx={{ bgcolor: green[500] }}><SpaIcon /></Avatar>
                                    <Typography variant="body1">I am {isVegi ? '' : 'not'} a Vegi</Typography>
                                </Stack>
                            </Box>

                        </CardContent>

                        <CardActions>
                            <Typography paragraph>How we calculate the calories?</Typography>
                            <ExpandMore expand={expanded} onClick={handleExpandClick}>
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>


                        <Collapse in={expanded} timeout="auto" unmountOnExit >
                            <CardContent sx={{ pt: 0 }}>
                                <Typography variant="h6">
                                    BMR
                                </Typography>
                                <Typography variant="body2">
                                    BMR is the number of calories a person burns by simply existing. BMR varies based on age, sex, size and genetics. To calculate BMR, a person uses inches for height, pounds for weight, and years for age in the following formulas:
                                </Typography>
                                <Typography variant="body2">
                                    - For men: 66 + (6.2 * weight) + (12.7 * height) - (6.76 * age)
                                </Typography>
                                <Typography variant="body2">
                                    - For women: 655.1 + (4.35 * weight) + (4.7 * height) - (4.7 * age)
                                </Typography>

                                <Typography variant="h6">
                                    Activities Points
                                </Typography>
                                <Typography variant="body2">
                                    Points for activity levels are: 1.2 points for a person who does little to no exercies; 1.37 points for a acitve person who does light exercise 1-3 days a week; 1.725 points for a very active person who exercise hard 6-7 days a week.
                                </Typography>
                                <Typography variant="body1">
                                    When the BMR is calculated, and the activties points are determined, the two scores are multiplied. The total is the number of calories burned on an average day.
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                    {/* 
                    <Card sx={{ flexGrow: 1 }}>
                        <CardHeader title="Your data" />
                        <CardContent>

                        </CardContent>
                    </Card> */}

                </Container>

                <Container>
                    <ImageList gap={20} cols={3}>
                        <ImageListItem cols={3}>
                            <Typography variant="h6">Breakfast</Typography>
                        </ImageListItem>
                        {breakfasts.map((item) => (

                            <ImageListItem key={item.name}>
                                <img
                                    src={`http://localhost:8080/api/image?url=${item.path}`}
                                    alt={item.name}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    title={item.name}
                                    position="below"
                                />
                            </ImageListItem>
                        ))}
                        <ImageListItem cols={3}>
                            <Typography variant="h6">Lunch</Typography>
                        </ImageListItem>
                        {lunches.map((item) => (

                            <ImageListItem key={item.name}>
                                <img
                                    src={`http://localhost:8080/api/image?url=${item.path}`}
                                    alt={item.name}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    title={item.name}
                                    position="below"
                                />
                            </ImageListItem>
                        ))}

                        <ImageListItem cols={3}>
                            <Typography variant="h6">Dinner</Typography>
                        </ImageListItem>
                        {dinners.map((item) => (

                            <ImageListItem key={item.name}>
                                <img
                                    src={`http://localhost:8080/api/image?url=${item.path}`}
                                    alt={item.name}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    title={item.name}
                                    position="below"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>

                </Container>


            </Box>
        </ThemeProvider>
    )
}