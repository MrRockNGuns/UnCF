import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
//Importo los estilos Propios
import {styles} from 'UniversoCF/components/styles/Styles';
import { firebase } from '@react-native-firebase/auth';
 
export default class LogIn extends React.Component{
    static navigationOptions = {        
         tabBarVisible: false ,
    };
    state = {email: '', password: '', errorMensaje: null}    
    handleLogin = () => {
        const { email, password } = this.state
        console.log('Email' + email)
        console.log('Pass' + password)
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Main',email))
        .catch(error => this.setState({ errorMessage: error.message }))
    }
    render(){
        return(
            <View style={styles.fondo}>
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