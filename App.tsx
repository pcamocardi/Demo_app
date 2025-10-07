/**
 * Demo App - Advanced Calculator for iOS
 * React Native calculator with comprehensive mathematical functions
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import Calculator from './Calculator';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: '#1C1C1E', // Force dark background
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={backgroundStyle.backgroundColor}
      />
      
      <View style={[styles.header, { backgroundColor: '#2C2C2E' }]}>
        <Text style={[styles.title, { color: '#FFFFFF' }]}>
          🧮 Calculator
        </Text>
        <Text style={[styles.subtitle, { color: '#8E8E93' }]}>
          Developed by Pablo using AI
        </Text>
      </View>
      
      <Calculator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    marginHorizontal: 8,
    marginTop: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default App;
