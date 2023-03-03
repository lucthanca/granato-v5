import * as React from 'react';
import { View, Text, Modal, ActivityIndicator, TextStyle, ViewStyle } from 'react-native';
import styles from './spinner.style';
import { BlurView } from '@react-native-community/blur';
import LottieView from 'lottie-react-native';

const Spinner = ({
  cancelable = false,
  color = 'white',
  animation = 'none',
  overlayColor = 'rgba(0, 0, 0, 0.01)',
  size = 'large',
  textContent = '',
  textStyle,
  visible = false,
  indicatorStyle,
  customIndicator,
  children,
  spinnerKey,
  iconSize = 128,
  useBlur = false,
  blurAmount = 8,
  animDuration = 1500,
}) => {
  const [spinnerVisible, setSpinnerVisibility] = React.useState(visible);
  const close = () => {
    setSpinnerVisibility(false);
  };

  const _handleOnRequestClose = () => {
    if (cancelable) {
      close();
    }
  };

  React.useEffect(() => {
    setSpinnerVisibility(visible);
  }, [visible]);
  const _renderDefaultContent = () => {
    return (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <LottieView
          source={require('../../assets/lottie-animated-icons/simicart_loader_no_stroke.json')}
          loop={true}
          autoPlay={true}
          duration={animDuration}
          style={{ width: iconSize, aspectRatio: 1 }}
        />
      </View>
    );

    return (
      <View style={styles.background}>
        {customIndicator || (
          <ActivityIndicator color={color} size={size} style={[styles.activityIndicator, { ...indicatorStyle }]} />
        )}
        <View style={[styles.textContainer, { ...indicatorStyle }]}>
          <Text style={[styles.textContent, textStyle]}>{textContent}</Text>
        </View>
      </View>
    );
  };

  const _renderSpinner = () => {
    const spinner = (
      <View style={[styles.container, { backgroundColor: overlayColor }]} key={spinnerKey || `spinner_${Date.now()}`}>
        {children || _renderDefaultContent()}
      </View>
    );

    return (
      <View>
        <Modal
          animationType={animation}
          onRequestClose={() => {
            _handleOnRequestClose();
          }}
          supportedOrientations={['landscape', 'portrait']}
          transparent
          visible={spinnerVisible}
          statusBarTranslucent={true}>
          {useBlur && (
            <BlurView
              style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
              blurType='light'
              blurAmount={blurAmount}
              reducedTransparencyFallbackColor="rgba(37,42,54,.25)"
            />
          )}
          {spinner}
        </Modal>
      </View>
    );
  };

  return _renderSpinner();
};

export default Spinner;
