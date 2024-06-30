// BikeDataGraph.jsx

import React from 'react';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel, VictoryLegend } from 'victory';

const BikeDataGraph = ({ labels, data, title,tickCount }) => {
    // Format labels if needed, assuming labels are already in correct format
    // data should be an array of numeric values

    const dataPoints = labels.map((label, index) => ({ x: label, y: data[index] }));

    return (
        <VictoryChart width={600} height={300} scale={{ x: 'time' }} padding={{ top: 20, bottom: 50, left: 50, right: 50 }}>
            <VictoryLabel text={title} x={300} y={30} textAnchor="middle" />

            <VictoryAxis
                crossAxis
                tickFormat={(t) => new Date(t).toLocaleString()}
                style={{
                    tickLabels: { fontSize: 8, padding: 5 },
                }}
                tickCount={tickCount && tickCount} // Set tickCount for the x-axis
            />

            <VictoryAxis
                dependentAxis
                domain={[0, title === 'Speed' || title === 'SOC' ? 100 : 50]} // Adjust domain based on title
                style={{
                    tickLabels: { fontSize: 8, padding: 5 },
                }}
            />

            <VictoryLine
                style={{
                    data: { stroke: 'rgba(75,192,192,1)' },
                    parent: { border: '1px solid #ccc' },
                }}
                data={dataPoints}
            />

        

        </VictoryChart>
    );
};

export default BikeDataGraph;
