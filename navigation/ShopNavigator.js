import React from 'react';
import { SafeAreaView, View, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { createSwitchNavigator } from 'react-navigation'
import ShopScreen from '../screens/ShopScreen';
import DetailScreen from '../screens/DetailScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import MyItemsScreen from '../screens/MyItemsScreen';
import AddItemScreen from '../screens/AddItemScreen';
import EditItemScreen from '../screens/EditItemScreen';
import AuthScreen from '../screens/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import { Colours } from '../constants/Colours';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { logOut } from '../store/actions/auth';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colours.primary,
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
    color: 'white'
  },
  headerTintColo: 'white'
};

const ShopNavigator = createStackNavigator(
  {
    Shop: ShopScreen,
    Detail: DetailScreen,
    Cart: CartScreen
  }, {
  navigationOptions: {
    drawerIcon: drawerConfig => {
      return <Ionicons name={'md-home'} size={23} color={drawerConfig.tintColor} />
    }
  },
  defaultNavigationOptions: defaultStackNavOptions
}
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen
  }, {
  navigationOptions: {
    drawerIcon: drawerConfig => {
      return <Ionicons name={'md-basket'} size={23} color={drawerConfig.tintColor} />
    }
  },
  defaultNavigationOptions: defaultStackNavOptions
}
);

const MyItemsNavigator = createStackNavigator(
  {
    MyItems: { screen: MyItemsScreen },
    AddItem: AddItemScreen,
    EditItem: EditItemScreen,
    Detail: DetailScreen,
  }, {
  navigationOptions: {
    drawerIcon: drawerConfig => {
      return <Ionicons name={'ios-cube'} size={23} color={drawerConfig.tintColor} />
    }
  },
  defaultNavigationOptions: defaultStackNavOptions
}
);

const AuthNavigator = createStackNavigator(
  { Auth: AuthScreen },
  { defaultNavigationOptions: defaultStackNavOptions }
);

const MainNavigator = createDrawerNavigator({
  Shop: { screen: ShopNavigator },
  Orders: { screen: OrdersNavigator },
  MyItems: {
    screen: MyItemsNavigator,
    navigationOptions: { drawerLabel: 'My Items' },
  }
},
  {
    contentOptions: {
      activeTintColor: Colours.primary,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View styles={{ flex: 1 }}>
          <SafeAreaView
            forceInset={{ top: 'always', horizontal: 'never' }}
            style={{ marginTop: 50 }}
          >
            <DrawerNavigatorItems {...props} />
            <Button title={'Log Out'} color={Colours.accent} onPress={() => {
              dispatch(logOut());
              props.navigation.navigate('Auth');
            }} />
          </SafeAreaView>
        </View>
      );
    }
  },

);

const AppNavigator = createSwitchNavigator(

  {
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Main: MainNavigator
  }
);


export default createAppContainer(AppNavigator);