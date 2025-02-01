import { View, TextInput, Text, StyleSheet } from "react-native";
import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";
export default function FormItem({label}) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
        <TextInput style={styles.input}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: "100%",
  },
  label: {
    color: Colors.oldSilver,
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.small,
    textAlign: 'left'
  },
  input: {
    borderColor: Colors.cinnabar,
    borderBottomWidth:2,
    color: Colors.jet,
    fontSize: Fonts.size.normal,
    paddingBottom: 5,
    paddingTop: 5,
  },
});