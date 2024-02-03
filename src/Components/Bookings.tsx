import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Jahaaj from "../../assets/hawai-jahaj.jpg";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import DropDown from "react-native-paper-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "react-native-paper";
import { getFlightBookings } from "../api/api";
import { flightsData } from "../api/Data";
import { formatDate } from "../utils/utils";
import { StackNavigatorRoutesProps } from "../routes/app.routes";
import { useNavigation } from "@react-navigation/native";

export default function Bookings() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [departure, setDeparture] = useState<any>();
  const [destination, setDestination] = useState<any>();
  const [showDropDown2, setShowDropDown2] = useState(false);
  const [flights, setFlights] = useState<any>(flightsData?.data?.result);
  const [flightData, setFlightData] = useState<any>();
  const [date, setDate] = useState<any>(null);
  const navigation = useNavigation<any>();

  const destinations = [
    {
      label: "Delhi",
      value: "Delhi",
    },
    {
      label: "Mumbai",
      value: "Mumbai",
    },
    {
      label: "Chennai",
      value: "Chennai",
    },
    {
      label: "Kolkata",
      value: "Kolkata",
    },
    {
      label: "Bangalore",
      value: "Bangalore",
    },
  ];
  const departures = [
    {
      label: "Delhi",
      value: "Delhi",
    },
    {
      label: "Mumbai",
      value: "Mumbai",
    },
    {
      label: "Chennai",
      value: "Chennai",
    },
    {
      label: "Kolkata",
      value: "Kolkata",
    },
    {
      label: "Bangalore",
      value: "Bangalore",
    },
  ];

  const Dates = [
    "31-03-2023",
    "30-03-2023",
    "29-03-2023",
    "28-03-2023",
    "27-03-2023",
  ];

  useEffect(() => {
    //console.log(flightsData)
    getFlightBookings().then((response: any) => {
      //console.log('resp',response?.data?.result)
      setFlights(response?.data?.result);
    });
  }, []);
  //   useEffect(()=>{
  //     //console.log(flightsData)

  //     //console.log(filter)
  // filterData()
  //   },[date])
  const filterData = () => {
    if (departure && destination && date) {
      const filter = flightsData?.data?.result?.filter((item: any) => {
        const inputDateTime = new Date(item?.displayData?.source?.depTime);
        const formattedDate = `${inputDateTime
          .getDate()
          .toString()
          .padStart(2, "0")}-${(inputDateTime.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${inputDateTime.getFullYear()}`;
        return (
          formattedDate == date &&
          item?.displayData?.source?.airport?.cityName == departure &&
          item?.displayData?.destination?.airport?.cityName == destination
        );
      });
      // console.log('filter date',filter)
      setFlights(filter);
    } else if (date && !departure && !destination) {
      const filter = flightsData?.data?.result?.filter((item: any) => {
        const inputDateTime = new Date(item?.displayData?.source?.depTime);
        const formattedDate = `${inputDateTime
          .getDate()
          .toString()
          .padStart(2, "0")}-${(inputDateTime.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${inputDateTime.getFullYear()}`;
        return formattedDate == date;
      });
      //console.log('filter date',filter)
      setFlights(filter);
    } else if (!date && departure && destination) {
      const filter = flightsData?.data?.result?.filter((item: any) => {
        return (
          item?.displayData?.source?.airport?.cityName == departure &&
          item?.displayData?.destination?.airport?.cityName == destination
        );
      });
      //console.log('filter date',filter)
      setFlights(filter);
    } else if (!destination && !departure && !date) {
      setFlights(flightsData?.data?.result);
    }
  };

  const styles = StyleSheet.create({
    headerContainer: {
      marginVertical: hp(1),
      gap: hp(2),
    },
    logoContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: wp(100),
      marginVertical: hp(1),
    },
    logo: {
      width: 60,
      height: 60,
      borderRadius: 60 / 2,
    },
    destinationContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
    destinationTitle: {
      fontSize: 14,
      fontWeight: "600",
    },
    destination: {
      fontSize: 16,
      fontWeight: "400",
    },
    dash: {
      width: hp(10),
      height: hp(1),
      backgroundColor: "black",
    },
    dropdownContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },
    date: {
      fontSize: 16,
      fontWeight: "500",
    },
    scrollDatesContainer: {
      display: "flex",
      flexDirection: "row",
      gap: wp(4),
      alignItems: "center",
      marginTop: hp(0),
    },
    scrollStyle: {
      width: wp(40),
    },
    scrollContentStyle: {
      display: "flex",
      flexDirection: "row",
      gap: wp(4),
      paddingHorizontal: wp(2),
    },

    dates: {
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 12,
      paddingHorizontal: wp(2),
      paddingVertical: hp(1),
    },
    dateText: {
      fontSize: 18,
      fontWeight: "400",
    },

    icon: {
      width: 40,
      height: 40,
      borderRadius: 40 / 2,
    },
  });
  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image source={Jahaaj} style={styles.logo} resizeMode="contain" />
        </View>

        <View style={styles.destinationContainer}>
          <View>
            {/* departure */}
            <Text style={styles.destinationTitle}>
              {departure ? departure : "Delhi"}
            </Text>
            <Text style={styles.destination}>Departure</Text>
          </View>
          <View>
            {/* dash */}
            <View style={styles.dash} />
          </View>
          <View>
            {/* Destination */}
            <Text style={styles.destinationTitle}>
              {destination ? destination : "Mumbai"}
            </Text>
            <Text style={styles.destination}>Destination</Text>
          </View>
        </View>
        <View style={styles.dropdownContainer}>
          <DropDown
            label={"Departure"}
            mode={"outlined"}
            inputProps={{
              style: {
                backgroundColor: "white",
              },
            }}
            visible={showDropDown}
            dropDownStyle={{
              backgroundColor: "white",
            }}
            dropDownItemTextStyle={{
              color: "black",
              backgroundColor: "white",
            }}
            dropDownItemSelectedStyle={{
              backgroundColor: "white",
            }}
            dropDownItemStyle={{
              backgroundColor: "white",
            }}
            dropDownItemSelectedTextStyle={{
              backgroundColor: "white",
            }}
            showDropDown={() => {
              setShowDropDown(true);
            }}
            onDismiss={() => setShowDropDown(false)}
            value={departure ? departure : ""}
            setValue={setDeparture}
            list={departures}
          />
          <View>
            <Text style={styles.date}>{date ? date : "5-2-2024"}</Text>
          </View>

          <DropDown
            label={"Destination"}
            dropDownStyle={{
              backgroundColor: "white",
            }}
            dropDownItemTextStyle={{
              color: "black",
              backgroundColor: "white",
            }}
            dropDownItemSelectedStyle={{
              backgroundColor: "white",
            }}
            dropDownItemStyle={{
              backgroundColor: "white",
            }}
            dropDownItemSelectedTextStyle={{
              backgroundColor: "white",
            }}
            inputProps={{
              style: {
                backgroundColor: "white",
              },
            }}
            // theme={{

            // }}
            mode={"outlined"}
            visible={showDropDown2}
            showDropDown={() => setShowDropDown2(true)}
            onDismiss={() => setShowDropDown2(false)}
            value={destination ? destination : ""}
            setValue={setDestination}
            list={destinations}
          />
        </View>
        <View style={styles.scrollDatesContainer}>
          <Icon name="chevron-left" size={24} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollStyle}
            contentContainerStyle={styles.scrollContentStyle}
          >
            {Dates.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    console.log(date);
                    setDate(item);
                  }}
                >
                  <View
                    key={index}
                    style={[
                      styles.dates,
                      {
                        backgroundColor: date == item ? "#e6ffe6" : "white",
                      },
                    ]}
                  >
                    <Text style={styles.dateText}>{item}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>

      <View
        style={{
          marginTop: hp(1),
          marginHorizontal: wp(2),
          flexDirection: "row",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "flex-end",
          gap: 5,
          // width:wp(96)
        }}
      >
        <Button
          mode="elevated"
          style={{
            width: wp(25),
            height: hp(5),
            borderRadius: 12,
            backgroundColor: "white",
          }}
          onPress={() => {
            filterData();
          }}
        >
          <Text>filter</Text>
        </Button>

        <Button
          mode="elevated"
          style={{
            width: wp(25),
            height: hp(5),
            borderRadius: 12,
            backgroundColor: "white",
          }}
          onPress={() => {
            setDate(null);
            setDestination(undefined);
            setDeparture(undefined);
            filterData();
            // getFlightBookings()
            // .then((response:any)=>{
            //   console.log('resp',response?.data?.result)
            //   setFlights(response?.data?.result)
            // })
          }}
        >
          <Text>reset</Text>
        </Button>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: hp(2),
          height: hp(40),
          paddingBottom: hp(4),
        }}
        contentContainerStyle={{
          gap: hp(2),
        }}
      >
        {flights?.map((item: any, index: number) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                width: wp(96),
                paddingHorizontal: wp(4),
                paddingVertical: hp(1),
                borderWidth: 1,
                borderRadius: 10,
                marginHorizontal: wp(2),
                elevation: 1,
                shadowColor: "white",
                backgroundColor:
                  flightData?.id == index ? "#e6ffe6" : "transparent",
              }}
              onPress={() => {
                if (flightData?.id == index) {
                  setFlightData(undefined);
                } else {
                  setFlightData({ ...item, id: index });
                }
              }}
            >
              {/* type of bus and rent */}
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text style={styles.destinationTitle}>
                  {item?.displayData?.source?.airport?.airportName}
                </Text>
                <Text style={styles.destinationTitle}>{item?.fare}</Text>
              </View>

              {/* desti.. and depart.. */}
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  flexDirection: "row",
                  paddingHorizontal: wp(8),
                }}
              >
                <Text style={[styles.destination, { textAlign: "right" }]}>
                  {item?.displayData?.source?.airport?.cityName}
                </Text>
                <View
                  style={[
                    styles.logoContainer,
                    {
                      marginVertical: 0,
                    },
                  ]}
                >
                  <Image
                    source={Jahaaj}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                </View>
                <Text
                  style={[
                    styles.destination,
                    {
                      textAlign: "left",
                    },
                  ]}
                >
                  {item?.displayData?.destination?.airport?.cityName}
                </Text>
              </View>

              {/* timings */}
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text>{formatDate(item?.displayData?.source?.depTime)}</Text>
                <Text>
                  {formatDate(item?.displayData?.destination?.arrTime)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View
        style={{
          marginBottom: hp(1),
          marginHorizontal: wp(2),
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          // width:wp(96)
        }}
      >
        <Button
          // mode='elevated'
          disabled={flightData?.id != undefined ? false : true}
          style={{
            width: wp(96),
            height: hp(5),
            borderRadius: 12,

            backgroundColor:
              flightData?.id != undefined ? "#ADD8E6" : "transparent",
          }}
          onPress={() => {
            const params = {
              flightData,
              date,
            };
            navigation.navigate("selectSeat", params);
            // getFlightBookings()
            // .then((response:any)=>{
            //   console.log('resp',response?.data?.result)
            //   setFlights(response?.data?.result)
            // })
          }}
        >
          <Text>Next</Text>
        </Button>
      </View>
    </View>
  );
}
