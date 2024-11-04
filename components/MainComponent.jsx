import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

export default function MainComponent({navigation}) {
    return (
        <View style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>
            <View style={{ marginTop: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 100 }}>
                <View>
                    <Text style={styles.text}>MANAGER YOUR </Text>
                    <Text style={styles.text}>TASK</Text>
                </View>

                <View style ={{
                    width :'100%', 
                    justifyContent :'center', 
                    display : 'flex', 
                    alignItems :'center',
                    }}>
                <AntDesign style = {{
                    position: 'absolute',
                    left : 50,
                }} name="mail" size={24} color="black" />
                <TextInput style={{
                    paddingLeft : 40,
                    width: '80%',
                    height: 40,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor:'#9095A0',
                    placeholderTextColor: '#9095A0',
                    position: 'relative',

                }} placeholder="Enter your name" />
                </View>
                <TouchableOpacity 
                onPress={() => navigation.navigate('List')}
                style={{
                    backgroundColor: '#00BDD6',
                    width: '190px',
                    height: '44px',
                    borderRadius: '12px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                >
                    <Text style={{ color: '#FFF', fontSize: '16px', margin: 0 }} >GET STARTED -{'>'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        color: '#8353E2',
        fontSize: '24px',
        fontWeight: 700,
        textAlign: 'center'
    },
})