import PropTypes from 'prop-types';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import axios from 'axios';

const baseURL = 'http://api.basmango.com/stops';

const StopFormControl = ({ isLoading, stop, onChange, Route }) => {
    const handleChange = (event) => {
        onChange(event.target.value);
    };

    const [isNetLoading, setNetLoading] = React.useState(true);
    const [items, setItem] = React.useState([]);

    async function makeRequest(a, b) {
        const response = await axios.get(`${a}`, { params: { route: b } });
        return response.data;
    }

    React.useEffect(() => {
        axios.get(`${baseURL}`, { params: { route: Route } }).then((response) => {
            setItem(response.data.stops);
            onChange(response.data.stops[0]);
            setNetLoading(false);
        });
    }, [Route]);
    if (isLoading) {
        return <></>;
    }
    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-autowidth-label">Stop</InputLabel>
                <NativeSelect
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={isLoading ? '...' : stop}
                    onChange={handleChange}
                    label="Stop"
                >
                    {items.map((item) => (
                        <option value={item}>{item}</option>
                    ))}
                </NativeSelect>
            </FormControl>
        </div>
    );
};

StopFormControl.propTypes = {
    isLoading: PropTypes.bool,
    stop: PropTypes.string,
    Route: PropTypes.string
};

export default StopFormControl;
