import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// third-party
import axios from 'axios';
import SkeletonPieChart from 'ui-component/cards/Skeleton/PieChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { gridPaginationSelector } from '@mui/x-data-grid';
import { scaleOrdinal, schemePaired } from 'd3';

const baseURL = 'http://localhost:5000/stop-pie';
const options = {
    plugins: {
        legend: {
            display: true
        }
    }
};

const StopPie = ({ isLoading, SelectedStop, StartingDate, EndingDate }) => {
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
                    <Pie data={ChartData} options={options} />
                </MainCard>
            )}{' '}
        </>
    );
};

StopPie.propTypes = {
    isLoading: PropTypes.bool
};

export default StopPie;
