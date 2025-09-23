import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const LocalAuthTestScreen = () => {
  const [authResult, setAuthResult] = useState<string>('Not tested yet');

  const handleAuth = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        setAuthResult('Device does not support biometrics');
        return;
      }

      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!enrolled) {
        setAuthResult('No biometrics enrolled on this device');
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate',
        fallbackLabel: 'Enter Passcode',
        disableDeviceFallback: false,
      });

      if (result.success) {
        setAuthResult('✅ Authenticated successfully!');
      } else {
        setAuthResult(`❌ Authentication failed: ${result.error}`);
      }
    } catch (err) {
      setAuthResult(`⚠️ Error: ${(err as Error).message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Local Authentication Test</Text>
      <Button title="Authenticate" onPress={handleAuth} />
      <Text style={styles.result}>{authResult}</Text>
    </View>
  );
};

export default LocalAuthTestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'red',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
  },
});
