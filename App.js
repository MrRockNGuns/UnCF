import React from 'react';
import {createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator} from 'react-navigation-stack';
import { Icon } from 'react-native-elements'

import LogIn         from './components/src/LogIn';
import SignUp        from './components/src/SignUp';
import Loading       from './components/src/Loading';
import Main          from 'UniversoCF/components/src/Main';
import Agenda        from 'UniversoCF/components/src/Agenda';
import Configuracion from 'UniversoCF/components/src/Configuracion';
import {styles} from 'UniversoCF/components/styles/Styles';


//Navegacion interna
import EditarDatos   from 'UniversoCF/components/src/EditarDatos';

const CnfMenu = createStackNavigator(
    {
        Editar:{screen: EditarDatos},
    }
);


// Primer Menu principal
const MainNavigator = createBottomTabNavigator(
  { 
    Main:{screen: Main,
            navigationOptions: {
              tabBarLabel: "Principal",
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
const HiddenNavigator = createStackNavigator(
  {
    Login:   {screen: LogIn},
    SignUp:  {screen: SignUp},
    Loading: {screen: Loading},
    MainNavigator: {screen: MainNavigator},
    EditarDatos: {screen: CnfMenu},
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