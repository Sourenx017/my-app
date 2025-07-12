import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

export default function Button({
  onPress,
  title,
  label,
  type = "primary",
  disabled,
  style,
}) {
  const buttonText = title || label;

  const getButtonStyle = () => {
    const buttonStyles = [styles.button];

    if (type === "outline") {
      buttonStyles.push(styles.outline);
    } else if (styles[type]) {
      buttonStyles.push(styles[type]);
    }

    if (disabled) {
      buttonStyles.push(styles.disabled);
    }

    if (style) {
      buttonStyles.push(style);
    }

    return buttonStyles;
  };

  const getTextStyle = () => {
    const textStyles = [styles.text];

    if (type === "outline") {
      textStyles.push(styles.outlineText);
    } else if (styles[`${type}Text`]) {
      textStyles.push(styles[`${type}Text`]);
    }

    return textStyles;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
    >
      {typeof buttonText === "string" ? (
        <Text style={getTextStyle()}>{buttonText}</Text>
      ) : (
        buttonText
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  primary: {
    backgroundColor: Colors.darkGray,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.darkGray,
  },
  secondary: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.darkGray,
  },
  info: {
    backgroundColor: "#17a2b8",
  },
  danger: {
    backgroundColor: "#dc3545",
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: Colors.white,
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.bold,
  },
  outlineText: {
    color: Colors.darkGray,
  },
  secondaryText: {
    color: Colors.darkGray,
  },
  primaryText: {
    color: Colors.white,
  },
  infoText: {
    color: Colors.white,
  },
  dangerText: {
    color: Colors.white,
  },
});
