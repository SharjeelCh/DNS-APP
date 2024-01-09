import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Add from './Add';
import Validate from './Validate';
import Delete_ from './Delete_';
import Records from './Records';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AboutUs} from './AboutUs';
import Splash from './Splash';

const Navigation = () => {
  const stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const TabNav = () => {
    return (
      <Tab.Navigator
        initialRouteName="Add"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: 'black',
            // borderTopEndRadius: 38,
            // borderTopLeftRadius: 38,
            height: 75,
            elevation: 10,
          },
          tabBarHideOnKeyboard: true,
        }}>
        <stack.Screen
          name="Add"
          component={Add}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <Icon
                  name="plus-square"
                  size={focused ? 35 : 30}
                  color={focused ? '#42AA3B' : 'white'}
                />
              );
            },
            headerShown: false,
            tabBarShowLabel: false,
          }}
        />
        <stack.Screen
          name="Validate"
          component={Validate}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <Icon
                  name="check-square-o"
                  size={focused ? 35 : 30}
                  color={focused ? '#42AA3B' : 'white'}
                />
              );
            },
            headerShown: false,
            tabBarShowLabel: false,
          }}
        />
        <stack.Screen
          name="Delete_"
          component={Delete_}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <Icon
                  name="trash-o"
                  size={focused ? 35 : 30}
                  color={focused ? '#42AA3B' : 'white'}
                />
              );
            },
            headerShown: false,
            tabBarShowLabel: false,
          }}
        />
        <stack.Screen
          name="Records"
          component={Records}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <Icon
                  name="database"
                  size={focused ? 33 : 27}
                  color={focused ? '#42AA3B' : 'white'}
                />
              );
            },
            headerShown: false,
            tabBarShowLabel: false,
          }}
        />
      </Tab.Navigator>
    );
  };
  return (
    <stack.Navigator>
       <stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="TabNav"
        component={TabNav}
        options={{headerShown: false}}
      />
     
      <stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{headerShown: false}}
      />
    </stack.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
