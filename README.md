# weather

 * The use of fetch and MapView
   * MapView has a props called region, and it accepts a value like [longitude, latitude, longitudeDelta, latitudeDelta], where the first 2 parameters determine the center, and the last 2 parameters determine the scale and boundary
   ```javascript
   ...

   <MapView
     region={this.state.mapRegion}
     annotations={[this.state.pin]}
     style={styles.map}
     onRegionChangeComplete={this.onRegionChangeComplete}
   >
   </MapView>

   ...

   // MapView regionChangeComplete event handler
   onRegionChangeComplete = (region) => {
     let mapRegion = region;
     mapRegion.longitudeDelta = 5;
     mapRegion.latitudeDelta = 5;

     this.setState({
       pin: {
         longitude: region.longitude,
         latitude: region.latitude
       },
       mapRegion: mapRegion
     });

     Api(region.latitude, region.longitude)
       .then((data) => {
         this.setState(data);
       })
   }

   // 'User Current Position' button press event handler
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
   ```
 * [How to use image as background](http://reactcafe.com/how-to-set-a-full-screen-background-image-in-react-native/)
   * can use any types of images (.jpg .png)
   * put them in anywhere, and require them as js files
   * reset image to accommodate the actual real property by `{width: null, height: null}`
   * set backgroundColor to transparent `backgroundColor: 'rgba(0,0,0,0)'`

   ```javascript

   <Image source={require('./img/flowers.png')} style={[styles.imageContainer]} >
     <Text style={styles.text}>{this.state.city}</Text>
     <Text style={styles.text}>{this.state.temperature}</Text>
     <Text style={styles.text}>{this.state.description}</Text>
   </Image>


   const styles = StyleSheet.create({
     ...
     imageContainer: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       width: null,
       height: null,
       backgroundColor: 'rgba(0,0,0,0)',
       resizeMode: 'cover'
     },
     ...
   });
   ```
* How to set opacity
```javascript
textWrapper: {
  flex: 3,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#000000',
  opacity: 0.3,
}
```
