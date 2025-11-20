/* eslint-disable react-native/no-inline-styles */
import { View, StyleSheet, Image, FlatList, Modal } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PinchZoomView } from '@gpbagga/react-native-pinch-zoom';

export default function App() {
  return (
    <Modal visible={true} transparent={true}>
      <GestureHandlerRootView>
        <View style={styles.container}>
          <FlatList
            style={{ width: '100%' }}
            data={Array.from({ length: 100 }, (_, index) => index)}
            renderItem={() => (
              <PinchZoomView
                minScale={1}
                // activateOnlyAfterPinch
                resetOn={['doubleTap', 'releaseIfScaleLessThan1']}
              >
                <Image
                  source={{
                    uri: 'https://images.pexels.com/photos/29643306/pexels-photo-29643306.jpeg',
                  }}
                  style={[styles.box]}
                />
              </PinchZoomView>
            )}
          />
        </View>
      </GestureHandlerRootView>
    </Modal>
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
