import React from 'react';
import {TextInput} from 'react-native';
import {styles} from 'UniversoCF/components/styles/Styles';



const UsuarioDatos = ({datatype,onCambio}) =>{

  
  return(
    <TextInput style={styles.Input} onChangeText={(datatype)=> onCambio()} value={datatype}/>
  )
}

export default UsuarioDatos;