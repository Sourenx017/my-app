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

export default function Profile({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      gestureEnabled: false,
    });
  }, [navigation]);

  const { profile, currentUser, updateProfile, logout } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    address: profile?.address || {
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
    phone: profile?.phone || "",
  });

  const isAdmin =
    profile?.role === "admin" ||
    currentUser?.role === "admin" ||
    profile?.privilege === "admin" ||
    currentUser?.privilege === "admin";

  // Para depuración
  console.log("Profile privilege:", profile?.privilege);
  console.log("Current user privilege:", currentUser?.privilege);

  // Para depuración
  console.log("Profile role:", profile?.role);
  console.log("Current user role:", currentUser?.role);
  console.log("Is admin?", isAdmin);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile(editedProfile);
      setIsEditing(false);
    } catch (error) {
      console.log("Profile update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      navigation.reset({
        index: 0,
        routes: [{ name: "Welcome" }],
      });
    } catch (error) {
      console.log("Logout error:", error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={require("../assets/picture_profile.jpg")}
            style={styles.profileImage}
          />
          <Button
            title={isEditing ? "Save Changes" : "Edit Profile"}
            onPress={isEditing ? handleSave : () => setIsEditing(true)}
            type="outline"
            style={styles.editButton}
          />
        </View>

        <View style={styles.content}>
          {isEditing ? (
            <>
              <FormItem
                label="Street"
                value={editedProfile.address.street}
                onChangeText={(text) =>
                  setEditedProfile((prev) => ({
                    ...prev,
                    address: { ...prev.address, street: text },
                  }))
                }
              />
              <FormItem
                label="City"
                value={editedProfile.address.city}
                onChangeText={(text) =>
                  setEditedProfile((prev) => ({
                    ...prev,
                    address: { ...prev.address, city: text },
                  }))
                }
              />
              <FormItem
                label="State"
                value={editedProfile.address.state}
                onChangeText={(text) =>
                  setEditedProfile((prev) => ({
                    ...prev,
                    address: { ...prev.address, state: text },
                  }))
                }
              />
              <FormItem
                label="Country"
                value={editedProfile.address.country}
                onChangeText={(text) =>
                  setEditedProfile((prev) => ({
                    ...prev,
                    address: { ...prev.address, country: text },
                  }))
                }
              />
              <FormItem
                label="ZIP Code"
                value={editedProfile.address.zipCode}
                onChangeText={(text) =>
                  setEditedProfile((prev) => ({
                    ...prev,
                    address: { ...prev.address, zipCode: text },
                  }))
                }
              />
              <FormItem
                label="Phone"
                value={editedProfile.phone}
                onChangeText={(text) =>
                  setEditedProfile((prev) => ({ ...prev, phone: text }))
                }
                keyboardType="phone-pad"
              />
            </>
          ) : (
            <>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.value}>
                  {currentUser?.name || "Not set"}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>
                  {currentUser?.email || "Not set"}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Address</Text>
                <Text style={styles.value}>
                  {profile?.address
                    ? `${profile.address.street || ""}, ${
                        profile.address.city || ""
                      }, ${profile.address.state || ""}, ${
                        profile.address.country || ""
                      } ${profile.address.zipCode || ""}`.trim() || "Not set"
                    : "Not set"}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Phone</Text>
                <Text style={styles.value}>{profile?.phone || "Not set"}</Text>
              </View>
              {isAdmin && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Role</Text>
                  <Text style={[styles.value, styles.adminText]}>
                    Administrator
                  </Text>
                </View>
              )}
            </>
          )}

          {/* Admin Options */}
          {isAdmin && (
            <View style={styles.adminSection}>
              <Text style={styles.sectionTitle}>Admin Options</Text>
              <Button
                title="Manage Products"
                onPress={() => navigation.navigate("AdminProducts")}
                type="primary"
                style={styles.adminButton}
              />
              <Button
                title="View Orders"
                onPress={() => navigation.navigate("OrderHistory")}
                type="primary"
                style={styles.adminButton}
              />
            </View>
          )}

          {/* Regular User Options */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Options</Text>
            <Button
              title="Order History"
              onPress={() => navigation.navigate("OrderHistory")}
              type="outline"
              style={styles.button}
            />
            {__DEV__ && (
              <Button
                title="Backend Test"
                onPress={() => navigation.navigate("BackendTest")}
                type="outline"
                style={styles.backendTestButton}
              />
            )}
          </View>
        </View>
      </ScrollView>

      <Button
        title={loading ? <ActivityIndicator color={Colors.white} /> : "Logout"}
        onPress={handleLogout}
        type="outline"
        style={styles.logoutButton}
        disabled={loading}
      />

      <BottomNav navigation={navigation} currentScreen="Profile" />
    </View>
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
    width: 200,
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
  section: {
    marginTop: 20,
  },
  adminSection: {
    marginTop: 30,
    backgroundColor: Colors.lightGray,
    padding: 15,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.bold,
    color: Colors.darkGray,
    marginBottom: 15,
  },
  button: {
    marginBottom: 10,
  },
  adminButton: {
    marginBottom: 10,
    backgroundColor: Colors.primary || "#007bff",
  },
  adminText: {
    color: Colors.primary || "#007bff",
    fontFamily: Fonts.family.bold,
  },
  backendTestButton: {
    marginTop: 10,
  },
  logoutButton: {
    marginHorizontal: 20,
    marginBottom: 80,
  },
});
