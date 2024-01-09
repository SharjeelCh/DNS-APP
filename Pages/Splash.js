import {StyleSheet, Text, View, SafeAreaView, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [text,settext]=useState('')
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('TabNav');
    }, 3500);
    texter()
  }, []);
  const texter=()=>{
    setTimeout(()=>{
        settext('DNS App')
    },2700)
  }
  return (
    <SafeAreaView style={{backgroundColor: 'black', flex: 1,justifyContent:'center',alignItems:'center'}}>
      <LottieView
        source={require('../components/Animation - 1704633869950.json')}
        // ref={animation}
        style={{
          height: width/3,
          width: height/3,
          alignSelf: 'center',
          marginTop: 0,
          justifyContent: 'center',
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
      <Text
        style={{
          marginTop: 7,
          fontSize: 24,
          color:'white',
          fontWeight: '700',
          textAlign: 'center',
        }}>
        {text}
      </Text>
     
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({});
