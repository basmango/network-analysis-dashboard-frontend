// material-ui
import { Card, CardContent, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

// project imports
import { gridSpacing } from 'store/constant';

// ==============================|| SKELETON Line CHART ||============================== //

const LineChart = () => (
    <Card>
        <CardContent>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" height={335} />{' '}
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

export default LineChart;
