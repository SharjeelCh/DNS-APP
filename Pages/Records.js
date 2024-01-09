import {
  RefreshControl,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import {useSelector} from 'react-redux';
import SQLite from 'react-native-sqlite-storage';

const Records = () => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  // const selecter = useSelector(state => state);
  const [entries, setEntries] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    SELECT().then(() => setRefreshing(false));
  }, []);

  const SELECT = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM dns_entries',
          [],
          (tx, results) => {
            const fetchedEntries = results.rows.raw();
            setEntries(fetchedEntries);
            setRefresh(false);
            resolve();
          },
          (tx, error) => {
            console.log('Error while resolving entry:', error);
            reject(error);
          },
        );
      });
    });
  };

  useEffect(() => {
    SELECT();
  }, [refresh]);
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Header props={{text: 'Listed Entries'}} />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={entries}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                backgroundColor: 'black',
                width: width,
                height: height / 11,
                justifyContent: 'center',
                paddingLeft: width / 20,
                paddingRight: width / 20,
                borderColor: 'green',
                borderTopWidth: 0.6,
                borderBottomWidth: 0.6,
                marginTop: 2,
                marginBottom: 2,
              }}>
              <Text style={{color: 'white', letterSpacing: 3, fontSize: 17}}>
                {item.name}
              </Text>
              <Text style={{color: 'white', letterSpacing: 3, fontSize: 17}}>
                {item.ip}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Records;

const styles = StyleSheet.create({});
