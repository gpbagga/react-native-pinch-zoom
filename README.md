# react-native-pinch-zoom

A React Native library that provides smooth pinch-to-zoom and pan functionality for any content. Built with React Native Reanimated and Gesture Handler for optimal performance.

## Features

- 🔍 **Pinch to zoom** with smooth animations
- 👆 **Pan gesture** support when zoomed in
- 🎯 **Focal point zooming** - zoom at the exact point you pinch
- ⚡ **High performance** - runs on the UI thread using Reanimated
- 🎛️ **Highly customizable** - min/max scale, reset behaviors, and more
- 📱 **Cross-platform** - works on both iOS and Android
- 🎪 **Double tap support** with configurable reset behavior

## Installation

```sh
npm install react-native-pinch-zoom
```

### Peer Dependencies

This library requires the following peer dependencies:

```sh
npm install react-native-gesture-handler react-native-reanimated
```

Make sure to complete the installation of these libraries by following their respective setup guides:
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/installation)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/)

## Usage

### Basic Example

```jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PinchZoomView } from 'react-native-pinch-zoom';

export default function App() {
  return (
    <View style={styles.container}>
      <PinchZoomView style={styles.zoomContainer}>
        <View style={styles.content}>
          <Text style={styles.text}>Pinch me to zoom!</Text>
        </View>
      </PinchZoomView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomContainer: {
    width: 300,
    height: 300,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
```

### Advanced Example with Images

```jsx
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { PinchZoomView } from 'react-native-pinch-zoom';

export default function ImageZoom() {
  return (
    <View style={styles.container}>
      <PinchZoomView 
        minScale={0.5}
        maxScale={5}
        resetOn={['doubleTap']}
        style={styles.imageContainer}
      >
        <Image
          source={{ uri: 'https://picsum.photos/400/600' }}
          style={styles.image}
          resizeMode="contain"
        />
      </PinchZoomView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
```

### Conditional Activation Example

```jsx
import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { PinchZoomView } from 'react-native-pinch-zoom';

export default function ConditionalZoom() {
  return (
    <ScrollView>
      <PinchZoomView 
        activateOnlyAfterPinch={true}
        resetOn={['releaseIfScaleLessThan1']}
      >
        <View style={{ padding: 20 }}>
          <Text>
            This content is in a ScrollView. The zoom will only activate
            when you start pinching, allowing normal scrolling otherwise.
          </Text>
        </View>
      </PinchZoomView>
    </ScrollView>
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | **Required** | The content to be made zoomable |
| `minScale` | `number` | `0.25` | Minimum zoom scale |
| `maxScale` | `number` | `20` | Maximum zoom scale |
| `resetOn` | `ResetTrigger[]` | `[]` | Array of triggers that reset zoom to original state |
| `activateOnlyAfterPinch` | `boolean` | `false` | If true, pan gestures are disabled until user starts pinching |

### Reset Triggers

The `resetOn` prop accepts an array of the following values:

- `'release'` - Reset when user releases all touches
- `'doubleTap'` - Reset when user double taps
- `'releaseIfScaleLessThan1'` - Reset only if scale is less than 1 when user releases

### Examples of Reset Behaviors

```jsx
// Reset on double tap (common for image viewers)
<PinchZoomView resetOn={['doubleTap']}>
  {/* content */}
</PinchZoomView>

// Reset when user releases if zoomed out
<PinchZoomView resetOn={['releaseIfScaleLessThan1']}>
  {/* content */}
</PinchZoomView>

// Reset immediately when user releases (always snap back)
<PinchZoomView resetOn={['release']}>
  {/* content */}
</PinchZoomView>

// Multiple reset triggers
<PinchZoomView resetOn={['doubleTap', 'releaseIfScaleLessThan1']}>
  {/* content */}
</PinchZoomView>
```

## Use Cases

- **Image galleries** - Allow users to zoom into photos
- **Maps and diagrams** - Enable detailed inspection of complex visuals
- **Documents and PDFs** - Improve readability of text content
- **Charts and graphs** - Allow users to examine data points closely
- **Art and design apps** - Provide detailed view of creative work

## Performance Notes

This library is built on top of React Native Reanimated and Gesture Handler, which means:

- ✅ Animations run on the UI thread (60fps)
- ✅ Gestures are handled natively
- ✅ No bridge communication during interactions
- ✅ Smooth performance even on lower-end devices

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
