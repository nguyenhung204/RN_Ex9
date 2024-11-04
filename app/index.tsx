import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/NavigationContainer';
import { RecoilRoot } from 'recoil';


export default function Index() {
  return (
    <RecoilRoot>
      <NavigationContainer independent={true}>
        <AppNavigator />
      </NavigationContainer>
    </RecoilRoot>
  );
}


