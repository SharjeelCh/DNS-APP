import {
  Dimensions,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Button_ from '../components/Button_';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SQLite from 'react-native-sqlite-storage';

const Delete_ = () => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [choice, setchoice] = useState(0);
  const [del, setdel] = useState(0);
  const [toDelete, setToDelete] = useState('');

  const DB_NAME = 'DNSDatabase.db';

  const db = SQLite.openDatabase(
    {
      name: DB_NAME,
      // createFromLocation: '~DNSDatabase.db',
      location: 'default',
    },
    () => {},
    error => {
      console.log('Error while opening the database:', error);
    },
  );
  const deleteEntry = val => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE  FROM dns_entries where name = ? OR ip = ?;',
          [val, val],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              console.log('Entry deleted successfully');
              ToastAndroid.show('Entry deleted successfully', ToastAndroid.BOTTOM);
            } else {
              console.log('No matching entry found in the database');
              ToastAndroid.show('No matching entry found in the database', ToastAndroid.BOTTOM);
            }            
          },
          (tx, error) => {
            console.log('Error while deleting entry:', error);
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteEntry2 = val => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE  FROM dns_entries',
          [],
          (tx, results) => {
            console.log('Entry deleted successfully');
          },
          (tx, error) => {
            console.log('Error while deleting entry:', error);
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const delete_entry = () => {
    deleteEntry(toDelete);
  };
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Header props={{text: 'Delete'}} />
      <View style={{flex: 0.5, justifyContent: 'space-evenly'}}>
        <Text style={{color: 'white', fontSize: 23, marginLeft: width / 9}}>
          Delete By{' '}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Text style={{color: 'white', fontSize: 18}}>Domain</Text>
          {choice < 0 ? (
            <Pressable
              onPress={() => {
                setchoice(1);
                setdel(2);
              }}>
              <Icon name="dot-circle" size={24} color={'green'} />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                setchoice(-1);
                setdel(1);
              }}>
              <Icon name="circle" size={24} color={'white'} />
            </Pressable>
          )}
          <Text style={{color: 'white', fontSize: 18}}>Ip Address</Text>

          {choice > 1 ? (
            <Pressable
              onPress={() => {
                setchoice(1);
                setdel(2);
              }}>
              <Icon name="dot-circle" size={24} color={'green'} />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                setchoice(2);
                setdel(2);
              }}>
              <Icon name="circle" size={24} color={'white'} />
            </Pressable>
          )}
        </View>
        {del == 1 ? (
          <View
            style={{
              width: width / 1.4,
              height: height / 16,
              backgroundColor: '#596359',
              borderWidth: 1,
              borderColor: '#42AA3B',
              borderRadius: 7,
              marginTop: height / 30,
              marginBottom: height / 70,
              marginLeft: width / 9,
            }}>
            <TextInput
              placeholder="Domain"
              placeholderTextColor={'white'}
              style={{
                fontSize: 16,
                letterSpacing: 2,
                paddingLeft: 10,
                paddingRight: 10,
                color: 'white',
              }}
              onChangeText={text => {
                setToDelete(text);
              }}
            />
          </View>
        ) : (
          <View
            style={{
              width: width / 1.4,
              height: height / 16,
              backgroundColor: '#596359',
              borderWidth: 1,
              borderColor: '#42AA3B',
              borderRadius: 7,
              marginTop: height / 30,
              marginBottom: height / 70,
              marginLeft: width / 9,
            }}>
            <TextInput
              placeholder="Ip Address"
              placeholderTextColor={'white'}
              style={{
                fontSize: 16,
                letterSpacing: 2,
                paddingLeft: 10,
                paddingRight: 10,
                color: 'white',
              }}
              onChangeText={text => {
                setToDelete(text);
              }}
            />
          </View>
        )}
      </View>
      <View style={{marginLeft: width / 9}}>
        <Button_
          props={{text: 'Delete'}}
          onpress={() => {
            delete_entry();
          }}
        />
      </View>
    </View>
  );
};

export default Delete_;

const styles = StyleSheet.create({});
