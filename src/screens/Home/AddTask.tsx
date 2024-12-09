import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import DatePickerModal from '~components/DatePickerModal';
import {PRIORITY} from '~constants/task';
import {Dialog, Icon} from '@rneui/themed';
import {getDate} from '~utils/format';
import {COLORS} from '~constants/styles';
import {Task} from '~types';
import {useAppDispatch} from '~redux';
import uuid from 'react-native-uuid';
import {addTask} from '~redux/slices/task';

const AddTask = ({task, onClose}: {task: Task | null; onClose: () => void}) => {
  const dispatch = useAppDispatch();
  const [taskTitle, setTaskTitle] = useState(task?.title || '');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [showPriorityDialog, setShowPriorityDialog] = useState(false);
  const handleAddTask = () => {
    if (taskTitle === '') {
      Alert.alert('Vui lòng nhập tiêu đề task');
      return;
    }
    const newTask = {
      id: uuid.v4(),
      title: taskTitle,
      deadline: getDate(date),
      completed: false,
      priority,
    };
    dispatch(addTask(newTask));
    onClose();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {}} style={styles.deleteButton}>
        <Icon name="trash-2" color="#666" size={24} type="feather" />
        <Text style={styles.deleteText}>Xóa</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Nhập task mới"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />
      <View style={styles.customInput}>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowDatePicker(!showDatePicker)}>
          <Text style={styles.dateLabel}>Thời hạn</Text>
          <Text style={styles.dateText}>{getDate(date)}</Text>
        </TouchableOpacity>
        <DatePickerModal
          visible={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          onDateChange={setDate}
        />
      </View>
      {/* Priority input */}
      <View style={styles.customInput}>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowPriorityDialog(!showPriorityDialog)}>
          <Text style={styles.dateLabel}>Mức độ ưu tiên</Text>
          <Text
            style={[
              styles.priorityTextInput,
              {
                backgroundColor: COLORS.priority[priority],
              },
            ]}>
            {PRIORITY[priority]}
          </Text>
        </TouchableOpacity>
        <Dialog
          isVisible={showPriorityDialog}
          onBackdropPress={() => setShowPriorityDialog(false)}>
          <Dialog.Title title="Chọn mức độ ưu tiên" />
          {Object.keys(PRIORITY).map((key: string) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.priorityItem,
                {backgroundColor: COLORS.priority[key]},
              ]}
              onPress={() => {
                setPriority(key as 'low' | 'medium' | 'high');
                setShowPriorityDialog(false);
              }}>
              <Text style={styles.priorityText}>{PRIORITY[key]}</Text>
            </TouchableOpacity>
          ))}
        </Dialog>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Xong</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginVertical: 8,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  deleteText: {
    color: 'black',
    fontSize: 16,
    marginLeft: 5,
  },
  input: {
    margin: 12,
    fontSize: 16,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: 0,
  },
  customInput: {
    margin: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  dateInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dateText: {
    fontSize: 16,
    color: 'black',
  },
  priorityItem: {
    padding: 12,
    color: 'white',
    borderRadius: 15,
    marginBottom: 20,
  },
  priorityTextInput: {
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: 'white',
  },
  priorityText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    backgroundColor: COLORS.success,
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 40,
    paddingVertical: 5,
    borderRadius: 15,
  },
});

export default AddTask;
