
import { ThemeProvider, useTheme } from "@emotion/react";
import { Paper } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { getUserBodyRecords } from "../services/user.service";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Weights Record',
        },
    },
};

export default function History() {
    const theme = useTheme();
    const [weightRecords, setWeightRecords] = React.useState<ChartData<"line", number[], string>>();
    useEffect(() => {
        getUserBodyRecords().then(response => {
            const records = response.data.records;
            console.log(records.map((a: { [x: string]: any; }) => a.weight));
            setWeightRecords({
                labels: records.map((a: { date: any; }) => a.date),
                datasets: [{
                    label: 'weights',
                    data: response.data.records.map((a: { [x: string]: any; }) => a.weight),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }

                ]
            })
        })
    }, [])
    return (
        <ThemeProvider theme={theme}>
            <Paper>
                {
                    weightRecords && <Line options={options} data={weightRecords} />
                }
            </Paper>
        </ThemeProvider>
    )
}