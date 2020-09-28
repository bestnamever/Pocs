//This is an example code to get Geolocation//
import React from 'react';
//import react in our code.
import {
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
//import all the components we are going to use.
import Geolocation from '@react-native-community/geolocation';

export default class App extends React.Component {
  state = {
    currentLongitude: 'unknown', //Initial Longitude
    currentLatitude: 'unknown', //Initial Latitude
  };
  componentDidMount = () => {
    var that = this;
    //Checking for the permission just after component loaded
    if (Platform.OS === 'ios') {
      this.callLocation(that);
    } else {
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            that.callLocation(that);
          } else {
            // eslint-disable-next-line no-alert
            alert('Permission Denied');
          }
        } catch (err) {
          // eslint-disable-next-line no-alert
          alert('err', err);
          console.warn(err);
        }
      }
      requestLocationPermission();
    }
  };
  // eslint-disable-next-line consistent-this
  callLocation(that) {
    //alert("callLocation Called");
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        that.setState({currentLongitude: currentLongitude});
        //Setting state Longitude to re re-render the Longitude Text
        that.setState({currentLatitude: currentLatitude});
        //Setting state Latitude to re re-render the Longitude Text
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: 'https://png.icons8.com/dusk/100/000000/compass.png'}}
          style={{width: 100, height: 100}}
        />
        <Text style={styles.boldText}>You are Here</Text>
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 16,
          }}>
          Longitude: {this.state.currentLongitude}
        </Text>
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 16,
          }}>
          Latitude: {this.state.currentLatitude}
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    padding: 16,
    backgroundColor: 'white',
  },
  boldText: {
    fontSize: 30,
    color: 'red',
  },
});
