import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// third-party
import axios from 'axios';
import SkeletonPieChart from 'ui-component/cards/Skeleton/PieChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { gridPaginationSelector } from '@mui/x-data-grid';
import { scaleOrdinal, schemePaired } from 'd3';

const baseURL = 'http://localhost:5000/stop-eliding-donut';
const options = {
    plugins: {
        title: {
            display: true,
            text: 'Arrival Routes',
            font: {
                size: 13
            },
            align: 'middle'
        },
        legend: {
            display: false
        }
    }
};

const StopElidingDonut = ({ isLoading, SelectedStop, StartingDate, EndingDate }) => {
    const [ChartData, setChartData] = useState('');

    useEffect(() => {
        axios.get(`${baseURL}`, { params: { stop: SelectedStop, startingDate: StartingDate, endingDate: EndingDate } }).then((response) => {
            setChartData(response.data);
        });
    }, [SelectedStop, StartingDate, EndingDate]);

    return (
        <>
            {isLoading || ChartData === undefined || ChartData === '' ? (
                <SkeletonPieChart />
            ) : (
                <MainCard>
                    {' '}
                    <Doughnut data={ChartData} options={options} />
                </MainCard>
            )}{' '}
        </>
    );
};

StopElidingDonut.propTypes = {
    isLoading: PropTypes.bool
};

export default StopElidingDonut;
