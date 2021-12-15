import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Chart from 'react-google-charts'; // material-ui
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import axios from 'axios';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { gridPaginationSelector } from '@mui/x-data-grid';

const baseURL = 'http://localhost:5000/stopsankey';

const StopSankey = ({ isLoading, Route, SelectedStop }) => {
    const [Data, setData] = useState('');

    useEffect(() => {
        console.log('Stop test');
        axios.get(`${baseURL}`, { params: { route: Route, stop: SelectedStop } }).then((response) => {
            setData(response.data);
        });
    }, [SelectedStop]);

    return (
        <>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart height="20%" />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Chart
                                height="300px"
                                chartType="Sankey"
                                loader={<div>Loading Chart</div>}
                                data={Data}
                                rootProps={{ 'data-testid': '2' }}
                            />{' '}
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

StopSankey.propTypes = {
    isLoading: PropTypes.bool
};

export default StopSankey;
