import { useLayoutEffect, useRef } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type ResetTrigger = 'release' | 'doubleTap' | 'releaseIfScaleLessThan1';

function PinchZoomView({
  children,
  minScale = 0.25,
  maxScale = 20,
  resetOn = [],
  activateOnlyAfterPinch = false,
}: {
  children: React.ReactNode;
  minScale?: number;
  maxScale?: number;
  resetOn?: ResetTrigger[];
  activateOnlyAfterPinch?: boolean;
}) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const targetRef = useRef<any>(null);
  const focal = useSharedValue({ x: 0, y: 0 });
  const focalTranslateX = useSharedValue(0);
  const focalTranslateY = useSharedValue(0);
  const offsetScale = useSharedValue(Math.max(minScale, Math.min(maxScale, 1)));
  const afterPinchTranslateX = useSharedValue(0);
  const afterPinchTranslateY = useSharedValue(0);
  const newPinchSession = useSharedValue(true);

  const centerOfView = useSharedValue({ x: 0, y: 0 });

  useLayoutEffect(() => {
    targetRef.current?.measure(
      (x: number, y: number, width: number, height: number): void => {
        x;
        y;
        centerOfView.value = {
          x: width / 2,
          y: height / 2,
        };
      }
    );
  }, [centerOfView]);

  const pinchScale = useSharedValue(1);
  const isActivated = useSharedValue(!activateOnlyAfterPinch); // Start activated if prop is false

  // Helper function to reset all transform values to original state
  const resetToOriginal = () => {
    'worklet';
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    offsetScale.value = withSpring(Math.max(minScale, Math.min(maxScale, 1)));
    afterPinchTranslateX.value = withSpring(0);
    afterPinchTranslateY.value = withSpring(0);
    pinchScale.value = withSpring(1);
    focalTranslateX.value = withSpring(0);
    focalTranslateY.value = withSpring(0);
    isActivated.value = !activateOnlyAfterPinch;
  };

  // Helper function for normal pinch end logic
  const applyNormalPinchEnd = () => {
    'worklet';
    const finalScale = offsetScale.value * pinchScale.value;
    const clampedFinalScale = Math.max(
      minScale,
      Math.min(maxScale, finalScale)
    );

    offsetScale.value = clampedFinalScale;
    afterPinchTranslateX.value =
      afterPinchTranslateX.value / pinchScale.value +
      (-focalTranslateX.value + focalTranslateX.value / pinchScale.value);

    afterPinchTranslateY.value =
      afterPinchTranslateY.value / pinchScale.value +
      (-focalTranslateY.value + focalTranslateY.value / pinchScale.value);
    pinchScale.value = 1;

    focalTranslateX.value = 0;
    focalTranslateY.value = 0;
  };

  const panGesture = Gesture.Pan()
    .averageTouches(true)
    .onStart(() => {})
    .onChange((event) => {
      // Don't allow pan if wrapper is not activated
      if (!isActivated.value) {
        return;
      }

      translateX.value += event.changeX;
      translateY.value += event.changeY;
      // console.log('translateY.value', translateY.value);
    })
    .onEnd(() => {
      // Don't process pan end if wrapper is not activated
      if (!isActivated.value) {
        return;
      }

      if (resetOn.includes('release')) {
        resetToOriginal();
      } else if (resetOn.includes('releaseIfScaleLessThan1')) {
        const currentTotalScale = offsetScale.value * pinchScale.value;
        if (currentTotalScale < 1) {
          resetToOriginal();
        }
      }
    });
  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      newPinchSession.value = true;
    })
    .onChange((event) => {
      if (event.numberOfPointers > 1) {
        // Calculate the new scale with constraints
        const newPinchScale = pinchScale.value * event.scaleChange;
        const totalScale = offsetScale.value * newPinchScale;

        // Check if we should activate the wrapper
        if (activateOnlyAfterPinch && !isActivated.value && totalScale > 1) {
          isActivated.value = true;
        }

        // Only apply scaling if wrapper is activated
        if (isActivated.value) {
          // Apply min/max scale constraints
          if (totalScale >= minScale && totalScale <= maxScale) {
            pinchScale.value = newPinchScale;
          } else {
            // Clamp the pinchScale to stay within bounds
            const clampedTotalScale = Math.max(
              minScale,
              Math.min(maxScale, totalScale)
            );
            pinchScale.value = clampedTotalScale / offsetScale.value;
          }

          if (
            newPinchSession.value ||
            (Math.abs(event.focalX - focal.value.x) < 5 &&
              Math.abs(event.focalY - focal.value.y) < 5)
          ) {
            focalTranslateX.value =
              event.focalX / offsetScale.value -
              translateX.value / offsetScale.value -
              afterPinchTranslateX.value -
              centerOfView.value.x / offsetScale.value;
            focalTranslateY.value =
              event.focalY / offsetScale.value -
              translateY.value / offsetScale.value -
              afterPinchTranslateY.value -
              centerOfView.value.y / offsetScale.value;
            focal.value = {
              x: event.focalX,
              y: event.focalY,
            };
            newPinchSession.value = false;
          }
        }
      }
    })
    .onEnd(() => {
      // Only process pinch end if wrapper is activated
      if (!isActivated.value) {
        return;
      }

      if (resetOn.includes('release')) {
        resetToOriginal();
      } else if (resetOn.includes('releaseIfScaleLessThan1')) {
        const currentTotalScale = offsetScale.value * pinchScale.value;
        if (currentTotalScale < 1) {
          resetToOriginal();
        } else {
          applyNormalPinchEnd();
        }
      } else {
        applyNormalPinchEnd();
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },

      { scale: offsetScale.value },

      { translateX: afterPinchTranslateX.value },
      { translateY: afterPinchTranslateY.value },

      { translateX: focalTranslateX.value },
      { translateY: focalTranslateY.value },

      { scale: pinchScale.value },

      { translateX: -focalTranslateX.value },
      { translateY: -focalTranslateY.value },
    ] as const,
  }));

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      // Only process double tap if wrapper is activated
      if (!isActivated.value) {
        return;
      }

      if (resetOn.includes('doubleTap')) {
        resetToOriginal();
      }
    });

  const composedGesture = Gesture.Simultaneous(panGesture, pinchGesture);

  return (
    <GestureDetector gesture={composedGesture}>
      <View ref={targetRef}>
        <GestureDetector gesture={doubleTapGesture}>
          <Animated.View style={animatedStyle}>{children}</Animated.View>
        </GestureDetector>
      </View>
    </GestureDetector>
  );
}

export default PinchZoomView;
