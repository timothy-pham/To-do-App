import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {COLORS} from '~constants/styles';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '~redux';
import TaskItem from './TaskItem';
import {SafeAreaView} from 'react-native-safe-area-context';
import AddTask from './AddTask';
import {Task} from '~types';
import {getData} from '~libs/async/storage';
import {syncTasks} from '~redux/slices/task';

const Home = () => {
  const dispatch = useAppDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isAddingTask, setIsAddingTask] = useState(false);

  const syncTaskFromStorage = useCallback(async () => {
    try {
      const tasksData = await getData('tasks');
      if (tasksData) {
        dispatch(syncTasks(tasksData));
      }
    } catch (error) {}
  }, []);

  useEffect(() => {
    syncTaskFromStorage();
    return () => {};
  }, []);

  const taskList: Task[] = useMemo(() => {
    // sort tasks by priority (high -> medium -> low)
    // sort tasks by deadline (earliest -> latest)
    const priorityOrder = ['high', 'medium', 'low'];
    const sortedTasks = Object.values(tasks).sort((a, b) => {
      if (a.priority !== b.priority) {
        return (
          priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
        );
      }
      return a.deadline.localeCompare(b.deadline);
    });
    return sortedTasks;
  }, [tasks]);

  const addTaskComponent = useMemo(() => {
    if (isAddingTask || currentTask) {
      return (
        <AddTask
          task={currentTask}
          setCurrentTask={setCurrentTask}
          onClose={() => setIsAddingTask(false)}
        />
      );
    }
  }, [isAddingTask, currentTask]);

  const handleAddTask = () => {
    setCurrentTask(null);
    setIsAddingTask(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>To-do list</Text>
      {addTaskComponent}
      <View style={styles.taskList}>
        <FlatList
          data={taskList}
          renderItem={({item}) => (
            <TaskItem task={item} setCurrentTask={setCurrentTask} />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
      </View>
      <TouchableOpacity
        style={styles.addTaskButton}
        onPress={() => handleAddTask()}>
        <Text style={styles.addTaskButtonText}>Tạo task mới +</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    alignSelf: 'center',
    marginBottom: 10,
  },
  taskList: {
    flex: 1,
  },
  addTaskButton: {
    backgroundColor: COLORS.button,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addTaskButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
