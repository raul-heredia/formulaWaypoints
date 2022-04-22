import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase("db.db");

export function initDb(tablename) {
    db.transaction(tx => {
        tx.executeSql(
            // `drop table ${tablename}`
            `create table if not exists ${tablename} (id integer primary key not null, imagen text);`
        );
    });
}
export function insertDb(tablename, imagen) {
    console.log("Entra INsert", imagen)
    db.transaction(
        tx => {
            tx.executeSql(`insert into ${tablename} (imagen) values ('${imagen}')`);
        }
    );
}
export function loadImg(tablename) {
    db.transaction(
        tx => {
            tx.executeSql(`select * from ${tablename}`, [], (tx, results) => {
                console.log(results.rows)
            });
        }
    );
}