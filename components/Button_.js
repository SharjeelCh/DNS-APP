import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const Button_ = ({props, onpress}) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  return (
    <TouchableOpacity
      style={{
        width: width / 3,
        height: height / 19,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
      }}
      onPress={onpress}>
      <Text
        style={{
          color: 'white',
          letterSpacing: 3,
          fontSize: 18,
          fontWeight: '700',
        }}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button_;

const styles = StyleSheet.create({});
