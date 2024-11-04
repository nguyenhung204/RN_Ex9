import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainComponent from '@/components/MainComponent';
import CreateTaskComponents from '@/components/CreateTaskComponents';
import ListComponents from '@/components/ListComponents';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown : false}} initialRouteName="Main">
      <Stack.Screen name="Main" component={MainComponent} />
      <Stack.Screen name="CreateTask" component={CreateTaskComponents} />
      <Stack.Screen name="List" component={ListComponents} />
    </Stack.Navigator>
  );
}