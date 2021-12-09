import { useEffect, useState } from 'react';

// material-ui
import { Grid, FormControl, MenuItem, Select, InputLabel } from '@mui/material';

// project imports

import RouteDisplay from './RouteDisplay';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return <RouteDisplay isLoading={isLoading} />;
};

export default Dashboard;
