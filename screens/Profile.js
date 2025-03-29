import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Button from '../components/controls/Button';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import { useProfile } from '../context/ProfileContext';
import FormItem from '../components/controls/FormItem';
import BottomNav from '../components/layout/BottomNav';

export default function Profile({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      gestureEnabled: false,
    });
  }, [navigation]);

  const { profile, setProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
    address: profile?.address || '',
    phone: profile?.phone || '',
  });

  const handleSave = () => {
    setProfile({
      ...profile,
      ...editedProfile
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    setProfile(null);
    navigation.replace('Welcome');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../assets/picture_profile.jpg')} 
          style={styles.profileImage}
        />
        {!isEditing ? (
          <Button
            type="secondary"
            label="Edit Profile"
            onPress={() => setIsEditing(true)}
            style={styles.editButton}
          />
        ) : (
          <Button
            type="primary"
            label="Save Changes"
            onPress={handleSave}
            style={styles.editButton}
          />
        )}
      </View>

      <View style={styles.content}>
        {isEditing ? (
          <>
            <FormItem
              label="Name"
              value={editedProfile.name}
              onChangeText={(text) => setEditedProfile({...editedProfile, name: text})}
            />
            <FormItem
              label="Email"
              value={editedProfile.email}
              onChangeText={(text) => setEditedProfile({...editedProfile, email: text})}
              keyboardType="email-address"
            />
            <FormItem
              label="Address"
              value={editedProfile.address}
              onChangeText={(text) => setEditedProfile({...editedProfile, address: text})}
              multiline
            />
            <FormItem
              label="Phone Number"
              value={editedProfile.phone}
              onChangeText={(text) => setEditedProfile({...editedProfile, phone: text})}
              keyboardType="phone-pad"
            />
          </>
        ) : (
          <>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{profile?.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{profile?.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>{profile?.address || 'Not specified'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.value}>{profile?.phone || 'Not specified'}</Text>
            </View>
          </>
        )}

        <Button
          type="secondary"
          label="Order History"
          onPress={() => navigation.navigate('OrderHistory')}
          style={styles.orderHistoryButton}
        />

        <Button
          type="secondary"
          label="Logout"
          onPress={handleLogout}
          style={styles.logoutButton}
        />
      </View>
      <BottomNav navigation={navigation} currentScreen="Profile" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  editButton: {
    marginBottom: 10,
  },
  content: {
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  label: {
    flex: 1,
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.bold,
    color: Colors.darkGray,
  },
  value: {
    flex: 2,
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.regular,
    color: Colors.gray,
  },
  orderHistoryButton: {
    marginTop: 30,
  },
  logoutButton: {
    marginTop: 15,
  },
});