import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase("HisaabDB.db");

db.transaction( 
    tx => {
    tx.executeSql("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, pinstate INTEGER, pin INTEGER);")
});

// bring schema to life
// make appropriate functions that can be used with each relation
// in sign up page, make so that if user already exists do not add
// develop the backend framework

db.transaction( 
    tx => {
    tx.executeSql("CREATE TABLE IF NOT EXISTS goal (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, amount INTEGER, type TEXT);")
});

db.transaction(
    tx => {
    tx.executeSql("CREATE TABLE IF NOT EXISTS transaction (transaction_id INTEGER AUTO_INCREMENT PRIMARY KEY, username TEXT, category_id INTEGER, time_stamp TIMESTAMP, amount INTEGER, transaction_title TEXT)");
    });
    
db.transaction(tx => {
tx.executeSql("CREATE TABLE IF NOT EXISTS goals (goal_id INTEGER AUTO_INCREMENT PRIMARY KEY, title TEXT, amount INTEGER, type TEXT, starting_time TIMESTAMP)");
});
    
db.transaction(
    tx => {
    tx.executeSql("CREATE TABLE IF NOT EXISTS budget (budget_id INTEGER PRIMARY KEY, time_stamp TIMESTAMP, current_state TEXT)");
});

db.transaction(
    tx => {
    tx.executeSql("CREATE TABLE IF NOT EXISTS categories (category_id INTEGER PRIMARY KEY, food_id INTEGER, transport_id INTEGER, subscriptions INTEGER, laundry INTEGER, grocery INTEGER, education_expenses INTEGER, clothing INTEGER, miscellaneous INTEGER)");
    });
    
db.transaction(
    tx => {
    tx.executeSql("CREATE TABLE IF NOT EXISTS budget_notifications (notification_id INTEGER AUTO_INCREMENT PRIMARY KEY, message TEXT, time TIMESTAMP, is_read BOOLEAN DEFAULT FALSE)");
});

db.transaction(
    tx => {
    tx.executeSql("CREATE TABLE IF NOT EXISTS suggestions (username TEXT, recommendation_id INTEGER, message TEXT, is_read BOOLEAN DEFAULT FALSE, budget_id INTEGER, time_generated TIMESTAMP, PRIMARY KEY (username, recommendation_id))");
});

db.transaction(
    tx => {
    tx.executeSql("CREATE TABLE IF NOT EXISTS food (food_id INTEGER PRIMARY KEY, breakfast INTEGER, lunch INTEGER, dinner INTEGER, snacks INTEGER)");
});

db.transaction(
    tx => {
    tx.executeSql("CREATE TABLE IF NOT EXISTS transport (transport_id INTEGER PRIMARY KEY, fuel INTEGER, uber_bike INTEGER)");
});

db.transaction(
    tx => {
    tx.executeSql("CREATE TABLE IF NOT EXISTS recommendation_notifications (r_notif_id INTEGER AUTO_INCREMENT PRIMARY KEY, message TEXT, time TIMESTAMP, is_read BOOLEAN DEFAULT FALSE)");
});


export default db;
