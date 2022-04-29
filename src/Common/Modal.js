import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";
import Styles from "./Style";

const ModalView = (props) => {

    return (
        <Modal
            style={Styles.modalStyle}
            isVisible={props.isModalVisible}
            animationIn="slideInLeft"
            animationOut="slideOutLeft"
            swipeDirection={'right'}
            coverScreen={true}
            onBackButtonPress={
                () => {
                    props.closeModal('filter_clear')
                }
            }
        >
            <View style={{ flex: 1, paddingLeft: 10 }}>

                {
                    props.children
                }
            </View>
        </Modal>
    );
}

export default ModalView;

// onPress={() => {
//     props.closeModal('filter_clear')
// }}
