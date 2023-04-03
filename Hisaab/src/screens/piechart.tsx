import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import styles_piechart from "../styles/styles.piechart"
import db from "../database";
import { useState, useEffect } from 'react';

const PieChartExample = () => {
  const [data, setData] = useState({
    data:[
    { name: 'Transport', value: 0, color: '#33CC33' },
    { name: 'Laundry', value: 0, color: '#66CCFF' },
    { name: 'Subscription', value: 0, color: '#3366CC' },
    { name: 'Food', value: 0, color: '#99CCFF' },
    { name: 'Grocery', value: 0, color: '#FFCC33' },
    { name: 'Other', value: 0, color: '#FF9900' },
  ]});

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
    const newData = data.data.map((d, i) => {
      const name = categoryData[i]?.category || d.name;
      const value = categoryData[i]?.total_amount || d.value;
      const color = d.color;
      return { name, value, color };
    });
    setData({ data: newData });
  });
  },);

  const getChartData = () => {
    return new Promise((resolve, reject) => {
      const categoryData:any = [];
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT DISTINCT category, SUM(amount) AS total_amount FROM log GROUP BY category', // duplicate values of food in legend
          [],
          (_, { rows }) => {
            for (let i = 0; i < rows.length; i++) {
              const row = rows.item(i);
              categoryData.push(
                {
                  category: row.category,
                  total_amount: row.total_amount,
                }
              );
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
    <View style={{flex: 1}}>
        <PieChart
          data={data.data}
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
        {data.data.map(({ name, color }) => (
          <View key={name} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: color, marginRight: 5 }} />
            <Text style={styles_piechart.label}>{name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default PieChartExample;
