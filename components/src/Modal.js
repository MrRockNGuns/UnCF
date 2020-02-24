import React from 'react';
import {View, Modal,Text,TouchableHighlight, ActivityIndicator} from 'react-native';
import {styles} from 'UniversoCF/components/styles/Styles';



const ModalView = ({visible,cerrar}) => { 

  return(
    <Modal
      transparent={true}
      animationType={'none'}
      visible={visible}
      onRequestClose= {()=> {console.log('close Modal')}}>

      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator 
            animating={visible}/>
            
        </View>
      </View>
    </Modal>
  )
}

export default ModalView;