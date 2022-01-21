import PropTypes from 'prop-types';
import * as React from 'react';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';
import axios from 'axios';

import { Grid, FormControl, MenuItem, Select, InputLabel, TextField } from '@mui/material';
import { maxWidth, minWidth } from '@mui/system';

let poll = true;
const baseURL = 'http://localhost:5000/dates';

const DateStyle = {
    marginTop: '15px',
    backgroundColor: 'transparent',
    height: '30px',
    fontSize: '15px',
    padding: '4px',
    margin: '0px',
    maxWidth: '500px'
};
const DateTimeControlForm = ({ isLoading, StartDateChangeCallback, EndDateChangeCallback, StartingDate, EndingDate }) => {
    React.useEffect(() => {
        axios.get(`${baseURL}`).then((response) => {
            if (poll) {
                const newDate = new Date(response.data.max_date);
                const fdate = new Date(response.data.max_date);
                fdate.setDate(newDate.getDate() - 30);
                EndDateChangeCallback(newDate);
                StartDateChangeCallback(fdate);
                poll = false;
            }
        });
    });

    if (isLoading || StartingDate === '' || EndingDate === '') {
        return <></>;
    }
    return (
        <div style={DateStyle}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container spacing="10px">
                    <Grid item xs={6}>
                        <DateTimePicker
                            label=" Start Date and Time"
                            onChange={(newValue) => {
                                StartDateChangeCallback(newValue);
                            }}
                            value={StartingDate}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <DateTimePicker
                            isLoading={isLoading}
                            label="Ending Date and Time"
                            onChange={(newValue) => {
                                EndDateChangeCallback(newValue);
                            }}
                            value={EndingDate}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                </Grid>
            </LocalizationProvider>
        </div>
    );
};

DateTimeControlForm.propTypes = {
    isLoading: PropTypes.bool,
    StartDateChangeCallback: PropTypes.func,
    EndDateChangeCallback: PropTypes.func,
    StartingDate: PropTypes.instanceOf(Date),
    EndingDate: PropTypes.instanceOf(Date)
};

export default DateTimeControlForm;
