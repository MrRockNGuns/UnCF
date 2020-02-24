import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import ModalView from 'UniversoCF/components/src/Modal'

//Importo los estilos Propios
import {styles} from 'UniversoCF/components/styles/Styles';
import { firebase } from '@react-native-firebase/auth';



export default class LogIn extends React.Component{
    static navigationOptions = {
        header: null,
    }
    state = {email: '', password: '', errorMensaje: null,loading: false,modalVisible: false,isLogged: true};
    componentDidMount = async () => {
            //console.log('Entro Verifico Usuario')
        await firebase.auth().onAuthStateChanged(usuario => {
            if (!usuario){
                //console.log('no hay Usuario')
                this.setState({isLogged: false})
            }
            else{
                var Err2 = 'Usuario no Verificado';
                //console.log('Si hay Usuario')
                    if (usuario.emailVerified){
                        this.props.navigation.navigate('Main')
                    }
                    else{
                        var Err2 = 'Usuario no Verificado';
                        this.setState({isLogged: false})
                        this.setState({errorMensaje: Err2})
                    }
            } 
        })
    }

    DisplayError =  () => {
        const {errorMensaje} = this.state;
        if (errorMensaje === '[auth/wrong-password] The password is invalid or the user does not have a password.'){
            return(
                 <Text style={{ color: 'red' }}>Contraseña Incorrecta</Text>
            )
        }
        if (errorMensaje === '[auth/invalid-email] The email address is badly formatted.'){
            return(
                 <Text style={{ color: 'red' }}>El correo no tiene el formato correcto</Text>
            )
        }
        if (errorMensaje === '[auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted.'){
            return(
                 <Text style={{ color: 'red' }}>El usuario no exsiste</Text>
            )
        }
        else{
            return(
                <Text style={{ color: 'red' }}>{errorMensaje}</Text>
            )
        }
        
    }
    handleLogin = async () => {
        const { email, password, errorMensaje,loading} = this.state;
            if (email === '' || password === ''){
                var Err = 'Usuario o Correo Vacio';  
                this.setState({errorMensaje: Err})
                this.DisplayError();
            }
            else{
                this.setModalVisible(true)
                //console.log('Verificando Usuario ')
                var Err2 = 'Usuario no Verificado';
                this.setState({errorMensaje: null})

                await firebase.auth()
                .signInWithEmailAndPassword(email.trim(), password)
                .then(result  => {
                    if(result.emailVerified){
                        this.props.navigation.navigate('Main')
                        this.setModalVisible(false)
                    }
                    else{
                        this.setState({errorMensaje: Err2})
                        this.setModalVisible(false)
                    }
                    
                })
                .catch(e => this.setState({errorMensaje: e.message}))
                //console.log(this.state.errorMensaje)        
            }       
        this.setModalVisible(false);
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
        //console.log('setModalVisible ' + this.state.modalVisible)
    }

    render(){
        return(
            <View style={styles.fondo}>
                <ModalView visible={this.state.modalVisible} cerrar={()=> this.setModalVisible(false)} />
                <Text style={styles.titulo}>Universo CrossFit</Text>
                <Text style={styles.logintxt}>Log In</Text>
                <TextInput style={styles.Input} placeholder="Correo eléctronico" 
                    placeholderTextColor="white" 
                    name="email"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                    
                />
                <TextInput
                    style={styles.Input} placeholder="Contraseña"
                    secureTextEntry={true}
                    placeholderTextColor="white"
                    name="password" 
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}  
                />
                {this.state.errorMensaje &&
                    this.DisplayError()
                }
                <TouchableOpacity
                    style={styles.BtnStyle}
                    onPress = { () =>
                        this.handleLogin()
                    }
                >
                    <Text style={styles.textBtnStyle}>Log In</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.BtnStyleOp}
                    onPress = {
                        ()=> this.props.navigation.navigate('SignUp')
                    }
                >
                    <Text style={styles.textBtnStyleOp}>No eres usuario? Registrate</Text>
                </TouchableOpacity>
            </View>
        );   
    }
}