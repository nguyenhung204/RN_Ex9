import { View, Text, FlatList, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { deleteTaskSelector, fetchTasksSelector, tasksState, updateTaskSelector } from '@/utilRecoil/tasksState';



export default function ListComponents({ navigation }) {
    const [tasks, setTasks] = useRecoilState(tasksState);
    const fetchTasks = useRecoilValue(fetchTasksSelector);
    const setUpdateTask = useSetRecoilState(updateTaskSelector());
    const setDeleteTask = useSetRecoilState(deleteTaskSelector());
    const [editingTask, setEditingTask] = useState(null);
    const [taskName, setTaskName] = useState('');

    useEffect(() => {
      setTasks(fetchTasks);
    }, [fetchTasks]);
  
    const handleEdit = (task) => {
      setEditingTask(task.id);
      setTaskName(task.task);
    };
  
    const handleSave = (task) => {
      setUpdateTask(task);
      setUpdateTask({ ...task, task: taskName });
      setEditingTask(null);
      setTaskName('');
    };
  
    const handleDelete = (taskId) => {
      setDeleteTask(taskId);
    };


    return (
        <View style={{ flex: 1, width: '100%', padding: 20, gap: 40 }}>
            <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }} >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons style={{ width: 'auto' }} name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5
                }}>
                    <Image style={{ width: 50, height: 50, borderRadius: 50 }}
                        source={require('../assets/images/22666271.jpg')} />
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: '20px', lineHeight: '30px', fontWeight: 700, color: '#171A1F' }}>Hi, John</Text>
                        <Text style={{ fontSize: '14px', lineHeight: '22px', color: '#666', fontWeight: '700' }}>Have agrate day a head</Text>
                    </View>
                </View>
            </View>

            <View>
                <TextInput style={{
                    paddingLeft: 40,
                    width: '100%',
                    height: 40,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: '#9095A0',
                    position: 'relative',
                }} placeholder="Search" />
                <FontAwesome style={{
                    position: 'absolute',
                    left: 10,
                    top: 5,
                }} name="search" size={24} color="black" />
            </View>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
            }}>

                <FlatList
                    style={{ flex: 1 }}
                    refreshing={true}
                    scrollEnabled={true}
                    data={tasks}
                    renderItem={({ item }) => (
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            paddingLeft: 60,
                            paddingRight: 20,
                            height: '60px',
                            backgroundColor: '#DEE1E678',
                            borderRadius: '24px',
                            shadowColor: '#171A1F26',
                            shadowOffset: { width: 0, height: 8 },
                            shadowOpacity: 0.5,
                            shadowRadius: 10,
                            position: 'relative',
                            alignItems: 'center',
                            marginBottom: 20
                        }}>
                            <TouchableOpacity style={{ width: 30, height: 30, borderRadius: 50, position: 'absolute', left: 20, zIndex: 2 }} onPress={() => handleDelete(item.id)}>
                                <Image
                                    source={require('../assets/images/checkbox.svg')} />
                            </TouchableOpacity>

                            {editingTask === item.id ? (
                                <TextInput
                                    value={taskName}
                                    onChangeText={setTaskName}
                                    onBlur={() => handleSave(item)}
                                    style={{ flex: 1, borderBottomWidth: 1, borderColor: '#9095A0' }}
                                />
                            ) : (
                                <Text style={{ flex: 1 }}>{item.task}</Text>
                            )}

                            <TouchableOpacity style={{ width: 30, height: 30, borderRadius: 50, position: 'absolute', right: 20 }} onPress={() => handleEdit(item)}>
                                <Image
                                    source={require('../assets/images/pen.svg')} />
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
                />

            </View>
            <View style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('CreateTask')}
                    style={{
                        width: '69px',
                        height: '69px',
                        borderRadius: '50%',
                        backgroundColor: '#00BDD6',
                        color: '#FFF',
                        fontSize: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <AntDesign name="plus" size={35} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}