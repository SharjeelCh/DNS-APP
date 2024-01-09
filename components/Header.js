import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const Header = ({props}) => {
  const navigation = useNavigation();
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  return (
    <View
      style={{
        flexDirection: 'row',
        width: width,
        height: height / 13,
        backgroundColor: 'black',
        alignItems: 'center',
        paddingLeft: 10,
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon name="angle-double-left" size={24} color={'white'} />
      </TouchableOpacity>
      <Text
        style={{
          color: 'white',
          letterSpacing: 2,
          fontSize: 24,
          paddingLeft: 19,
        }}>
        {props.text}
      </Text>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          marginRight: width / 23,
        }}
        onPress={() => {
          navigation.navigate('AboutUs');
        }}>
        <Icon name="question-circle" size={24} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
