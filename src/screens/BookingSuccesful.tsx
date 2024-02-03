import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Clipboard, TouchableOpacity } from 'react-native';
import { formatDate } from '../utils/utils';

const BookingConfirmation = ({ route}:any) => {
    const [user, setUser] = useState<any>(undefined);
    const params = route.params
    const seats = params.seats
    console.log(params?.flightData?.source?.depTime)
    console.log(params)
    useEffect(()=>{
      AsyncStorage.getItem('user')
      .then((response:any)=>{
        if(response)
        {
          setUser(JSON.parse(response))
        }else{
          setUser(false)
        }
      })
    },[])
  const copyToClipboard = () => {
    // Clipboard.setString(bookingReference);
    // You may also want to provide feedback to the user that the text has been copied.
    alert('copied')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Booking confirmed</Text>
      <Text style={styles.subHeaderText}>Thank you for booking with JetSetGo.</Text>
      <View style={styles.bookingContainer}>
      <Text style={styles.bookingText}>Fare</Text>
      <Text style={styles.bookingText}>{seats?.length>1?(params?.fare*seats?.length) :params?.fare}</Text>
        <Text style={styles.bookingText}>Booking reference</Text>
        <TouchableOpacity onPress={copyToClipboard}>
          <Text style={styles.bookingReference}>{user?user?.username:''}</Text>
        </TouchableOpacity>
        <Text style={styles.passengerText}>Passengers</Text>
        <Text style={styles.passengerName}>{user?user?.username:''}</Text>
        <Text style={styles.passengerText}>seats</Text>
           {
          seats&&seats?.map((item:any)=>{
            return(
              <Text style={styles.passengerText}>{item?.seatNo}</Text>
            
            )
          })
        }
        

        <View 
        style={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'space-between',
          gap:40
        }}
        >
        <View>
        <Text style={styles.passengerText}>Departure Airport</Text>
        <Text style={styles.passengerText}>{params?.flightData?.source?.airport?.airportName} </Text>
        <Text style={styles.passengerText}>Departure Time</Text>
        <Text style={styles.passengerText}>{formatDate(params?.flightData?.source?.depTime)}</Text>
        </View>
        <View>
        <Text style={styles.passengerText}>Arrival Airport</Text>
        <Text style={styles.passengerText}>{params?.flightData?.destination?.airport?.airportName} </Text>
        <Text style={styles.passengerText}>Arrival Time</Text>
        <Text style={styles.passengerText}>{formatDate(params?.flightData?.destination?.arrTime)}</Text>
        </View>
        </View>
        {/* <Text style={styles.passengerName}>{params?.seats?params?.seats:''}</Text> */}
        <View style={styles.separator} />
        <Text style={styles.footerText}>You’ll need these details to manage your booking.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 16,
    marginBottom: 20,
  },
  bookingContainer: {
    padding: 20,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
  },
  bookingText: {
    fontSize: 16,
    fontWeight: '500',
  },
  bookingReference: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  passengerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  passengerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  separator: {
    borderBottomColor: '#e1e1e1',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  footerText: {
    fontSize: 14,
    marginTop: 10,
  },
});

export default BookingConfirmation;

// Usage example:
// <BookingConfirmation bookingReference="DHSGWN" passengerName="John Smith" />