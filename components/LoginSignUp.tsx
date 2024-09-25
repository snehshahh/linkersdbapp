import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, Button, ActivityIndicator, Text, Snackbar } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { postRequest } from '@/services/baseService';
import { LoginData, SignUpData } from '@/models/loginData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import { useFonts, Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import { Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Dashboard from './Dashboard';

// Utility function to validate email
const validateEmail = (email :string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const LoginScreen: React.FC = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Load the fonts
  let [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_700Bold,
  });
  // Utility function to validate email

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const loginData: LoginData = { emailOrUsername, password };

      const response = await postRequest<LoginData>('users/login', loginData);

      if (response.headers['Authorization']) {
        const token = response.headers['authorization'].split(' ')[1];
        await AsyncStorage.setItem('userToken', token);
        setSnackbarMessage('Login Success.');
        setSnackbarVisible(true);
      } else {
        setSnackbarMessage('Login failed. Please try again.');
        setSnackbarVisible(true);
      }
    } catch (error) {
      setSnackbarMessage('An error occurred. Please try again.');
      setSnackbarVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      if (password !== confirmPassword) {
        setSnackbarMessage('Passwords do not match.');
        setSnackbarVisible(true);
        return;
      }

      if (!validateEmail(email)) {
        setSnackbarMessage('Please enter a valid email.');
        setSnackbarVisible(true);
        return;
      }

      const signupData: SignUpData = { userName, email, password };

      const response = await postRequest<SignUpData>('users/register', signupData);

      if (response.headers['Authorization']) {
        const token = response.headers['authorization'].split(' ')[1];
        await AsyncStorage.setItem('userToken', token);
        setSnackbarMessage('Signup Sucess.Login Again.');
        setSnackbarVisible(true);
        setIsLogin(true);
        // navigation.navigate('Dashboard');
      } else {
        setSnackbarMessage('Signup failed. Please try again.');
        setSnackbarVisible(true);
      }
    } catch (error) {
      setSnackbarMessage('An error occurred. Please try again.');
      setSnackbarVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLoginSignup = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsLogin(!isLogin);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          {isLoading && <ActivityIndicator size="large" animating={true} color="#000" />}

          <Image source={require('../assets/images/LinkersDBlogo.png')} style={styles.logo} />
          <Text style={styles.header}>{isLogin ? 'Login' : 'Signup'}</Text>

          <Animated.View style={{ opacity: fadeAnim }}>
            {isLogin ? (
              <TextInput
                label="Email or Username"
                value={emailOrUsername}
                onChangeText={setEmailOrUsername}
                style={styles.input}
              />
            ) : (
              <>
                <TextInput
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                />
                <TextInput
                  label="Username"
                  value={userName}
                  onChangeText={setUsername}
                  style={styles.input}
                />
              </>
            )}

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              style={styles.input}
            />
            {!isLogin && (
              <TextInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
                style={styles.input}
              />
            )}
          </Animated.View>

          <Button mode="contained" onPress={isLogin ? handleLogin : handleSignup} style={styles.button}>
            {isLogin ? 'Login' : 'Signup'}
          </Button>

          <Button mode="outlined" onPress={() => console.log('Google Login')} style={styles.googleButton}>
            <FontAwesome name="google" size={20} color="black" />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </Button>

          <TouchableOpacity onPress={toggleLoginSignup} style={styles.toggleLink}>
            <Text style={styles.linkText}>{!isLogin ? 'Already a user? Login' : 'Sign Up Here'}</Text>
          </TouchableOpacity>

          <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)}>
            {snackbarMessage}
          </Snackbar>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  googleIcon: {
    marginRight: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  logo: {
    height: 200,
    width: 260,
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Quicksand_700Bold', // Apply Quicksand font
    color: 'black', // Set header text color to black
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'white',
    fontFamily: 'Quicksand_400Regular', // Apply Quicksand font
  },
  button: {
    marginVertical: 10,
    backgroundColor: 'black', // Strictly black button
    color: 'black',
  },
  toggleButton: {
    marginTop: 10,
  },
  googleButton: {
    marginTop: 10,
    borderColor: 'black', // Set border color to black for the Google button
  },
  toggleLink: {
    marginTop: 10,
    alignItems: 'center',
  },
  linkText: {
    color: 'black', // Set link text color to black
    fontFamily: 'Quicksand_400Regular', // Apply Quicksand font
    fontSize: 20,
    marginTop: 7,
  },
  googleButtonText: {
    color: 'black', // Set text color for Google button
    marginLeft: 20, // Space between icon and text
  },
});


export default LoginScreen;
