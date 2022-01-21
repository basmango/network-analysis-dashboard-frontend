import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// third-party
import axios from 'axios';
import SkeletonLineChart from 'ui-component/cards/Skeleton/LineChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { gridPaginationSelector } from '@mui/x-data-grid';
import { scaleOrdinal, schemePaired } from 'd3';

const baseURL = 'http://localhost:5000/stop-hourly-distribution';
const options = {
    plugins: {
        legend: {
            display: true
        }
    }
};

const StopHourlyLineChart = ({ isLoading, SelectedStop, StartingDate, EndingDate }) => {
    const [ChartData, setChartData] = useState('');

    useEffect(() => {
        axios.get(`${baseURL}`, { params: { stop: SelectedStop, startingDate: StartingDate, endingDate: EndingDate } }).then((response) => {
            setChartData({
                labels: response.data.labels,
                datasets: [
                    {
                        label: 'Departures',
                        data: response.data.departures,
                        fill: true,
                        backgroundColor: 'rgba(255,99,132,0.5)',
                        borderColor: 'rgba(75,192,192,1)'
                    },
                    {
                        label: 'Arrivals',
                        data: response.data.arrivals,
                        fill: true,
                        backgroundColor: 'rgb(255, 122, 0,0.5)',
                        borderColor: '#742774'
                    }
                ]
            });
        });
    }, [SelectedStop, StartingDate, EndingDate]);

    return (
        <>
            {isLoading || ChartData === undefined || ChartData === '' ? (
                <SkeletonLineChart />
            ) : (
                <MainCard>
                    {' '}
                    <Line data={ChartData} />{' '}
                </MainCard>
            )}{' '}
        </>
    );
};

StopHourlyLineChart.propTypes = {
    isLoading: PropTypes.bool
};

export default StopHourlyLineChart;
