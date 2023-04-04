// import PushNotification from 'react-native-push-notification';
// import db from '../database';

// const ScheduleNotification = () => {
//   const date = new Date();
//   date.setHours(10);
//   date.setMinutes(0);
//   date.setSeconds(0);

//   db.transaction((tx) => {
//     tx.executeSql(
//       'SELECT * FROM log WHERE amount < ? ORDER BY RANDOM() LIMIT 2',
//       [1000],
//       (_, { rows }) => {
//         const data = rows;

//         PushNotification.localNotificationSchedule({
//           title: 'Your daily notification',
//           message: JSON.stringify(data),
//           date: date,
//           repeatType: 'day',
//         });
//       },
//     );
//   });
// };

// export default ScheduleNotification;

import PushNotification from 'react-native-push-notification';
import db from '../database';


const Notif = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM log WHERE amount < ? ORDER BY RANDOM() LIMIT 2',
      [1000],
      (_, { rows }) => {
        const data = rows;

        PushNotification.localNotification({
          title: 'Your immediate notification',
          message: JSON.stringify(data),
        });
      },
    );
  });
};

export default Notif;
