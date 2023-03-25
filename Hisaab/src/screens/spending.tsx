// // import React from 'react';
// import { View } from 'react-native';
// import { LineChart } from 'react-native-chart-kit';

// const MyComponent = () => {
//   const data = {
//     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//     datasets: [
//       {
//         data: [1, 3, 2, 4, 5, 2, 1],
//         color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // black
//         strokeWidth: 2,
//       },
//     ],
//   };

//   return (
//     <View>
//       <LineChart
//         data={data}
//         width={300}
//         height={200}
//         chartConfig={{
//           backgroundGradientFrom: '#ffffff',
//           backgroundGradientTo: '#ffffff',
//           decimalPlaces: 0,
//           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // black
//           labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // black
//           style: {
//             borderRadius: 16,
//             borderColor: 'green', // green border
//             borderWidth: 1,
//           },
//           propsForDots: {
//             r: '6',
//             strokeWidth: '2',
//             stroke: '#000000', // black line
//             fill: '#ff69b4', // pink
//           },
//         }}
//         withInnerLines={false} // remove grid
//         bezier
//       />
//     </View>
//   );
// };

// export default MyComponent;

import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const MyComponent = () => {
  const data = {
    labels: ['19/3', '20/3', '21/3', '22/3', '23/3', '24/3', '25/3'],
    datasets: [
      {
        data: [100, 350, 2000, 4500, 500, 700, 1500],
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // black
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View>
      <LineChart
        data={data}
        width={400}
        height={300}
        chartConfig={{
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
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

export default MyComponent;