import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@/components/LoginSignUp';
import Dashboard from '@/components/Dashboard'; // Import your Dashboard component

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="Dashboard" // Add Dashboard as a screen
          component={Dashboard}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
