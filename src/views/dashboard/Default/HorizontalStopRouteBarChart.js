import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Grid, MenuItem, TextField, Typography, Button, Box } from '@mui/material';

// third-party
import axios from 'axios';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { gridPaginationSelector } from '@mui/x-data-grid';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const buttonStyle = {
    marginRight: '10px'
};
const options = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 2
        }
    },
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Stop Traffic Distribution'
        },
        legend: {
            display: false
        }
    },
    scales: {
        x: {
            stacked: true
        },
        y: {
            stacked: true
        }
    }
};
const baseURL = 'http://localhost:5000/stopbarchart';

const HorizontalStopRouteBarChart = ({ isLoading, SelectedStop, StartingDate, EndingDate }) => {
    const [DepartureData, setDepartureData] = useState('');
    const [ArrivalData, setArrivalData] = useState('');
    const [ButtonStatus, setButtonStatus] = useState('Departures');

    useEffect(() => {
        axios.get(`${baseURL}`, { params: { stop: SelectedStop, startingDate: StartingDate, endingDate: EndingDate } }).then((response) => {
            setDepartureData(response.data.departures);
            setArrivalData(response.data.arrivals);
        });
    }, [SelectedStop, StartingDate, EndingDate]);
    const handleButtonStatusChange = (event) => {
        setButtonStatus(event.target.value);
    };
    return (
        <>
            {isLoading || DepartureData === undefined || ArrivalData === '' || ArrivalData === undefined ? (
                <SkeletonTotalGrowthBarChart height="20%" />
            ) : (
                <MainCard>
                    <Box display="flex" width="100%" justifyContent="center" alignItems="center">
                        <Button
                            value="Departures"
                            onClick={handleButtonStatusChange}
                            variant={ButtonStatus === 'Departures' ? 'contained' : 'Outline'}
                            size="Medium"
                            style={buttonStyle}
                        >
                            Departures
                        </Button>

                        <Button
                            value="Arrivals"
                            onClick={handleButtonStatusChange}
                            variant={ButtonStatus === 'Arrivals' ? 'contained' : 'Outline'}
                            size="Medium"
                        >
                            Arrivals
                        </Button>
                    </Box>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Bar height="355px" options={options} data={ButtonStatus === 'Departures' ? DepartureData : ArrivalData} />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

HorizontalStopRouteBarChart.propTypes = {
    isLoading: PropTypes.bool
};

export default HorizontalStopRouteBarChart;
