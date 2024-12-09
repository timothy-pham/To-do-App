import React, {useMemo, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {COLORS} from '~constants/styles';
import {useSelector} from 'react-redux';
import {RootState} from '~redux';
import TaskItem from './TaskItem';
import {SafeAreaView} from 'react-native-safe-area-context';
import AddTask from './AddTask';
import {Task} from '~types';

const Home = () => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isAddingTask, setIsAddingTask] = useState(false);

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
          data={Object.values(tasks)}
          renderItem={({item}) => (
            <TaskItem task={item} setCurrentTask={setCurrentTask} />
          )}
          keyExtractor={item => item.id}
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
