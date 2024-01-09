import {
  Button,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import React, {useEffect, useState} from 'react';
import Button_ from '../components/Button_';
import Header from '../components/Header';
import {Pressable} from 'react-native';
import {Modal} from 'react-native';

const Add = () => {
  const [Domain, setDomain] = useState('');
  const [Ip, setIp] = useState('');
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [modalVisible, setModalVisible] = useState(false);

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

  const createTable = () => {
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

  const isValidInput = () => {
    const domainRegex =
      /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/;
    const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;

    return domainRegex.test(Domain) && ipRegex.test(Ip);
  };

  const addEntry = (name, ip) => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO dns_entries (name, ip) VALUES (?, ?);',
          [name, ip],
          (tx, results) => {
            console.log('Entry added successfully:', results.insertId);
            ToastAndroid.show('Entry added in Database', ToastAndroid.BOTTOM);
          },
          (tx, error) => {
            console.log('Error while adding entry:', error);
            ToastAndroid.show('Entry already in Database', ToastAndroid.BOTTOM);
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addEntries = () => {
    if (isValidInput()) {
      console.log('Added');
      addEntry(Domain, Ip);
    } else if (Domain == '' || Ip == '') {
      ToastAndroid.show('Please fill out all the entries', ToastAndroid.BOTTOM);
    } else {
      setModalVisible(true);
    }
  };
  useEffect(() => {
    createTable();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'space-evenly'}}>
      <Header props={{text: 'Home'}} />

      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
        }}>
        <View style={{marginTop: height / 20, marginBottom: height / 25}}>
          <Text style={{color: 'white', fontSize: 22, marginLeft: width / 9.6}}>
            Add Entry
          </Text>
        </View>
        <View
          style={{
            width: width / 1.4,
            height: height / 16,
            backgroundColor: '#596359',
            borderWidth: 1,
            borderColor: '#42AA3B',
            borderRadius: 7,
            marginLeft: width / 9.6,
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
              setDomain(text);
            }}
          />
        </View>
        <View
          style={{
            width: width / 1.4,
            height: height / 16,
            backgroundColor: '#596359',
            borderWidth: 1,
            borderColor: '#42AA3B',
            borderRadius: 7,
            marginTop: height / 30,
            marginBottom: height / 30,
            marginLeft: width / 9.6,
            margintop: height / 30,
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
              setIp(text);
            }}
          />
        </View>
        <View style={{marginLeft: width / 9.6, margintop: height / 30}}>
          <Button_ props={{text: 'Add'}} onpress={() => addEntries()} />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.heading}>Invalid Domain or IP Address</Text>
              <Text style={styles.heading}>
                Your Ip and Domain should be as below
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <Text style={styles.modalText}>Domain: </Text>
                <Text style={styles.heading}>my-domain123.co.uk</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <Text style={styles.modalText}>Ip: </Text>
                <Text style={styles.heading}>192.158.1.38</Text>
              </View>
              <Pressable
                style={[styles.modalButton, styles.modalButtonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.modalButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#596359',
    borderColor: 'green',
    borderWidth: 1,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'white',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  modalButtonClose: {
    backgroundColor: 'green',
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  heading: {
    fontSize: 18,
    marginBottom: 13,
    color: 'white',
    fontWeight: '700',
  },
});
