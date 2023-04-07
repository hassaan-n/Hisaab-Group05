import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import styles_piechart from "../styles/styles.piechart"
import db from "../database";
import { useState, useEffect } from 'react';


const PieChartExample = () => {
  const [data, setData] = useState([]);

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    legend: {
      enabled: true,
      textSize: 14,
      textColor: 'black',
      legendFontSize: 14,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    },
  };
  
  useEffect(() => {
    getChartData()
      .then((categoryData:any) => {
        const colors = ['#74dda4','#598b73','#1f5a78', '#3366CC', '#308ff3', '#AAD4FF'];
        let idx = 0;
        const newData = categoryData.map((d) => ({
          name: d.category,
          value: d.total_amount,
          color: colors[idx++],
        }));
        setData(newData);
      });
  }, []);

  const getChartData = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT DISTINCT category, SUM(amount) AS total_amount FROM log GROUP BY category',
          [],
          (_, { rows }) => {
            const categoryData = [];
            for (let i = 0; i < rows.length; i++) {
              const row = rows.item(i);
              categoryData.push({
                category: row.category,
                total_amount: row.total_amount,
              });
            }
            resolve(categoryData);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };


  return (
    <View style={styles_piechart.container}>
      <View style={{ flex: 1 }}>
        <PieChart
          data={data}
          width={350}
          height={250}
          chartConfig={chartConfig}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft="15"
          hasLegend={false}
        />
      </View>
      <View>
        {data.map(({ name, color }, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: color, marginRight: 5 }} />
            <Text style={styles_piechart.label}>{name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default PieChartExample;

