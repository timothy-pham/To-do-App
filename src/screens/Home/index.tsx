import React, {useState} from 'react';
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>To-do list</Text>
      {isAddingTask && (
        <AddTask task={currentTask} onClose={() => setIsAddingTask(false)} />
      )}
      <View style={styles.taskList}>
        <FlatList
          data={Object.values(tasks)}
          renderItem={({item}) => <TaskItem {...item} />}
          keyExtractor={item => item.id}
        />
      </View>
      <TouchableOpacity
        style={styles.addTaskButton}
        onPress={() => setIsAddingTask(true)}>
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
