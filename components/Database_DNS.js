import { useCallback } from 'react';
import SQLite from 'react-native-sqlite-storage';
const DB_NAME = 'DNSDatabase.db';


const db = SQLite.openDatabase(
  {
    name: DB_NAME,
    createFromLocation: '~DNSDatabase.db',
    location: 'Library',
  },
  () => {},
  error => {
    console.log('Error while opening the database:', error);
  },
);

export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS dns_entries (name varchar(100) primary key, ip varchar(20));',
      [],
      (tx, results) => {},
      (tx, error) => {
        console.log('Error while creating table:', error);
      },
    );
  });
};

export const addEntry = (name, ip) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO dns_entries (name, ip) VALUES (?, ?);',
      [name, ip],
      (tx, results) => {
        console.log('Entry added successfully:', results.insertId);
      },
      (tx, error) => {
        console.log('Error while adding entry:', error);
      },
    );
  });
};

export const resolveEntry = (nameOrIP) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM dns_entries WHERE name = ? OR ip = ?;',
      [nameOrIP],
      (tx, results) => {
        const entries = results.rows.raw();
       // useCallback(entries)
      },
      (tx, error) => {
        console.log('Error while resolving entry:', error);
      },
    );
  });
};

export const deleteEntry = (name,callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM dns_entries WHERE name = ? || ip = ?;',
      [name],
      (tx, results) => {
        console.log('Entry deleted successfully');
        callback();
      },
      (tx, error) => {
        console.log('Error while deleting entry:', error);
      },
    );
  });
};
