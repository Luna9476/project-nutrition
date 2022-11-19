import { ThemeProvider, useTheme } from "@emotion/react"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Chip, Collapse, Container, Divider, FormControl, IconButton, IconButtonProps, InputLabel, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Select, SelectChangeEvent, Stack, styled, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import HeightIcon from '@mui/icons-material/Height';
import NoMealsIcon from '@mui/icons-material/NoMeals';
import React from "react";
import { green, pink, teal } from '@mui/material/colors';

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

    const [foods, setFoods] = React.useState([{
        'name': 'thai-inspired-beef-bowls',
        'img': 'thai-inspired-beef-bowls.jpeg'
    }, {
        'name': 'thai-inspired-beef-bowls',
        'img': 'thai-inspired-beef-bowls.jpeg'
    }, {
        'name': 'thai-inspired-beef-bowls',
        'img': 'thai-inspired-beef-bowls.jpeg'
    }])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleOptionChange = (e: SelectChangeEvent) => {
        setOption(e.target.value);
    }



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
                                        onChange={(e) => { setExercise(e.target.value) }}
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
                                    1133k
                                </Typography>

                                <Button variant="contained">
                                    Generate today's meal
                                </Button>
                            </Box>

                            <Divider orientation="vertical" flexItem />
                            <Box sx={{ display: "flex", flexDirection: "column", rowGap: 2 }}>
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <Avatar sx={{ bgcolor: green[500] }}><MonitorWeightIcon /></Avatar>
                                    <Typography variant="body1">55kg</Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <Avatar sx={{ bgcolor: green[500] }}><HeightIcon /></Avatar>
                                    <Typography variant="body1">170cm</Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <Avatar sx={{ bgcolor: green[500] }}><NoMealsIcon /></Avatar>
                                    <Chip label="primary" color="info" />
                                    <Chip label="success" color="success" />
                                </Stack>
                            </Box>

                        </CardContent>

                        <CardActions>
                            <Typography paragraph>How we calculate the calories?</Typography>
                            <ExpandMore expand={expanded} onClick={handleExpandClick}>
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>


                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography variant="body2">
                                    the equation
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
                        {foods.map((item) => (

                            <ImageListItem key={item.name} sx={{}}>
                                <img
                                    src={`http://localhost:8080/api/image?url=images/foods/${item.img}&w=248&fit=crop&auto=format`}
                                    srcSet={`http://localhost:8080/api/image?url=images/foods/${item.img}&w=248&fit=crop&auto=format&dpr=2 2x`}
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