/**
 * Demo App - iOS React Native Application
 * A demonstration app showcasing iOS-specific features
 *
 * @format
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  useColorScheme,
} from 'react-native';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [counter, setCounter] = useState(0);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#1C1C1E' : '#F2F2F7',
    flex: 1,
  };

  const handleButtonPress = () => {
    setCounter(counter + 1);
    Alert.alert(
      'Button Pressed!',
      `You've pressed the button ${counter + 1} times`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  const resetCounter = () => {
    Alert.alert(
      'Reset Counter',
      'Are you sure you want to reset the counter?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: () => setCounter(0)
        },
      ]
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
        contentContainerStyle={styles.scrollContainer}>
        
        <View style={styles.container}>
          <Text style={[styles.title, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
            🍎 Demo App
          </Text>
          
          <Text style={[styles.subtitle, { color: isDarkMode ? '#8E8E93' : '#6D6D70' }]}>
            iOS React Native Demonstration
          </Text>

          <View style={styles.counterContainer}>
            <Text style={[styles.counterLabel, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
              Counter:
            </Text>
            <Text style={[styles.counterValue, { color: '#007AFF' }]}>
              {counter}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={handleButtonPress}
            activeOpacity={0.8}>
            <Text style={styles.buttonText}>Tap Me!</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={resetCounter}
            activeOpacity={0.8}>
            <Text style={[styles.buttonText, { color: '#FF3B30' }]}>Reset</Text>
          </TouchableOpacity>

          <View style={styles.infoContainer}>
            <Text style={[styles.infoText, { color: isDarkMode ? '#8E8E93' : '#6D6D70' }]}>
              This is a demo React Native app designed for iOS.
            </Text>
            <Text style={[styles.infoText, { color: isDarkMode ? '#8E8E93' : '#6D6D70' }]}>
              Features iOS-style UI components and interactions.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 40,
    textAlign: 'center',
  },
  counterContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  counterLabel: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
  },
  counterValue: {
    fontSize: 48,
    fontWeight: '700',
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginVertical: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  infoContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
  },
});

export default App;
