import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    fondo:{
      flex: 1,
      justifyContent: "center",
      alignItems:"center",
      backgroundColor: "black",
    },
    fondoscroll:{
      backgroundColor: "black",
      
    },
    inputregistro:{
      flex: 1,
      backgroundColor: "black",
      borderWidth: 1,
      borderBottomColor: "white",
      color: "white",
      margin: 10,
      textAlign: 'center',
      fontSize: 20,
      marginTop: 10,
    },
    tituloregistro:{
      textAlign: 'center',
      flex: 1,
      color: "white",
      fontSize: 25,
      marginBottom: 35,
      margin: 10,
    },
    btnregistro :{
      flex: 1,
      marginTop: 35,
      borderRadius: 50,
      padding: 10,
      margin: 10,
      backgroundColor: "white",
      alignItems: 'center' ,
    },
    pickerregistro:{
      flex: 0.5,
      marginTop: 20,
      borderRadius: 50,
      padding: 10,
      backgroundColor: "black",
      borderColor: "white",
      color: "white",
      alignContent: 'center'
    },
    fondoOk:{
      flex: 1,
      justifyContent: "center",
      alignItems:"center",
      backgroundColor: "green",
    },
    titulo: {
      color: "white",
      fontSize: 40,
      marginBottom: 20,
    },
    subtitulo: {
      color: "white",
      fontSize: 25,
      marginBottom: 35,
    },
    texto: {
      color: "white",
      fontSize: 20,
      marginBottom: 35,
    },
    textoError: {
      color: "red",
      fontSize: 20,
      marginBottom: 35,
    },
    textoSuccess: {
      color: "green",
      fontSize: 20,
      marginBottom: 35,
    },
    textochico: {
      color: "white",
      fontSize: 16,
      alignContent: 'stretch'
    },
    logintxt:{
      color: "white",
      fontSize: 32,
      marginBottom:5,
    },
    Input:{
      backgroundColor: "black",
      height:50,
      padding:15,
      width: '85%',
      borderWidth: 1,
      borderBottomColor: "white",
      marginTop: 10,
      color: "white",
    },
    BtnStyle:{
      marginTop: 20,
      width: '85%',
      borderRadius: 50,
      padding: 10,
      backgroundColor: "white",
      alignItems:"center",
    },
    textBtnStyle:{
      color:"black",
      fontSize: 15,
    },
    BtnStyleOp:{
      marginTop: 20,
      width: '85%',
      borderRadius: 50,
      padding: 10,
      backgroundColor: "black",
      alignItems:"center",
    },
    textBtnStyleOp:{
      color:"white",
      fontSize: 15,
    },
    container: {
      paddingTop: 20,
      flex: 1,
      flexDirection: 'column',
    },
    navItemStyle: {
      padding: 10
    },
    navSectionStyle: {
      backgroundColor: 'lightgrey'
    },
    sectionHeadingStyle: {
      paddingVertical: 10,
      paddingHorizontal: 5
    },
    footerContainer: {
      padding: 20,
      backgroundColor: 'lightgrey'
    },
    NavBarNavigation: {
      height: 70,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    pickerStyle:{
      marginTop: 20,
      width: '85%',
      borderRadius: 50,
      padding: 10,
      backgroundColor: "black",
      borderColor: "white",
      color: "white",
    },
    iconWhite:{
      color: "white",
    },
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: 'black'
    },
    activityIndicatorWrapper: {
      backgroundColor: '#FFFFFF',
      height: 100,
      width: 100,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
    }

  });

  export  {styles};