import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {COLORS} from '~constants/styles';

const DatePickerModal = ({
  visible,
  onClose,
  onDateChange,
}: {
  visible: boolean;
  onClose: () => void;
  onDateChange: (date: Date) => void;
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <DatePicker
            date={new Date()}
            onDateChange={onDateChange}
            mode="date"
          />
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>XONG</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  button: {
    backgroundColor: COLORS.button,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
});

export default DatePickerModal;
