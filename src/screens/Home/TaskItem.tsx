import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Icon} from '@rneui/themed';
import {COLORS} from '~constants/styles';
import {PRIORITY} from '~constants/task';
import {StyleSheet} from 'react-native';
import {Task} from '~types';
import {getDueIn} from '~src/utils/format';

const TaskItem = (task: Task) => {
  const toggleTaskCompletion = (id: string) => {};
  return (
    <View
      key={task.id}
      style={[styles.taskItem, task.completed && styles.taskCompleted]}>
      <TouchableOpacity
        onPress={() => toggleTaskCompletion(task.id)}
        style={styles.taskCheckBox}>
        {task.completed ? (
          <Icon name="check-square" color="#666" size={24} type="feather" />
        ) : (
          <Icon name="square" color="#666" size={24} type="feather" />
        )}
      </TouchableOpacity>
      <View style={styles.taskDetails}>
        <View style={styles.taskMeta}>
          <Text
            style={[
              styles.taskTitle,
              task.priority === 'high' && styles.highPriorityTask,
            ]}>
            {task.title}
          </Text>
          <TouchableOpacity>
            <Icon name="edit-2" color="#666" size={24} type="feather" />
          </TouchableOpacity>
        </View>
        <View style={[styles.taskMeta, {marginTop: 20}]}>
          <View style={styles.priorityIndicator}>
            <Icon
              name="alert-circle"
              color={COLORS.priority[task.priority]}
              size={16}
              type="feather"
              style={styles.priorityIcon}
            />
            <Text
              style={[
                styles.priorityText,
                {
                  color: COLORS.priority[task.priority],
                },
              ]}>
              {PRIORITY[task.priority]}
            </Text>
          </View>
          <Text style={styles.taskDueIn}>{getDueIn(task.deadline)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskCheckBox: {
    alignSelf: 'flex-start',
  },
  taskCompleted: {
    opacity: 0.5,
  },
  taskDetails: {
    flex: 1,
    marginLeft: 16,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  highPriorityTask: {
    color: COLORS.priority.high,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  taskDueIn: {
    fontSize: 14,
    color: 'black',
  },
  priorityIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityIcon: {
    marginRight: 4,
  },
  priorityText: {
    fontSize: 14,
  },
});

export default TaskItem;
