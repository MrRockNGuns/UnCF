import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

import ModalView from 'UniversoCF/components/src/Modal'

//Importo los estilos Propios
import {styles} from 'UniversoCF/components/styles/Styles';
import { firebase } from '@react-native-firebase/auth';



export default class LogIn extends React.Component{
    static navigationOptions = {
        header: null,
    }
    state = {email: '', password: '', errorMensaje: null,loading: false,modalVisible: false,usr: []};
    componentDidMount = async () => {
        
        await firebase.auth().onAuthStateChanged(usuario => {
            if (usuario){
                var Err2 = 'Usuario no Verificado';
                console.log('LOGIN - Si hay Usuario')
                this.setState({usr: usuario})
                if (this.state.usr.emailVerified){
                    this.props.navigation.navigate('Main')
                }
                else{
                    // console.log('LOGIN - Usuario NO Verificado')
                    var Err2 = 'Usuario no Verificado';
                    // this.setState({errorMensaje: Err2})
                }
            }
        })
    }
    componentWillUnmount() {
        this.setState({usr: []})
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

                <Image 
                style={styles.logoimg}
                source={require('UniversoCF/components/img/Logo.png')}/>

                
                <Text style={styles.logintxt}>LOG IN</Text>
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
                    <Text style={styles.textBtnStyle}>Iniciar Sesión</Text>
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