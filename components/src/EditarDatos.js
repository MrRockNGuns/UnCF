import React from 'react';
import {Text,View} from 'react-native';
import {styles} from 'UniversoCF/components/styles/Styles';


export default class EditarDatos extends React.Component{
    render(){
        return(
            <View style={styles.fondo}>
                <Text style={styles.titulo}>Editar Datos</Text>
            </View>
        );
    }
}