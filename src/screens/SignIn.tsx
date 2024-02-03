import React, { useContext, useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import Jahaaj from '../../assets/hawai-jahaj.jpg'
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

  

const signIn = () => {
  const { signIn } = useContext(AuthContext);
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    logoContainer: {
      marginBottom: 20,
      // You might want to add your logo image here
    },
    logoText: {
      // If you are using a text logo, define the styles here
    },
    input: {
      width: '80%',
      height: 50,
      backgroundColor: '#FAB1A0', // Example pink background color
      borderRadius: 25,
      paddingHorizontal: 20,
      fontSize: 16,
      color: 'black',
      marginVertical: 10,
    },
    forgotPasswordText: {
      color: 'black',
      fontSize: 16,
    },
    loginButton: {
      width: '80%',
      height: 50,
      backgroundColor: '#E84393', // Example pink button color
      borderRadius: 25,
      justifyContent: 'center',
      marginTop: 20,
    },
    loginButtonText: {
      color: 'white',
      fontSize: 20,
      textAlign: 'center',
    },
    logo : {
      width: 60,
      height: 60,
      borderRadius: 60/2
  },
  });

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Jahaaj} style={styles.logo} resizeMode='contain' />
        <Text style={styles.logoText}>JetSetGo</Text>
      </View>
      <TextInput
        placeholder="Email."
        style={styles.input}
        value={username}
        onChangeText={(e)=>{
          setUsername(e)
        }}
      />
      <TextInput
        placeholder="Password."
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={(e)=>{
          setPassword(e)
        }}
      />
      <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      <TouchableOpacity style={styles.loginButton} onPress={()=>{
        signIn()
        AsyncStorage.setItem("user",JSON.stringify({
          username,
          password
        }))

      }}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};



export default signIn;