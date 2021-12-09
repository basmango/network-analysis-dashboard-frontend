import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { gridPaginationSelector } from '@mui/x-data-grid';
import faker from 'faker';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
const baseURL = 'http://127.0.0.1:5000/stopbarchart';

const HorizontalStopRouteBarChart = ({ isLoading, SelectedStop }) => {
    const [OnboardingData, setOnboardingData] = useState('');
    const [ElidingData, setElidingData] = useState('');

    useEffect(() => {
        axios.get(`${baseURL}`, { params: { stop: SelectedStop } }).then((response) => {
            setOnboardingData(response.data.onboarding);
            setElidingData(response.data.eliding);
            console.log('shit');
            console.log(response.data.onboarding);
        });
    }, [SelectedStop]);

    return (
        <>
            {isLoading || OnboardingData === undefined || OnboardingData === '' || ElidingData === undefined ? (
                <SkeletonTotalGrowthBarChart height="20%" />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Bar height="400px" options={options} data={OnboardingData} />
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
