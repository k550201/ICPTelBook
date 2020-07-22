import React from "react";
import {StyleSheet} from 'react-native';

import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SearchScreen from "./screens/SearchScreen";
import OrganizationScreen from "./screens/OrganizationScreen";
import HomeScreen from "./screens/HomeScreen";

import {FavoriteScreen} from "./screens/FavoriteScreen";

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
    faHome,
    faSearch,
    faSitemap,
} from '@fortawesome/free-solid-svg-icons';
import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';


const ICPTelBook = require('./ICPTelBook.json');
const {Navigation} = require('react-native-navigation');
const Tab = createBottomTabNavigator();

function MyTabs() {
    return (

        <Tab.Navigator initialRouteName="HomeScreen"
                       tabBarOptions={{
                           activeTintColor: '#0054a6',

                           style: {
                               height: 50
                           }
                       }}
                       lazy={false}>

            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
                tabBarLabel: '메뉴',
                tabBarIcon: ({color, size}) => (
                    <FontAwesomeIcon icon={faHome} color={color} size={26}/>
                ),
            }}/>
            <Tab.Screen name="SearchScreen" component={SearchScreen} options={{
                tabBarLabel: '검색',
                tabBarIcon: ({color, size}) => (
                    <FontAwesomeIcon icon={faSearch} color={color} size={26}/>
                ),
            }} initialParams={{telBook: ICPTelBook}}/>
            <Tab.Screen name="OrganizationScreen" component={OrganizationScreen} options={{
                tabBarLabel: '조직도',
                tabBarIcon: ({color, size}) => (
                    <FontAwesomeIcon icon={faSitemap} color={color} size={26}/>
                ),
            }} initialParams={{telBook: ICPTelBook}}/>
            {/* <Tab.Screen name="FavoriteScreen" component={FavoriteScreen} options={{
              tabBarLabel: '즐겨찾기',
              tabBarIcon: ({ color, size }) => (
                <FontAwesomeIcon icon={faStar}  color={color} size={26} />
              ),
            }} /> */}
        </Tab.Navigator>
    );
}

export default class App extends React.Component {
    state = {
        isReady: false,
    };

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._cacheResourcesAsync}
                    onFinish={() => this.setState({isReady: true})}
                    onError={console.warn}
                />
            );
        }

        return (
            <NavigationContainer>
                <MyTabs/>
            </NavigationContainer>
        );
    }

    _cacheResourcesAsync = async () => {
        const images = [require('./assets/splash.png')];

        const cacheImages = images.map(image => {
            return Asset.fromModule(image).downloadAsync();
        });
        return Promise.all(cacheImages);
    }
}

