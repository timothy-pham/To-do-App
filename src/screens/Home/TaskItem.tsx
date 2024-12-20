import React from 'react';
import Animated, {
  Layout,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {View, TouchableOpacity, Text, ViewToken} from 'react-native';
import {Icon} from '@rneui/themed';
import {COLORS} from '~constants/styles';
import {PRIORITY} from '~constants/task';
import {StyleSheet} from 'react-native';
import {Task} from '~types';
import {getDueIn} from '~utils/format';
import {useAppDispatch} from '~redux';
import {updateTask} from '~redux/slices/task';

const TaskItem = React.memo(
  ({
    task,
    setCurrentTask,
    viewableItems,
  }: {
    task: Task;
    setCurrentTask: (task: Task) => void;
    viewableItems: Animated.SharedValue<ViewToken[]>;
  }) => {
    const dispatch = useAppDispatch();

    const toggleTaskCompletion = () => {
      const updatedTask = {
        ...task,
        completed: !task.completed,
      };
      dispatch(updateTask(updatedTask));
    };

    const rStyle = useAnimatedStyle(() => {
      const isVisible = Boolean(
        viewableItems.value
          .filter(item => item.isViewable)
          .find(viewableItem => viewableItem.item.id === task.id),
      );
      return {
        opacity: withTiming(isVisible ? 1 : 0),
        transform: [
          {
            scale: withTiming(isVisible ? 1 : 0.6),
          },
        ],
      };
    }, []);

    return (
      <Animated.View
        key={task.id}
        style={[
          styles.taskItem,
          task.completed && styles.taskCompleted,
          rStyle,
        ]}>
        <TouchableOpacity
          onPress={() => toggleTaskCompletion()}
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
            <TouchableOpacity
              onPress={() => {
                setCurrentTask(task);
              }}>
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
                Ưu tiên {PRIORITY[task.priority]}
              </Text>
            </View>
            <Text style={styles.taskDueIn}>{getDueIn(task.deadline)}</Text>
          </View>
        </View>
      </Animated.View>
    );
  },
);

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
    borderColor: COLORS.success,
    borderWidth: 2,
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
