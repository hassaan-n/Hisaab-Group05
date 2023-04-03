import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import db from "../database";
import { useState, useEffect } from 'react';



// const dailyTotals: any = [];

// const getDateData = () => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       // "SELECT DATE(time_stamp) as date, SUM(amount) as total_amount FROM log WHERE time_stamp >= datetime('now', '-7 days') GROUP BY DATE(time_stamp)",
//       "SELECT DATE(time_stamp, 'localtime') as date, SUM(amount) as total_amount FROM log WHERE time_stamp >= datetime('now', '-7 days', 'localtime') GROUP BY DATE(time_stamp, 'localtime')",
//       // "DROP TABLE IF EXISTS log;",
//       [],
//       (_, { rows }) => {
//         for (let i = 0; i < rows.length; i++) {
//           const row = rows.item(i);
//           dailyTotals.push({
//             date: row.date,
//             total_amount: row.total_amount,
//           });
//         }
//         console.log(dailyTotals);
//       },
//       (_, error) => {
//         console.log(error);
//       }
//     );
//   });
// };

// getDateData();
// console.log(dailyTotals);



// const SpendingChart = () => {
//     // let arr: any = []
//     // let vals : number[] = []
//     // useEffect(() => {
//     // getDateData().then((dailyTotals) => {
//     //     arr = dailyTotals;
//     //     vals = arr.map(obj => obj.total_amount);
//     //     console.log(vals)
//     //     }).catch((error) => {
//     //     console.log(error);
//     //     });
//     // });

    
//     // while(arr.length != 0 && vals.length != 0)
//     // {
//     //     useEffect(() => {
//     //         getDateData().then((dailyTotals) => {
//     //             arr = dailyTotals;
//     //             vals = arr.map(obj => obj.total_amount);
//     //             console.log(vals)
//     //             }).catch((error) => {
//     //             console.log(error);
//     //             });
//     //         });
//     // }

//     // const data = {
//     //     labels: ['19/3', '20/3', '21/3', '22/3', '23/3', '24/3', '25/3'],
//     //     datasets: [
//     //         {
//     //             data: vals,
//     //             color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // black
//     //             strokeWidth: 2,
//     //         },
//     //     ],
//     // };

//     let arr: any = []
//     let vals: number[] = []
//     let data: any;

// useEffect(() => {
//   getDateData()
//     .then((dailyTotals) => {
//       arr = dailyTotals;
//       vals = arr.map(obj => obj.total_amount);
//       console.log(vals);

//     //   const labels = vals.map((val, index) => `Label ${index + 1}`);

//       data = {
//         labels: ['19/3', '20/3', '21/3', '22/3', '23/3', '24/3', '25/3'],
//         datasets: [
//           {
//             data: vals,
//             color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // black
//             strokeWidth: 2,
//           },
//         ],
//       };

//       // Use the data object here
//     })
//         .catch((error) => {
//         console.log(error);
//         });
//     });

//     return (
//         <View>
//             <LineChart
//                 data={data}
//                 width={300}
//                 height={200}
//                 chartConfig={{
//                     backgroundGradientFrom: '#f2f8f2',
//                     backgroundGradientTo: '#f2f8f2',
//                     decimalPlaces: 0,
//                     color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // black
//                     labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // black
//                     style: {
//                         borderRadius: 16,
//                         borderColor: 'black', // green border
//                         borderWidth: 5,
//                     },
//                     propsForDots: {
//                         r: '6',
//                         strokeWidth: '2',
//                         stroke: '#000000', // black line
//                         fill: '#55c595', // pink
//                     },
//                 }}
//                 withInnerLines={false} // remove grid
//                 bezier
//             />
//         </View>
//     );
// };


const SpendingChart = () => {
  const [data, setData] = useState({
    labels: [""],
    datasets: [
      {
        data: [0],
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  });
  setTimeout(() => {console.log(""),1000});
  useEffect(() => {
    getDateData()
      .then((dailyTotals:any) => {
        let data = dailyTotals.map((obj) => obj.total_amount);
        let labels = dailyTotals.map((obj) => obj.date.slice(8, 10));
        setData({
          labels,
          datasets: [
            {
              data,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              strokeWidth: 2,
            },
          ],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });

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
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
            borderColor: 'black',
            borderWidth: 5,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#000000',
            fill: '#55c595',
          },    
        }}
        withInnerLines={false}
        bezier
      />
    </View>
  );
};


const getDateData = () => {
    return new Promise((resolve, reject) => {
      const dailyTotals:any = [];
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT DATE(time_stamp, 'localtime') as date, SUM(amount) as total_amount FROM log WHERE time_stamp >= datetime('now', '-7 days', 'localtime') GROUP BY DATE(time_stamp, 'localtime')",
          [],
          (_, { rows }) => {
            for (let i = 0; i < rows.length; i++) {
              const row = rows.item(i);
              dailyTotals.push({
                date: row.date,
                total_amount: row.total_amount,
              });
            }
            resolve(dailyTotals);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

export default SpendingChart;

// SELECT * FROM log WHERE time_stamp LIKE '01/04/2023%';

