/* eslint-disable react-native/no-inline-styles */
import { PinchZoomView } from '@gpbagga/react-native-pinch-zoom';
import { Image, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <PinchZoomView
        minScale={1}
        // activateOnlyAfterPinch
        resetOn={['doubleTap']}
      >
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/29643306/pexels-photo-29643306.jpeg',
          }}
          style={[styles.box]}
        />
      </PinchZoomView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 120,
    height: 120,
    marginVertical: 20,
  },
});
