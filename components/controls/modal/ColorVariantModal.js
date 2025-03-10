import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';

const colorOptions = [
  { id: '1', name: 'Silver', value: '#C0C0C0' },
  { id: '2', name: 'Gold', value: '#FFD700' },
  { id: '3', name: 'Black', value: '#000000' },
  { id: '4', name: 'Rose Gold', value: '#B76E79' },
];

export default function ColorVariantModal({ visible, onClose, onSelectColor, selectedColor }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Color Variant</Text>
          <ScrollView>
            {colorOptions.map((color) => (
              <TouchableOpacity
                key={color.id}
                style={[
                  styles.colorOption,
                  selectedColor === color.name && styles.selectedOption
                ]}
                onPress={() => {
                  onSelectColor(color.name);
                  onClose();
                }}
              >
                <View style={[styles.colorPreview, { backgroundColor: color.value }]} />
                <Text style={styles.colorName}>{color.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: Fonts.size.large,
    fontFamily: Fonts.family.bold,
    color: Colors.darkGray,
    marginBottom: 20,
    textAlign: 'center',
  },
  colorOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  selectedOption: {
    backgroundColor: Colors.lightGray,
  },
  colorPreview: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 15,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  colorName: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.regular,
    color: Colors.darkGray,
  },
  closeButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: Colors.darkGray,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: Colors.white,
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.family.bold,
  },
});