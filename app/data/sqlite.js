import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase("db.db");

export function initDb(tablename) {
    db.transaction(tx => {
        tx.executeSql(
            `create table if not exists ${tablename} (id integer primary key not null, imagen text);`
        );
    });
}
export function insertDb(tablename) {
    db.transaction(
        tx => {
            // tx.executeSql(`insert into ${tablename} (imagen) values ('primer')`);
            // tx.executeSql(`insert into ${tablename} (imagen) values (?)`, ['segon']);
            // tx.executeSql(`insert into ${tablename} (imagen) values (?)`, ['tercer']);
            tx.executeSql(`select * from ${tablename}`, [], (_, { rows }) =>
                console.log(JSON.stringify(rows))
            );
        }
    );
}