import { View, Text } from 'react-native'
import React, { useState } from 'react'
import SeatsLayout from '@mindinventory/react-native-bus-seat-layout';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import seat from '../../assets/seat.png'
import { StackNavigatorRoutesProps } from "../routes/app.routes";
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

const SelectSeat = ({route}:any) => {
    const [seats, setSeats] = useState<any>()
    const params = route.params
    console.log(params)
    const flightData = route?.params?.flightData?.displayData
    const navigation = useNavigation<any>();
  return (
    <View>
        <View
        style={{
            height:hp(80)
        }}
        >
      <SeatsLayout
      
  row={14}
  layout={{ columnOne: 3, columnTwo: 2 }}
  selectedSeats={[
    { seatNumber: 1, seatType: 'booked' },
    { seatNumber: 11, seatType: 'women' },
    { seatNumber: 17, seatType: 'women' },
    { seatNumber: 43, seatType: 'blocked' },
  ]}
  numberTextStyle={{ fontSize: 12 }}
  seatImage={{ image:seat, tintColor: '#B2B2B2' }}
  getBookedSeats={(seats) => {
    console.log('getBookedSeats :: ', seats);
    setSeats(seats)
  }}
/>
</View>
<View
style={{
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
}}
>
<Button
      mode='elevated'
     //={flightData?.id!=undefined?false:true}
       style={{
        width:wp(96),
        // height: hp(15),
        borderRadius:12,
        marginTop:10,
        backgroundColor:seats?.length>0?"#ADD8E6":'white'
      }}
      onPress={()=>{
        const params ={
          seats:seats,
          flightData,
          fare:route?.params?.flightData?.fare
        }
        navigation.navigate('bookingConfirmed',params)
        // getFlightBookings()
        // .then((response:any)=>{
        //   console.log('resp',response?.data?.result)
        //   setFlights(response?.data?.result)
        // })
      }}
      >
        <Text>Confirm Booking</Text>
      </Button>
      </View>
    </View>
  )
}

export default SelectSeat