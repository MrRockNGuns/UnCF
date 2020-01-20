import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator} from 'react-navigation-stack';
import { Icon } from 'react-native-elements'

import LogIn         from './components/src/LogIn';
import SignUp        from './components/src/SignUp';
import Loading       from './components/src/Loading';
import Main          from 'UniversoCF/components/src/Main';
import Agenda        from 'UniversoCF/components/src/Agenda';
import Configuracion from 'UniversoCF/components/src/Configuracion';


//Navegacion interna
import EditarDatos   from 'UniversoCF/components/src/EditarDatos';


// Primer Menu principal
const MainNavigator = createBottomTabNavigator(
  { 
    Main:{screen: Main,
            navigationOptions: {
              tabBarLabel: "Agenda",
              tabBarIcon: () => (
                <Icon color="white" name="home" type="font-awesome" />
              )
            }
         },
    Agenda:  {screen: Agenda,
      navigationOptions: {
        tabBarLabel: "Principal",
        tabBarIcon: () => (
          <Icon color="white" name="calendar" type="font-awesome" />
        )
      }
    },
    Config:{screen: Configuracion,
      navigationOptions: {
        tabBarLabel: "Configuracion",
        tabBarIcon: () => (
          <Icon color="white" name="cog" type="font-awesome" />
        )
      }
      
    },
  },
  {    
  tabBarOptions : {
    style: {
      backgroundColor: 'black',
    }
  }
  },
);

// Navegacion para LogIn se coloca MainNavigator para luego poder llamarLos objetos correctamente
const HiddenNavigator = createSwitchNavigator(
  {
    Login:   {screen: LogIn},
    SignUp:  {screen: SignUp},
    Loading: {screen: Loading},    
    MainNavigator: {screen: MainNavigator},
    EditarDatos: {screen:EditarDatos},
  },
  {
    initialRouteName: 'Loading',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  },
);

const App = createAppContainer(HiddenNavigator);

export default App;