import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from "./screens/SearchScreen";
import {OrganizationScreen} from "./screens/OrganizationScreen";
import {FavoriteScreen} from "./screens/FavoriteScreen";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSearch,
  faSitemap,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

const ICPTelBook = require('./ICPTelBook.json');

const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="SearchScreen"
    tabBarOptions={{
      activeTintColor: '#3d7ece',
    }}>
      <Tab.Screen name="SearchScreen" component={SearchScreen} options={{
          tabBarLabel: '검색',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faSearch}  color={color} size={26} />
          ),
        }}  initialParams={{telBook:ICPTelBook}} />
      <Tab.Screen name="OrganizationScreen" component={OrganizationScreen} options={{
          tabBarLabel: '조직도',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faSitemap}  color={color} size={26} />
          ),
        }}  />
      <Tab.Screen name="FavoriteScreen" component={FavoriteScreen} options={{
          tabBarLabel: '즐겨찾기',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faStar}  color={color} size={26} />
          ),
        }} />
    </Tab.Navigator>
  );
}

export default class App extends React.Component {

  // componentDidMount = () => {
  //   const ICPTelBook = require('./ICPTelBook.json');
  //   var listofFind = findNameinJSON(ICPTelBook, "경무");
  //   console.log(listofFind);


  //   for(var i = 0; i < listofFind.length; i++){
  //     fullName = findFullnameinJSON(ICPTelBook, listofFind[i]);
  //     console.log(fullName);
  //   }

  // }
 render() {
    return (
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    );
  }
  
}

