import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase("db.db");

export function initDb(tablename) {
    db.transaction(tx => {
        tx.executeSql(
            `create table if not exists ${tablename} (id integer primary key not null, imagen blob);`
        );
    });
}
export function insertDb(tablename, imagen) {
    db.transaction(
        tx => {
            tx.executeSql(`insert into ${tablename} (imagen) values (${imagen})`);
        }
    );
}
export function loadImg(tablename) {
    db.transaction(
        tx => {
            tx.executeSql(`select * from ${tablename}`, [], (_, { rows }) =>
                console.log(JSON.stringify(rows))
            )
        }
    );
}