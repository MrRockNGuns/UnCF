import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import ModalView from 'UniversoCF/components/src/Modal';

//Importo los estilos Propios
import {styles} from 'UniversoCF/components/styles/Styles';
import { firebase } from '@react-native-firebase/auth';
 
export default class LogIn extends React.Component{
    static navigationOptions = {
        header: null,
    }
    state = {email: '', password: '', errorMensaje: null,loading: false}    


    componentDidMount = async () => {
        // const {navigate} = this.props.navigation;
        await firebase.auth().onAuthStateChanged(usuario => {
           this.props.navigation.navigate(usuario.emailVerified ? 'Main' : 'Login')
        })
    }

    DisplayError =  () => {
        const {errorMensaje} = this.state;
        if (errorMensaje === '[auth/wrong-password] The password is invalid or the user does not have a password.'){
            return(
                 <Text style={{ color: 'red' }}>Contraseña Incorrecta</Text>
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
            this.setState({loading: true});
            this.setState({errorMensaje: null})
            const login = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(result  => this.props.navigation.navigate(result ? 'Main' : errorMensaje = 'Usuario No verificado'), this.setState({loading: false}))
            .catch(e => this.setState({errorMensaje: e.message}), this.setState({loading: false}))  
        }       
        {console.log(this.state.loading)}
    }

    render(){
        return(
            <View style={styles.fondo}>
                  {console.log('Return ' + this.state.loading)}
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
/**<ModalView
                    loading={this.state.loading} /> */