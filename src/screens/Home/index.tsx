import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ViewToken,
} from 'react-native';
import {COLORS} from '~constants/styles';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '~redux';
import TaskItem from './TaskItem';
import {SafeAreaView} from 'react-native-safe-area-context';
import AddTask from './AddTask';
import {Task} from '~types';
import {getData} from '~libs/async/storage';
import {addTask, syncTasks} from '~redux/slices/task';
import uuid from 'react-native-uuid';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
const Home = () => {
  const viewableItems = useSharedValue<ViewToken[]>([]);
  const dispatch = useAppDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const animationValue = useSharedValue(1);

  const syncTaskFromStorage = async () => {
    try {
      const tasksData = await getData('tasks');
      if (tasksData) {
        dispatch(syncTasks(tasksData));
      }
    } catch (error) {}
  };

  useEffect(() => {
    syncTaskFromStorage();
    return () => {};
  }, []);

  const onCloseHandle = () => {
    animationValue.value = withTiming(0, {duration: 300}, () => {
      runOnJS(setIsAddingTask)(false);
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: animationValue.value,
    transform: [{scale: animationValue.value}],
  }));

  const addTaskComponent = useMemo(() => {
    if (isAddingTask || currentTask) {
      return (
        <Animated.View style={[animatedStyle]}>
          <AddTask
            task={currentTask}
            setCurrentTask={setCurrentTask}
            onClose={() => onCloseHandle()}
          />
        </Animated.View>
      );
    }
  }, [isAddingTask, currentTask]);

  const handeEditTask = (task: Task) => {
    setCurrentTask(task);
    setIsAddingTask(true);
    animationValue.value = withTiming(1);
  };

  const handleAddTask = () => {
    // // TESTING
    // // random 1 - 3 to get priority
    // const random = Math.floor(Math.random() * 3) + 1;
    // const newTask: Task = {
    //   id: uuid.v4(),
    //   title: 'TESET',
    //   deadline: '01/01/2025',
    //   completed: false,
    //   priority: random === 1 ? 'high' : random === 2 ? 'medium' : 'low',
    // };
    // dispatch(addTask(newTask));

    setCurrentTask(null);
    setIsAddingTask(true);
    animationValue.value = withTiming(1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>To-do list</Text>
      {addTaskComponent}
      <View style={styles.taskList}>
        <FlatList
          data={Object.values(tasks)}
          renderItem={({item}) => (
            <TaskItem
              viewableItems={viewableItems}
              task={item}
              setCurrentTask={handeEditTask}
            />
          )}
          keyExtractor={item => item.id}
          onViewableItemsChanged={({viewableItems: items}) => {
            viewableItems.value = items;
          }}
          showsVerticalScrollIndicator={false}
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          windowSize={20}
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
