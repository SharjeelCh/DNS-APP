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
import {Modal} from 'react-native';


const Validate = ({navigation}) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [choice, setchoice] = useState(0);
  const [del, setdel] = useState(0);
  const [toVarify, setToVarify] = useState('');
  const [ip, setIp] = useState('');
  const [D, setD] = useState('');

  const [modalVisible, setModalVisible] = useState(false);


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

  const resolveEntry = nameOrIP => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM dns_entries WHERE name = ? OR ip = ?;',
        [nameOrIP, nameOrIP],
        (tx, results) => {
          const entries=results.rows.raw()
          console.log(entries);
          if (entries.length > 0) {
            const entry = entries[0];
            setIp(entry.ip);
            setD(entry.name)
            setModalVisible(true);
          } else {
            ToastAndroid.show('No Such Entry Present in Database', ToastAndroid.BOTTOM);
          }
        },
        (tx, error) => {
          console.log('Error while resolving entry:', error);
          ToastAndroid.show('No Such Entry Present in Database');
        },
      );
    });
  };

  const Validate = (nameOrIP) => {
    if (toVarify !== '') {
      resolveEntry(toVarify);
    } else {
      ToastAndroid.show('Please enter a value for validation', ToastAndroid.BOTTOM);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Header props={{text: 'Validate'}} />
      <View style={{flex: 0.5, justifyContent: 'space-evenly'}}>
        <Text style={{color: 'white', fontSize: 23, marginLeft: width / 9}}>
          Search & Validate By{' '}
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
                setToVarify(text);
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
                setToVarify(text);
              }}
            />
          </View>
        )}
      </View>
      <View style={{marginLeft: width / 9}}>
        <Button_
          props={{text: 'Validate'}}
          onpress={() => {
            Validate(toVarify);
          }}
        />

      </View>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalContainer}>
            <View style={{...styles.modalContent,alignSelf:'center',alignItems:'center'}}>
              <Text style={styles.heading}>Verified Entry</Text>
              <Text style={styles.heading}>
                Your Ip and Domain are Valid
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <Text style={styles.modalText}>{D}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <Text style={styles.heading}>{ip}</Text>
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
  );
};

export default Validate;

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
    width:180
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
