import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Icon} from '@rneui/themed';
import {COLORS} from '~constants/styles';
import {PRIORITY} from '~constants/task';
import {useSelector} from 'react-redux';
import {RootState} from '~redux';
import TaskItem from './TaskItem';
import {SafeAreaView} from 'react-native-safe-area-context';
import AddTask from './AddTask';

const Home = () => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const addTask = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>To-do list</Text>
      <AddTask />
      <View style={styles.taskList}>
        <FlatList
          data={Object.values(tasks)}
          renderItem={({item}) => <TaskItem {...item} />}
          keyExtractor={item => item.id}
        />
      </View>
      <TouchableOpacity style={styles.addTaskButton} onPress={addTask}>
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
