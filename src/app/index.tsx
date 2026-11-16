import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function ReminderTab() {
  const [isReminding, setIsReminding] = useState(false);
  const [message, setMessage] = useState('Time to drink a glass of water!');
  const [intervalMinutes, setIntervalMinutes] = useState(1);

  // Request notification permissions on mount
  useEffect(() => {
    async function requestPermissions() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission required',
          'We need notifications to remind you to drink water!'
        );
      }
    }
    requestPermissions();
  }, []);

  // Schedule a notification
  async function scheduleReminder() {
    await Notifications.requestPermissionsAsync(); // Safe check just in case

    // Clear old ones first so they don't stack up
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Schedule the new notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '💧 Hydration Alert',
        body: message,
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: intervalMinutes * 60,
        repeats: true,
      },
    });

    setIsReminding(true);
    Alert.alert('Set!', `Reminding you every ${intervalMinutes} minutes.`);
  }

  // Stop reminders
  async function stopReminder() {
    await Notifications.cancelAllScheduledNotificationsAsync();
    setIsReminding(false);
    Alert.alert('Stopped', 'Reminders cancelled.');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🥤</Text>

      <Text style={styles.label}>Add a Custom Message</Text>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={(text) => setMessage(text)}
        placeholder="Enter reminder message"
      />

      <Text style={styles.label}>Set Interval (minutes)</Text>
      <TextInput
        style={styles.input}
        value={intervalMinutes.toString()}
        onChangeText={(text) => setIntervalMinutes(parseInt(text) || 1)}
        keyboardType="numeric"
      />

      <Text style={styles.status}>
        Status: {isReminding ? 'Active 🟢' : 'Inactive 🔴'}
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="START REMINDERS" color="#0EA5E9" onPress={scheduleReminder} />
        <View style={{ height: 10 }} />
        <Button title="STOP REMINDERS" color="#EF4444" onPress={stopReminder} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F766E',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    fontSize: 15,
    marginBottom: 10,
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginVertical: 20,
  },
  buttonContainer: {
    width: '60%',
  },
});
