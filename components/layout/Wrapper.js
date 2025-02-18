import { View, ScrollView, StyleSheet, StatusBar } from "react-native";
import Colors from "../../constants/Colors";

export default function Wrapper({children, backgroundColor}) {
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor || Colors.white }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  }
});