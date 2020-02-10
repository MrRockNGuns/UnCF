import React from 'react';
import {TextInput} from 'react-native';
import {styles} from 'UniversoCF/components/styles/Styles';



const UsuarioDatos = ({datatype}) =>{
  return(
    <TextInput style={styles.Input}>{datatype}</TextInput>
  )
}

export default UsuarioDatos;