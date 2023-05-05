import React from 'react';
import {TouchableWithoutFeedback, StyleSheet, Modal, View} from 'react-native';

const DismissibleModal = props => {
  return (
    <View>
      <Modal
        visible={props.visible}
        onRequestClose={props.dismiss}
        // transparent={true}
        animationType="none">
        <TouchableWithoutFeedback onPress={props.dismiss}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>{props.children}</View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    margin: '5%',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default DismissibleModal;
