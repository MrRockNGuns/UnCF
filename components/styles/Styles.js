import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    fondo:{
      flex: 1,
      justifyContent: "center",
      alignItems:"center",
      backgroundColor: "black",
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

  });

  export  {styles};