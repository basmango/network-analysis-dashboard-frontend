import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Grid, MenuItem, TextField, Typography, Button, Box } from '@mui/material';

// third-party
import axios from 'axios';
import Sunburst from 'sunburst-chart'; // project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { gridPaginationSelector } from '@mui/x-data-grid';
import { scaleOrdinal, schemePaired } from 'd3';

const myChart = Sunburst();
myChart.height(450);
myChart.width(450);
myChart.excludeRoot(true);
myChart.strokeColor('white');
const color = scaleOrdinal(schemePaired);
const baseURL = 'http://api.basmango.com/stopsunburst';

const StopSunburst = ({ isLoading, SelectedStop }) => {
    const [ChartData, setChartData] = useState('');

    useEffect(() => {
        axios.get(`${baseURL}`, { params: { stop: SelectedStop } }).then((response) => {
            setChartData(response.data);
        });
        if (document.getElementById('chart') != null) {
            document.getElementById('chart').innerHTML = '';
            myChart.data(ChartData)(document.getElementById('chart'));
            myChart.color((d) => color(d.name));
            myChart.strokeColor('white');
        }
    }, [SelectedStop]);

    return (
        <>
            {isLoading || ChartData === undefined || ChartData === '' ? (
                <SkeletonTotalGrowthBarChart height="20%" />
            ) : (
                <MainCard>
                    {' '}
                    <div maxHeight="100px" height="100px" width="100px" id="chart" />
                </MainCard>
            )}{' '}
        </>
    );
};

StopSunburst.propTypes = {
    isLoading: PropTypes.bool
};

export default StopSunburst;
