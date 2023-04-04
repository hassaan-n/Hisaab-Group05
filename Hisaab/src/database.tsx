import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("HisaabDB.db");

db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, goals_id INTEGER, budget_id INTEGER, pinstate INTEGER, pin INTEGER, FOREIGN KEY ('goals_id') REFERENCES goal('id'), FOREIGN KEY ('budget_id') REFERENCES budget('budget_id'));"
  );
});

db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS goal (id INTEGER PRIMARY KEY AUTOINCREMENT, amount INTEGER, type TEXT,  time_stamp TIMESTAMP);"
  );
});

db.transaction(
    tx => {
    tx.executeSql("CREATE TABLE IF NOT EXISTS log (transaction_id INTEGER AUTOINCREMENT, username TEXT, category TEXT, time_stamp TIMESTAMP, amount INTEGER, transaction_title TEXT, PRIMARY KEY (transaction_id, username))");
    });
    
// db.transaction(tx => {
// tx.executeSql("CREATE TABLE IF NOT EXISTS goals (goal_id INTEGER AUTO_INCREMENT PRIMARY KEY, title TEXT, amount INTEGER, type TEXT, starting_time TIMESTAMP)");
// });

db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS budget (budget_id INTEGER PRIMARY KEY, time_stamp TIMESTAMP, current_state INTEGER, FOREIGN KEY ('current_state') REFERENCES budget_notifications('message'))"
  );
});

db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS goals (goal_id INTEGER AUTOINCREMENT PRIMARY KEY, title TEXT, amount INTEGER, type TEXT, starting_time TIMESTAMP)"
  );
});

db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS categories (category_id INTEGER PRIMARY KEY, food_id TEXT, transport_id TEXT, subscriptions TEXT, laundry TEXT, grocery TEXT, education_expenses TEXT, clothing TEXT, miscellaneous TEXT, FOREIGN KEY ('food_id') REFERENCES food('food_id'), FOREIGN KEY ('transport_id') REFERENCES transport('transport_id'), FOREIGN KEY ('subscriptions') REFERENCES subscription('subscriptions'))"
  );
});

db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS subscriptions (subscriptions INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT)"
  );
});

db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS budget_notifications (notification_id INTEGER AUTOINCREMENT PRIMARY KEY, message TEXT, time TIMESTAMP, is_read BOOLEAN DEFAULT FALSE)"
  );
});

db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS suggestions (username TEXT, recommendation_id INTEGER, message TEXT, is_read BOOLEAN DEFAULT FALSE, budget_id INTEGER, time_generated TIMESTAMP, PRIMARY KEY (username, recommendation_id))"
  );
});

db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS food (food_id INTEGER PRIMARY KEY, breakfast INTEGER, lunch INTEGER, dinner INTEGER, snacks INTEGER)"
  );
});

db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS transport (transport_id INTEGER PRIMARY KEY, fuel INTEGER, taxi INTEGER)"
  );
});

db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS recommendation_notifications (r_notif_id INTEGER AUTO_INCREMENT PRIMARY KEY, message TEXT, time TIMESTAMP, is_read BOOLEAN DEFAULT FALSE)"
  );
});

export default db;
