import React, { memo, forwardRef } from 'react';
import { View, Modal, TouchableWithoutFeedback, Platform, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import defaultStyles from './bottomSheet.style';
import mergeStyles from '../../utils/mergeStyles';
import { useBottomSheet } from '../../talons/BottomSheet/useBottomSheet';
import Animated from 'react-native-reanimated';
import { func } from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign';
// () => {
//   if (!previewImgRef?.current?.isOpen()) {
//     handleClose();
//   }
//   if (previewImgRef?.current?.isOpen()) {
//     previewImgRef?.current?.close();
//   }
// }

const BottomSheet = (props, ref) => {
  const { onRequestClose, renderHeader, renderFullScreenPopup, onCloseSheet } = props;
  const styles = mergeStyles(defaultStyles, props.style);
  const talonProps = useBottomSheet({ ref, onCloseSheet });

  const { handleClose, isOpen, backdropAnim, popupAnim } = talonProps;

  return (
    <Modal
      onRequestClose={() => onRequestClose()}
      supportedOrientations={['landscape', 'portrait']}
      transparent
      visible={isOpen}
      statusBarTranslucent={true}>
      {renderFullScreenPopup && renderFullScreenPopup()}

      <TouchableWithoutFeedback onPress={handleClose}>
        <Animated.View style={[styles.backdrop, backdropAnim]} />
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView style={[styles.sheet]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity style={{ flex: 1 }} onPress={handleClose} />
        <Animated.View style={[styles.popup, popupAnim]}>
          {renderHeader ? (
            renderHeader(handleClose)
          ) : (
            <View style={[styles.popupTop]}>
              <TouchableWithoutFeedback onPress={handleClose}>
                <Icon name="close" style={[styles.popupTopCloseIcon]} />
              </TouchableWithoutFeedback>
            </View>
          )}
          {props.children}
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default memo(forwardRef(BottomSheet));

BottomSheet.propTypes = {
  onRequestClose: func,
  renderHeader: func,
  renderFullScreenPopup: func,
  onCloseSheet: func,
};
