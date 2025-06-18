import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Button from "../components/controls/Button";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import { useProfile } from "../context/ProfileContext";
import FormItem from "../components/controls/FormItem";
import BottomNav from "../components/layout/BottomNav";
import { logout } from "../services/firebase-service";

import { getAuth } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { doc, onSnapshot } from "firebase/firestore";

const [loading, setLoading] = useState(false);
const [data, setData] = useState({
  name: user?.displayName || profile?.name || "",
  email: user?.email || profile?.email || "",
  address: profile?.address || "",
  phone: profile?.phone || "",
});
const [editedProfile, setEditedProfile] = useState(data);

export default function Profile({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      gestureEnabled: false,
    });
  }, [navigation]);
  const { profile, setProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;
  const subscriber = onSnapshot(doc(db, "users", user?.uid || ""), (doc) => {
    if (doc.exists()) {
      const userData = docSnap.data();
      setData((prevData) => ({
        ...prevData,
        name: userData.name || user?.displayName || "",
        email: userData.email || user?.email || "",
        address: userData.address || "",
        phone: userData.phone || "",
      }));
    }
  });
  const handleSave = async () => {
    setProfile({
      ...profile,
      ...editedProfile,
    });
    setData(editedProfile); // Update data state with new profile info
    // Update Firebase Auth profile if name or email changed
    try {
      if (user) {
        if (user.displayName !== editedProfile.name) {
          await user.updateProfile({ displayName: editedProfile.name });
        }
        if (user.email !== editedProfile.email) {
          await user.updateEmail(editedProfile.email);
        }
      }
    } catch (error) {
      console.log("Profile update error:", error);
    }
    setIsEditing(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setProfile(null);
      navigation.replace("Welcome");
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/picture_profile.jpg")}
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
              onChangeText={(text) =>
                setEditedProfile({ ...editedProfile, name: text })
              }
            />
            <FormItem
              label="Email"
              value={editedProfile.email}
              onChangeText={(text) =>
                setEditedProfile({ ...editedProfile, email: text })
              }
              keyboardType="email-address"
            />
            <FormItem
              label="Address"
              value={editedProfile.address}
              onChangeText={(text) =>
                setEditedProfile({ ...editedProfile, address: text })
              }
              multiline
            />
            <FormItem
              label="Phone Number"
              value={editedProfile.phone}
              onChangeText={(text) =>
                setEditedProfile({ ...editedProfile, phone: text })
              }
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
              <Text style={styles.value}>
                {profile?.address || "Not specified"}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.value}>
                {profile?.phone || "Not specified"}
              </Text>
            </View>
          </>
        )}{" "}
        <Button
          type="secondary"
          label="Order History"
          onPress={() => navigation.navigate("OrderHistory")}
          style={styles.orderHistoryButton}
        />
        {loading ? (
          <ActivityIndicator
            size="large"
            color={Colors.primary}
            style={styles.logoutButton}
          />
        ) : (
          <Button
            type="danger"
            label="Logout"
            onPress={handleLogout}
            style={styles.logoutButton}
          />
        )}
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
    alignItems: "center",
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
    flexDirection: "row",
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
