import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase("HisaabDB.db");

db.transaction( 
    tx => {
    tx.executeSql("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, pinstate INTEGER, pin INTEGER);")

});


export default db;
