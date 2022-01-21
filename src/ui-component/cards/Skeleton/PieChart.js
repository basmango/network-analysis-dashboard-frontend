// material-ui
import { Card, CardContent, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

// project imports
import { gridSpacing } from 'store/constant';

// ==============================|| SKELETON PIE CHART ||============================== //

const PieChart = () => (
    <Card>
        <CardContent>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Skeleton variant="round" height={200} />{' '}
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

export default PieChart;
