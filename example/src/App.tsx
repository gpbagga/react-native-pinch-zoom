import { View, StyleSheet, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PinchZoomView } from 'react-native-pinch-zoom';

export default function App() {
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <PinchZoomView
          minScale={1}
          activateOnlyAfterPinch
          resetOn={['doubleTap', 'releaseIfScaleLessThan1']}
        >
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/29643306/pexels-photo-29643306.jpeg',
            }}
            style={[styles.box]}
          />
        </PinchZoomView>
      </View>
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
