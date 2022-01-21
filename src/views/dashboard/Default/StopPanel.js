import PropTypes from 'prop-types';
import * as React from 'react';
import StopFormControl from './StopFormControl';
import { Grid, FormControl, MenuItem, Select, InputLabel } from '@mui/material';
import { gridSpacing } from 'store/constant';
import HorizontalStopRouteBarChart from './HorizontalStopRouteBarChart';
import StopPie from './StopPie';
import StopOnboardingDonut from './StopOnboardingDonut';
import StopElidingDonut from './StopElidingDonut';
import StopHourlyLineChart from './StopHourlyLineChart';

const panelStyle = {
    maxHeight: '400px'
};
const StopPanel = ({ Route, StartingDate, EndingDate }) => {
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
                            <HorizontalStopRouteBarChart
                                height="100px"
                                Route={Route}
                                SelectedStop={Stop}
                                StartingDate={StartingDate}
                                EndingDate={EndingDate}
                            />
                        </Grid>
                        <Grid item xs={7} maxHeight="300px" style={panelStyle}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={4}>
                                    <StopPie height="250px" SelectedStop={Stop} StartingDate={StartingDate} EndingDate={EndingDate} />
                                </Grid>
                                <Grid item xs={4}>
                                    <StopOnboardingDonut
                                        height="250px"
                                        SelectedStop={Stop}
                                        StartingDate={StartingDate}
                                        EndingDate={EndingDate}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <StopElidingDonut
                                        height="250px"
                                        SelectedStop={Stop}
                                        StartingDate={StartingDate}
                                        EndingDate={EndingDate}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <StopHourlyLineChart
                                        height="250px"
                                        SelectedStop={Stop}
                                        StartingDate={StartingDate}
                                        EndingDate={EndingDate}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

StopPanel.propTypes = {};

export default StopPanel;
