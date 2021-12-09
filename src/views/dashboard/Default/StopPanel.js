import PropTypes from 'prop-types';
import * as React from 'react';
import StopFormControl from './StopFormControl';
import { Grid, FormControl, MenuItem, Select, InputLabel } from '@mui/material';
import { gridSpacing } from 'store/constant';
import HorizontalStopRouteBarChart from './HorizontalStopRouteBarChart';

const StopPanel = ({ Route }) => {
    const [Stop, setStop] = React.useState('Jheel Terminal');

    const changeStopCallback = (newStop) => {
        setStop(newStop);
    };

    return (
        <div>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={4}>
                            <StopFormControl onChange={changeStopCallback} stop={Stop} Route={Route} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={5}>
                            <HorizontalStopRouteBarChart height="500px" Route={Route} SelectedStop={Stop} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

StopPanel.propTypes = {};

export default StopPanel;
