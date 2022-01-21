import { useEffect, useState } from 'react';

// material-ui
import { Grid, FormControl, MenuItem, Select, InputLabel, TextField } from '@mui/material';

// project imports
import * as React from 'react';
import axios from 'axios';
import RouteStopsBarChart from './RouteStopsBarChart';
import RouteFormControl from './RouteFormControl';
import StopPanel from './StopPanel';
import { gridSpacing } from 'store/constant';
import Box from '@mui/material/Box';
import { border } from '@mui/system';
import DateTimeControlForm from './DateTimeControlForm';

const baseURL = 'http://localhost:5000/routes';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const RouteDisplay = ({ isLoading }) => {
    const [Route, setRoute] = React.useState('03DOWN');
    const [isNetLoading, setNetLoading] = React.useState(true);
    const [items, setItem] = React.useState([]);
    const [StartingDate, setStartingDate] = React.useState('');
    const [EndingDate, setEndingDate] = React.useState('');

    React.useEffect(() => {
        axios.get(`${baseURL}`).then((response) => {
            setItem(response.data.json_list);
            setNetLoading(false);
        });
    }, []);
    const changeRouteCallback = (newRoute) => {
        setRoute(newRoute);
    };
    const ChangeStartingDateCallback = (newDate) => {
        setStartingDate(newDate);
    };
    const ChangeEndingDateCallback = (newDate) => {
        setEndingDate(newDate);
    };
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={3}>
                        <RouteFormControl isLoading={isNetLoading} onChange={changeRouteCallback} items={items} Route={Route} />
                    </Grid>
                    <Grid item xs={4}>
                        <DateTimeControlForm
                            isLoading={isNetLoading}
                            StartDateChangeCallback={ChangeStartingDateCallback}
                            EndDateChangeCallback={ChangeEndingDateCallback}
                            StartingDate={StartingDate}
                            EndingDate={EndingDate}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <RouteStopsBarChart
                            height="200px"
                            isLoading={isLoading}
                            Route={Route}
                            StartingDate={StartingDate}
                            EndingDate={EndingDate}
                        />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <StopPanel isLoading={isNetLoading} Route={Route} StartingDate={StartingDate} EndingDate={EndingDate} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default RouteDisplay;
