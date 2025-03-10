import { View, TextInput, Text, StyleSheet } from "react-native";
import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";

export default function FormItem({
  label,
  value,
  onChangeText,
  keyboardType,
  multiline,
}) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          multiline && { height: 80, textAlignVertical: 'top' }
        ]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    color: Colors.darkGray,
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.normal,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 8,
    color: Colors.darkGray,
    fontSize: Fonts.size.normal,
    padding: 12,
    backgroundColor: Colors.white,
  },
});