import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import styles_piechart from "../styles/styles.piechart"

const data = [
  { name: 'Transport', value: 500, color: '#33CC33' },
  { name: 'Laundry', value: 200, color: '#66CCFF' },
  { name: 'Subscriptions', value: 300, color: '#3366CC' },
  { name: 'Food', value: 600, color: '#99CCFF' },
];

const PieChartExample = () => {
  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <View style={styles_piechart.container}>
      <View style={styles_piechart.chartContainer}>
        <PieChart
          data={data}
          width={200}
          height={200}
          chartConfig={chartConfig}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft="30"
          absolute
          hasLegend={false}
        />
      </View>
      <View style={styles_piechart.labelContainer}>
        {data.map(({ name, color }) => (
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
