import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { StackNavigatorRoutesProps } from "../routes/app.routes";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Jahaaj from '../../assets/hawai-jahaj.jpg'
import { heightPercentageToDP } from 'react-native-responsive-screen';

const Details = () => {
  const [user, setUser] = useState<any>()

  useEffect(()=>{
    AsyncStorage.getItem('user')
    .then((response:any)=>{
      setUser(JSON.parse(response))
    })
  },[])
  return (
    <ScrollView style={styles.container}>
      <Image source={Jahaaj} style={styles.headerImage}  resizeMode='contain' />      
      <View style={styles.profileSection}>
        <Text style={styles.profileName}>Hi, {user?user?.username:''}</Text>
        {/* <Text style={styles.profilePhone}>03472547540</Text> */}
      </View>

      <View style={styles.buttonContainer}>
        <ActionButton title="Book Seat" iconName="seat-outline" />
        <ActionButton title="My Booking" iconName="book-outline" />
        <ActionButton title="My Ticket" iconName="ticket-outline" />
        <ActionButton title="Refund" iconName="cash-refund-outline" />
        <ActionButton title="Complain" iconName="account-alert-outline" />
      </View>
    </ScrollView>
  );
};

const ActionButton = ({ title, iconName }:any) => 
{
  const navigation = useNavigation<StackNavigatorRoutesProps>();
  return(
  <TouchableOpacity style={styles.actionButton} onPress={()=>{
    if(title=="Book Seat")
    {
      navigation.navigate('bookings')
    }
  }}>
    <Icon name={iconName?iconName:"chevron-left"} size={24} style={styles.buttonIcon} />
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    width: '100%',
    height:heightPercentageToDP(30), // Adjust height as needed
  },
  profileSection: {
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profilePhone: {
    fontSize: 16,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    elevation: 2, // Shadow for Android
    shadowColor: '#000000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow for iOS
    shadowOpacity: 0.1, // Shadow for iOS
    shadowRadius: 4, // Shadow for iOS
  },
  buttonIcon: {
    width: 40,
    height: 40,
    margin: 5,
  },
  buttonText: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default Details;