import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Picker,
} from 'react-native';

import {styles} from 'UniversoCF/components/styles/Styles';
import  auth  from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';

export default class SignUp extends React.Component{
  
  state = {
    email: '',
    pass: '', 
    passv: '', 
    sexo: '',
    nombre: '',
    apellido: '',
    salud: '',
    obs: '',
    nivel: '1',
    tel: '',
    cod: '',
    errorMensaje: null
  }

  handleSignUp = async () => {
    const {email,pass,passv,sexo,nombre,apellido,salud,obs,nivel,tel,cod} = this.state;
    if (pass === passv){
      try {
        await auth().createUserWithEmailAndPassword(email, pass);
        //si es exitoso logeo
        const {currentUser}  = firebase.auth()
        const referencia = firebase.database().ref(`/usuarios/`);

        referencia.child(currentUser.uid).set({
          email: currentUser.email,
          nombre: nombre,
          apellido: apellido,
          tel: tel,
          nivel: nivel,
          salud: salud,
          sexo: sexo,
          obs: obs,
          cod: cod
        })
      } catch (e) {
        console.error(e.message);
      }
    }
    else{
      console.log('Password Distintas');
    }
      
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
            onChangeText={nombre => this.setState({nombre})}
            value={this.state.nombre}
          />
          <TextInput 
            style={styles.Input} 
            placeholder="Apellido"
            placeholderTextColor="white" 
            name="Apellido"
            onChangeText={apellido => this.setState({apellido})}
            value={this.state.apellido}
          />
          <Picker  style={styles.pickerStyle}
            selectedValue={this.state.sexo}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({sexo: itemValue})
            }
          >                   
            <Picker.Item  key="1" label="Masculino" value="M" />
            <Picker.Item  key="2" label="Femenino" value="F"  />
          </Picker>

          <TextInput
              style={styles.Input} placeholder="Contraseña"
              secureTextEntry={true}
              placeholderTextColor="white"
              name="pass"  
              onChangeText={pass => this.setState({pass})}
              value={this.state.pass}
          />
          <TextInput
              style={styles.Input} placeholder="Repetir Contraseña"
              secureTextEntry={true}
              placeholderTextColor="white"
              name="passv"
              onChangeText={passv => this.setState({passv})}
              value={this.state.passv}
          />
          <TextInput
              style={styles.Input} placeholder="Teléfono"
              placeholderTextColor="white"
              name="cel"
              onChangeText={tel => this.setState({tel})}
              value={this.state.tel}
          />
          <TextInput
              style={styles.Input} placeholder="Email"
              placeholderTextColor="white"
              name="email"  
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
          />
          <TextInput
              style={styles.Input} placeholder="Prestador de Salud"
              placeholderTextColor="white"
              name="salud"
              onChangeText={salud => this.setState({salud})}
              value={this.state.salud}
          />
          <TextInput
              style={styles.Input} placeholder="Lesion, molestia."
              placeholderTextColor="white"
              name="obs" 
              onChangeText={obs => this.setState({obs})}
              value={this.state.obs}
          />
          <TextInput
              style={styles.Input} placeholder="Código de Cliente"
              placeholderTextColor="white"
              name="cod" 
              onChangeText={cod => this.setState({cod})}
              value={this.state.cod}
          />
          <TouchableOpacity
              style={styles.BtnStyle}
              onPress = {
                  ()=> this.handleSignUp()
              }
          >
              <Text style={styles.textBtnStyle}>Registrate</Text>
          </TouchableOpacity>
        </View>
    )
  }
}