import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export const AboutUs = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>DNS Entries App</Text>
      <Text style={styles.descriptionText}>
        This app allows you to manage DNS entries with the following
        functionalities:
      </Text>

      <TouchableOpacity
        style={styles.functionalityButton}
        onPress={() => navigation.navigate('Add')}>
        <Text style={styles.buttonText}>Add DNS Entry</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.functionalityButton}
        onPress={() => navigation.navigate('Delete_')}>
        <Text style={styles.buttonText}>Delete DNS Entry</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.functionalityButton}
        onPress={() => navigation.navigate('Validate')}>
        <Text style={styles.buttonText}>Validate DNS Entry</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.functionalityButton}
        onPress={() => navigation.navigate('Records')}>
        <Text style={styles.buttonText}>View DNS Records</Text>
      </TouchableOpacity>
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 25}}>
        <Text
          style={{
            fontSize: 16,
            marginBottom: 15,
            textAlign: 'center',
            color: 'white',
          }}>
          Developed By
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginBottom: 0,
            textAlign: 'center',
            color: 'white',
          }}>
          Sharjeel Fida Chaudhary
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: 'white',
  },
  functionalityButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
