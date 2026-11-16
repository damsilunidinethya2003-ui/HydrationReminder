import { StyleSheet, Text, View } from 'react-native';

export default function AboutTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>About This App</Text>

      <Text style={styles.description}>
        Built for Mobile Application Development Lab 6. Demonstrates local
        notifications and Expo Router tab navigation.
      </Text>

      <Text style={styles.footer}>
        Developed with React Native and Expo.{'\n'}
        Created by [Dinethya Damsiluni].
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  footer: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
  },
});