import React from 'react';
import {View, Modal,Text,TouchableOpacity, ActivityIndicator} from 'react-native';
import {styles} from 'UniversoCF/components/styles/Styles';



const ModalView = props =>{
  const {
    loading,
    ...attributes
  } = props;
  return(
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose= {()=> {console.log('close Modal')}}>

      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator 
            animating={loading}/>
        </View>
      </View>
    </Modal>
  )
}

export default ModalView;