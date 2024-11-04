import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { createTaskSelector } from '@/utilRecoil/tasksState';
import { useSetRecoilState } from 'recoil';

export default function CreateTaskComponents({navigation}) {
    const [task, setTask] = useState('');
    const createTask = useSetRecoilState(createTaskSelector(task));
  
    const handleAddTask = () => {
      if (task.trim() === '') {
        return;
      }
  
      const newTask = { task: task };
      createTask(newTask);
      navigation.navigate('List');
    };

  return (
    <View style={{ flex: 1, width: '100%', padding: 20, gap: 80}}>
              <View style={{ width : '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }} >
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5
                }}>
                    <Image style={{ width: 50, height: 50, borderRadius: 50 }}
                        source={require('../assets/images/22666271.jpg')} />
                    <View style = {{alignItems :'center'}} >
                        <Text style={{ fontSize: '20px', lineHeight: '30px', fontWeight: 700, color: '#171A1F' }}>Hi, John</Text>
                        <Text style={{ fontSize: '14px', lineHeight: '22px', color: '#666', fontWeight: '700' }}>Have agrate day a head</Text>
                    </View>
                </View>
                <TouchableOpacity 
                onPress={() => navigation.goBack()}
                >
                    <Ionicons style={{ width: 'auto' }} name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>

                <View style = {{
                    gap : 40,
                }}>
                <Text style = {{
                    fontSize : '32px', 
                    fontWeight : '700',
                    lineHeight : '48px',
                    textAlign : 'center',
                     }}>ADD YOUR JOBS</Text>
                <View>
                <TextInput 
                value={task}
                onChangeText={setTask}
                style={{
                    paddingLeft: 40,
                    width: '100%',
                    height: 50,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: '#9095A0',
                    position: 'relative',
                    backgroundColor: '#F5F5F5',
                }} placeholder="Input your jobs" />
                <FontAwesome5 style = {{
                    position: 'absolute',
                    left: 10,
                    top: 10,
                }}
                 name="clipboard-list" size={24} color="green" />
            </View>
            </View>
          

            <View style = {{alignItems : 'center'}}>
            <TouchableOpacity
                onPress={handleAddTask}
             style={{
                    backgroundColor: '#00BDD6',
                    width: '190px',
                    height: '44px',
                    borderRadius: '12px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{ color: '#FFF', fontSize: '16px', margin: 0 }} >FINISH -{'>'}</Text>
                </TouchableOpacity>
            </View>
             
            <View style = {{alignItems:'center'}}>
                <Image source={ require('../assets/images/note.png')}/>
            </View>
    </View>
  )
}