import { useEffect, useState } from 'react';

// material-ui
import { Grid, FormControl, MenuItem, Select, InputLabel } from '@mui/material';

// project imports
import * as React from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import RouteStopsBarChart from './RouteStopsBarChart';
import RouteFormControl from './RouteFormControl';
import StopPanel from './StopPanel';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { gridSpacing } from 'store/constant';
import Box from '@mui/material/Box';
import { border } from '@mui/system';

const baseURL = 'http://127.0.0.1:5000/routes';

// ==============================|| DEFAULT DASHBOARD ||============================== //
const DateStyle = {
    marginTop: '15px',
    backgroundColor: 'transparent',
    height: '30px',
    fontSize: '15px',
    padding: '4px'
};
const RouteDisplay = ({ isLoading }) => {
    const [Route, setRoute] = React.useState('703UP');
    const [value, setValue] = React.useState([null, null]);
    const [isNetLoading, setNetLoading] = React.useState(true);
    const [items, setItem] = React.useState([]);

    React.useEffect(() => {
        axios.get(`${baseURL}`).then((response) => {
            setItem(response.data.json_list);
            setNetLoading(false);
        });
    }, []);
    const changeRouteCallback = (newRoute) => {
        setRoute(newRoute);
    };
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={3}>
                        <RouteFormControl isLoading={isNetLoading} onChange={changeRouteCallback} items={items} Route={Route} />
                    </Grid>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Grid item xs={5}>
                            <DateRangePicker
                                label="Advanced keyboard"
                                value={value}
                                onChange={(newValue) => setValue(newValue)}
                                renderInput={(startProps, endProps) => (
                                    <fragment>
                                        <input ref={startProps.inputRef} {...startProps.inputProps} style={DateStyle} />
                                        <span> to </span>
                                        <input ref={endProps.inputRef} {...endProps.inputProps} style={DateStyle} />
                                    </fragment>
                                )}
                            />
                        </Grid>
                    </LocalizationProvider>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <RouteStopsBarChart height="200px" isLoading={isLoading} Route={Route} />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <StopPanel isLoading={isNetLoading} Route={Route} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default RouteDisplay;
