import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Picker,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import {styles} from 'UniversoCF/components/styles/Styles';
import  auth  from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';

import ModalView from 'UniversoCF/components/src/Modal'

export default class SignUp extends React.Component{
  static navigationOptions = {
    title: 'Registrarse',
  };
  
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
    errorMensaje: null,
    modalVisible: false,
    errors: false,
  }

  showError = () =>{
    const {errorMensaje} = this.state;
        return(
            <Text style={styles.textoError}>{errorMensaje}</Text>
        );
  }
  handleSignUp = async () => {
    console.log('-------------------------------------------------------------')
    const {email,pass,passv,sexo,nombre,apellido,salud,obs,nivel,tel,cod,errorMensaje,errors} = this.state;
    if (pass === passv){
      this.setModalVisible(true);
      if (cod === '22312'){
        try {
           await auth().createUserWithEmailAndPassword(email, pass).catch(
            e => {
              console.error('SIGNUP - Hubo Error Creando Usuario')
              console.log(e.message)
              this.setState({errors: true});
            }
          )  
          if (this.state.errors === false){
            //si es exitoso Grabo
            console.log('SIGNUP - GRABANDO DATOS ADICIONALES ')
            const {currentUser}  = firebase.auth()
            const referencia = firebase.database().ref(`/usuarios/`);
            console.log(currentUser.uid)
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
            }).catch(
              e => {
                console.log('SIGNUP - Hubo Error En Datos Adicionales Usuario')
                console.log(e.message)
                this.setState({errors: true});
              }
            )
          }
          if (this.state.errors === false){
            firebase.auth().currentUser.sendEmailVerification().then(function(){
              console.log('SIGNUP - Email Enviado')
            },
            function(error){
              console.log('SIGNUP - Verificar Email - Hubo un error')              
              console.log(error)
            }
            ).catch(
              e => {
                console.log('SIGNUP - Hubo Error En EMAIL Verificacion Usuario')
                console.log(e.message)
                this.setState({errors: true});
              }
            )
          }
          
          if (this.state.errors === false){
          
            this.setModalVisible(false),
            firebase.auth().signOut(),
            this.props.navigation.navigate('RegistroScss')  
          
          }
          //Emitir Mensaje
        } catch (e) {
          console.error(e.message);
          this.setState({errorMensaje: e.message})
          this.setModalVisible(false);
        }
      }
      else{
        console.log('Codigo no Valido');  
        this.setState({errorMensaje: 'Código no Valido'})
        this.setModalVisible(false);
      }
    }
    else{
      console.log('Password Distintas');
      this.setState({errorMensaje: 'Password Distintas'})
      this.setModalVisible(false);
    }
    console.log('-------------------------------------------------------------')
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
    console.log('SIGNUP - setModalVisible ' + this.state.modalVisible)
}
  render(){
    return(
          <SafeAreaView style={styles.fondoscroll}> 
          <ModalView visible={this.state.modalVisible} cerrar={()=> this.setModalVisible(false)} />
          {
            this.state.errorMensaje &&
            this.showError()
          }
          <ScrollView>
            <Text style={styles.tituloregistro}>Completa los Campos</Text>
            <TextInput 
              style={styles.inputregistro} 
              placeholder="Nombre" 
              placeholderTextColor="white" 
              name= "Nombre"
              onChangeText={nombre => this.setState({nombre})}
              value={this.state.nombre}
            />
            <TextInput 
              style={styles.inputregistro} 
              placeholder="Apellido"
              placeholderTextColor="white" 
              name="Apellido"
              onChangeText={apellido => this.setState({apellido})}
              value={this.state.apellido}
            />
            <Picker  style={styles.pickerregistro}
              selectedValue={this.state.sexo}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({sexo: itemValue})
              }
            > 
              <Picker.Item  key="0" label="Indique genero..." value={0} />
              <Picker.Item  key="1" label="Masculino" value="M" />
              <Picker.Item  key="2" label="Femenino" value="F"  />
            </Picker>

            <TextInput
                style={styles.inputregistro} placeholder="Contraseña"
                secureTextEntry={true}
                placeholderTextColor="white"
                name="pass"  
                onChangeText={pass => this.setState({pass})}
                value={this.state.pass}
            />
            <TextInput
                style={styles.inputregistro} placeholder="Repetir Contraseña"
                secureTextEntry={true}
                placeholderTextColor="white"
                name="passv"
                onChangeText={passv => this.setState({passv})}
                value={this.state.passv}
            />
            <TextInput
                style={styles.inputregistro} placeholder="Teléfono"
                placeholderTextColor="white"
                name="cel"
                onChangeText={tel => this.setState({tel})}
                value={this.state.tel}
            />
            <TextInput
                style={styles.inputregistro} placeholder="Email"
                placeholderTextColor="white"
                name="email"  
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
            />
            <TextInput
                style={styles.inputregistro} placeholder="Prestador de Salud"
                placeholderTextColor="white"
                name="salud"
                onChangeText={salud => this.setState({salud})}
                value={this.state.salud}
            />
            <TextInput
                style={styles.inputregistro} placeholder="Lesion, molestia."
                placeholderTextColor="white"
                name="obs" 
                onChangeText={obs => this.setState({obs})}
                value={this.state.obs}
            />
            <TextInput
                style={styles.inputregistro} placeholder="Código de Cliente"
                placeholderTextColor="white"
                name="cod" 
                onChangeText={cod => this.setState({cod})}
                value={this.state.cod}
            />
            <TouchableOpacity
                style={styles.btnregistro}
                onPress = {
                    ()=> this.handleSignUp()
                }
            >
                <Text style={styles.textBtnStyle}>Registrate</Text>
            </TouchableOpacity>
          </ScrollView>
          </SafeAreaView>
    )
  }
}