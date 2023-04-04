import React from 'react';
import { View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import db from "../database";
import { useState, useEffect } from 'react';

const Bar = () => {
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
      <BarChart
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
          barPercentage: 0.7,
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

export default Bar;

// SELECT * FROM log WHERE time_stamp LIKE '01/04/2023%';
