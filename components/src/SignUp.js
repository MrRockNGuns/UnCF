import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';

import {styles} from 'UniversoCF/components/styles/Styles';

export default class SignUp extends React.Component{
  static navigationOptions = {        
         tabBarVisible: false ,
    };
  state = {email: '', pass: '', nombre: '', apellido: '', errorMensaje: null}
  handleSignUp = () => {
        console.log('handleSignUp')
  }
  render(){
    return(
        <View
          style={styles.fondo}
        >
          <Text style={styles.subtitulo}>Completa los Campos</Text>
          <TextInput 
            style={styles.Input} 
            placeholder="Nombre" 
            placeholderTextColor="white" 
            name="Nombre"
          />
          <TextInput 
            style={styles.Input} 
            placeholder="Apellido"
            placeholderTextColor="white" 
            name="Apellido"
          />
          <TextInput
              style={styles.Input} placeholder="Contraseña"
              secureTextEntry={true}
              placeholderTextColor="white"
              name="pass"  
          />
          <TextInput
              style={styles.Input} placeholder="Teléfono"
              placeholderTextColor="white"
              name="tel"  
          />
          <TouchableOpacity
              style={styles.BtnStyle}
              onPress = {
                  ()=> console.log("Prueba Registro")
              }
          >
              <Text style={styles.textBtnStyle}>Registrate</Text>
          </TouchableOpacity>
        </View>
    )
  }
}