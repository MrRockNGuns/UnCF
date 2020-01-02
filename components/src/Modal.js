import React from 'react';
import {View, Modal,Text,TouchableOpacity} from 'react-native';
import {styles} from 'UniversoCF/components/styles/Styles';



const ModalView = (props) => {
    return(
        <View>
            <Modal
                animationType="slide"
                transparent={false}
            >
              <View>
                <Text>Error</Text>
                <Text > Hay un error </Text>
                <TouchableOpacity>
                <Text>Hide Modal</Text>
                </TouchableOpacity>
              </View>  
            </Modal>
        </View>
    );
};

export default ModalView;