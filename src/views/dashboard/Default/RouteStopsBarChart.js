import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
import axios from 'axios';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
import chartData from './chart-data/total-growth-bar-chart';
import { gridPaginationSelector } from '@mui/x-data-grid';

const baseURL = 'http://localhost:5000/chartdata';

const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
];

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true
                }
            }
        ]
    },
    maintainAspectRatio: false
};
// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //
const xdata = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
        {
            label: '# of Red Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgb(255, 99, 132)',
            stack: 'Stack 0'
        },
        {
            label: '# of Blue Votes',
            data: [2, 3, 20, 5, 1, 4],
            backgroundColor: 'rgb(54, 162, 235)',
            stack: 'Stack 0'
        },
        {
            label: '# of Green Votes',
            data: [3, 10, 13, 15, 22, 30],
            backgroundColor: 'rgb(75, 192, 192)',
            stack: 'Stack 1'
        }
    ]
};
const RouteStopsBarChart = ({ isLoading, Route }) => {
    const [value, setValue] = useState('today');
    const [data, setData] = useState('');
    const [isRequesting, setRequesting] = useState(false);
    const [options, setOptions] = useState({
        chart: {
            id: 'basic-bar'
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
    });
    const [series, setSeries] = useState([{ name: 'series-1', data: [30, 40, 45, 50, 49, 60, 70, 91] }]);
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);

    const { navType } = customization;
    const { primary } = theme.palette.text;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];
    const grey500 = theme.palette.grey[500];

    const primary200 = theme.palette.primary[200];
    const primaryDark = theme.palette.primary.dark;
    const secondaryMain = theme.palette.secondary.main;
    const secondaryLight = theme.palette.secondary.light;
    async function makeRequest(a, b) {
        const response = await axios.get(`${a}`, { params: { route: b } });
        return response.data;
    }
    const toggleRequesting = () => {
        setRequesting((prev) => !prev);
    };
    useEffect(() => {
        async function test() {
            console.log('route');
            console.log(Route);
            setRequesting(true);
            const responseData = await makeRequest(baseURL, Route);
            console.log('test3');
            console.log(responseData);

            const newXItems = await responseData[0];
            const onboarding = await responseData[1];
            const eliding = await responseData[2];

            console.log(onboarding);
            await setData({
                labels: newXItems,
                datasets: [
                    {
                        label: 'Onboarding',
                        data: onboarding,
                        backgroundColor: 'rgb(255, 99, 132)',
                        stack: 'Stack 0'
                    },
                    {
                        label: 'Eliding',
                        data: eliding,
                        backgroundColor: 'rgb(255, 122, 0)',
                        stack: 'Stack 0'
                    }
                ]
            });
            setSeries([{ name: 'series-1', data: [3, 4, 5, 0, 6, 7, 9] }]);
            setRequesting(false);
        }

        // do not load chart when loading
        test();
    }, [navType, primary200, primaryDark, secondaryMain, secondaryLight, primary, darkLight, grey200, grey500, Route]);

    return (
        <>
            {isLoading || isRequesting || data === '' ? (
                <SkeletonTotalGrowthBarChart height="20%" />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Bar height="100%" data={data} options={options} />{' '}
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

RouteStopsBarChart.propTypes = {
    isLoading: PropTypes.bool
};

export default RouteStopsBarChart;
