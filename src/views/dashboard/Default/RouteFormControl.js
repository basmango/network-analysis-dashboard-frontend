import PropTypes from 'prop-types';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

const baseURL = 'http://api.basmango.com/routes';

const RouteFormControl = ({ isLoading, onChange, items, Route }) => {
    const handleChange = (event) => {
        onChange(event.target.value);
    };

    if (isLoading) {
        console.log('test');
        return <></>;
    }
    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-autowidth-label">Route</InputLabel>
                <NativeSelect
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={isLoading ? '...' : Route}
                    onChange={handleChange}
                    label="Route"
                >
                    {items.map((item) => (
                        <option value={item.route_long_name}>{item.route_long_name}</option>
                    ))}
                </NativeSelect>
            </FormControl>
        </div>
    );
};

RouteFormControl.propTypes = {
    isLoading: PropTypes.bool
};

export default RouteFormControl;
