/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  MapView,
  Text,
  Image,
  View,
  TouchableHighlight
} from 'react-native';
import Api from './src/api.js';

class weather extends Component {

  constructor(props) {
     super(props);
     this.state = {
       pin:{
         latitude: 0,
         longitude: 0
       },
       mapRegion: null,
       city: '',
       temperature: '',
       description: ''
     };
  }

  render() {
    console.log('render');
    console.log('state',this.state.pin);
    console.log('mapRegion',this.state.mapRegion);
    return (
      <View style={styles.container}>
        <MapView
          region={this.state.mapRegion}
          annotations={[this.state.pin]}
          style={styles.map}
          onRegionChangeComplete={this.onRegionChangeComplete}
        >
        </MapView>
        <Image source={require('./img/flowers.png')} style={[styles.imageContainer]} >
          <View style={styles.buttonWrapper}>
            <TouchableHighlight style={styles.touchable}

              onPress={this._handleStartPress}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>
                  User Current Location
                </Text>
              </View>
            </TouchableHighlight>
          </View>

          <View style={styles.textWrapper}>
            <Text style={styles.text}>{this.state.city}</Text>
            <Text style={styles.text}>{this.state.temperature}</Text>
            <Text style={styles.text}>{this.state.description}</Text>
          </View>
        </Image>
      </View>
    );
  }

  _handleStartPress = () => {
    console.log('pressed@');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('here');
        let mapRegion = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          longitudeDelta: 5,
          latitudeDelta: 5
        };

        this.setState({
          pin: {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          },
          mapRegion: mapRegion
        });
      },
      (error) => {console.log('error here'); console.log(this.state.pin);alert(error.message)},
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.setState({
      pin: {
        longitude: 0,
        latitude: 0
      },
    });
  }

  onRegionChangeComplete = (region) => {
    console.log('onRegionChangeComplete');
    console.log('region',region.longitude,region.latitude);
    // let mapRegion = region;
    // mapRegion.longitudeDelta = 5;
    // mapRegion.latitudeDelta = 5;
    //
    // this.setState({
    //   pin: {
    //     longitude: region.longitude,
    //     latitude: region.latitude
    //   },
    //   mapRegion: mapRegion
    // });

    Api(region.latitude, region.longitude)
      .then((data) => {
        this.setState(data);
      })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  map: {
    flex: 2,
    marginTop: 30
  },
  imageContainer: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'rgba(0,0,0,0)',
    resizeMode: 'cover'
  },
  buttonWrapper: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  touchable: {
    borderRadius: 50
  },
  button: {
    backgroundColor: '#000000',
    opacity: 0.5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50
  },
  textWrapper: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    opacity: 0.3,
  },
  text: {
    fontSize: 20,
    color: 'white'
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white'
  }
});

AppRegistry.registerComponent('weather', () => weather);
