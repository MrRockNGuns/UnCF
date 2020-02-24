import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import {styles} from 'UniversoCF/components/styles/Styles';
import { Icon } from 'react-native-elements';

export default class RegistroScss extends React.Component{
    static navigationOptions = {
        header: null,
    }
  render(){
        return(
            <View style={styles.fondo} >
                <Text style={styles.titulo}>
                    Registro Exitoso 
                </Text>

                <Icon color="white" name="check" type="font-awesome" />

                <Text style={styles.subtitulo}>
                    Verifique su correo para Continuar
                </Text>
                
                <TouchableOpacity
                style={styles.BtnStyle}
                onPress = {
                    ()=> this.props.navigation.navigate('Login')
                }
                >
                <Text style={styles.textBtnStyle}>Volver</Text>
                </TouchableOpacity>
            </View>
        );
    }
}