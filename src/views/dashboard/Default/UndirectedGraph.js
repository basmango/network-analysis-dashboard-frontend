import PropTypes from 'prop-types';
import { Sigma, RandomizeNodePositions, RelativeSize } from 'react-sigma';
import { Grid } from '@mui/material';
import SkeletonUndirectedGraph from 'ui-component/cards/Skeleton/UndirectedGraph';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import * as data from 'a.json';
import * as data2 from 'edges.json';

const UndirectedGraph = ({ isLoading }) => {
    const myGraph = {
        nodes: data.nodes,
        edges: data2.edges
    };
    return (
        <>
            {isLoading ? (
                <SkeletonUndirectedGraph />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Sigma
                                graph={myGraph}
                                settings={{
                                    drawEdges: true,
                                    clone: false,
                                    edgeLabelSize: 'proportional',
                                    edgeLabel: true,
                                    minEdgeSize: 1,
                                    maxEdgeSize: 4
                                }}
                            >
                                <RelativeSize initialSize={20} />
                                <RandomizeNodePositions />
                            </Sigma>
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

UndirectedGraph.propTypes = {
    isLoading: PropTypes.bool
};

export default UndirectedGraph;
