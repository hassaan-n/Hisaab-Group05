import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import db from "../database";


const SpendingChart = () => {
    const data = {
        labels: ['19/3', '20/3', '21/3', '22/3', '23/3', '24/3', '25/3'],
        datasets: [
            {
                data: [1000, 5000, 2000, 4500, 500, 700, 1500],
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // black
                strokeWidth: 2,
            },
        ],
    };

    return (
        <View>
            <LineChart
                data={data}
                width={300}
                height={200}
                chartConfig={{
                    backgroundGradientFrom: '#f2f8f2',
                    backgroundGradientTo: '#f2f8f2',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // black
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // black
                    style: {
                        borderRadius: 16,
                        borderColor: 'black', // green border
                        borderWidth: 5,
                    },
                    propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: '#000000', // black line
                        fill: '#55c595', // pink
                    },
                }}
                withInnerLines={false} // remove grid
                bezier
            />
        </View>
    );
};

// const getDateData = () => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         "SELECT DATE(time_stamp) AS date, SUM(amount) AS total_amount FROM log WHERE time_stamp BETWEEN date('now', '-7 days') AND date('now') GROUP BY date ORDER BY date ASC;",
//         [],
//         (_, { rows }) => {
//           console.log(rows);
//         },
//         (_, error) => {
//           console.log(error);
//         }
//       );
//     });
//     return rows;
//   };

export default SpendingChart;

// SELECT * FROM log WHERE time_stamp LIKE '01/04/2023%';