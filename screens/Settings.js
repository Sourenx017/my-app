import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

export default function Settings() {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Push Notifications</Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{ false: Colors.lightGray, true: Colors.darkGray }}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: Colors.lightGray, true: Colors.darkGray }}
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: Fonts.size.large,
    fontFamily: Fonts.family.bold,
    marginBottom: 30,
    color: Colors.darkGray,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  settingLabel: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.regular,
    color: Colors.darkGray,
  },
  button: {
    marginTop: 30,
    backgroundColor: Colors.darkGray,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.bold,
  },
});
