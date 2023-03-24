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
    tx.executeSql("CREATE TABLE IF NOT EXISTS ()")
});

db.transaction( 
    tx => {
    tx.executeSql("CREATE TABLE IF NOT EXISTS ()")
});

db.transaction( 
    tx => {
    tx.executeSql("CREATE TABLE IF NOT EXISTS ()")
});

db.transaction( 
    tx => {
    tx.executeSql("CREATE TABLE IF NOT EXISTS ()")
});

export default db;
