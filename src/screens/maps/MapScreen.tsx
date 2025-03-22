import { View, Text } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import { appInfo } from '~constants/appInfos'

const MapScreen = () => {
  return (
    <MapView
      style={{ width: appInfo.size.WIDTH, height: appInfo.size.HEIGHT*0.95,marginTop:20 }}
      showsMyLocationButton
      showsUserLocation
      initialRegion={{
        latitude: 37.421998333333335,
        longitude: -122.084,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      region={{
        latitude: 37.421998333333335,
        longitude: -122.084,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      mapType='standard'
    />
  )
}

export default MapScreen