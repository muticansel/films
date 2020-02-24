import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import StartupScreen from '../components/screens/StartupScreen';
import { FilmDrawerNavigator, AppBaseDrawerNav } from './DrawerNavigator';
import { AuthStackNavigator } from './StackNavigators'
//import Filters from '../components/screens/Filters';

// const FilterStackNavigator = createStackNavigator({
//     Filters: Filters
// })

const SwitchNavigator = createSwitchNavigator({
    StartupScreen: StartupScreen,
    Auth: AuthStackNavigator,
    Film: FilmDrawerNavigator,
    AppBase: AppBaseDrawerNav
})

export default createAppContainer(SwitchNavigator);