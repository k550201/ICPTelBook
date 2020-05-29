import React from "react";
import {
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { BottomMenu} from "./src/components/BottomMenu/BottomMenu";


export default class App extends React.Component {

  componentDidMount = () => {
    const ICPTelBook = require('./ICPTelBook.json');
    var listofFind = findNameinJSON(ICPTelBook, "경무");


    for(var i = 0; i < listofFind.length; i++){
      fullName = findFullnameinJSON(ICPTelBook, listofFind[i]);
    }

    // console.log("child");
    // console.log(listofFind);
    // const jo = JSON.parse(JSON.stringify(ICPTelBook));
    // const km = getKeys(ICPTelBook, "4f236dd9");

    // console.log(km);
  }
 render() {
    return (
      <NavigationContainer >
        <SafeAreaProvider>
            <BottomMenu />
        </SafeAreaProvider>
      </NavigationContainer>
    );
  }

}
// results =[]
// function findNameinJSON(obj, findString) {
//   const bArray = Array.isArray(obj);
//   if (bArray) {
//     for(var i = 0; i < obj.length; i++){
//       findNameinJSON(obj[i], findString);
//     }
//   }
//   else {
//     const bHasChild = Object.keys(obj).indexOf("CHILD") >= 0;
//     if(bHasChild) {
//       for(var i = 0; i < obj.CHILD.length; i++){
//         findNameinJSON(obj.CHILD[i], findString);
//       }
//     }
//     else {
//       if (obj.NAME.indexOf(findString) > -1)
//         results.push(obj.ID)
//     }
//   }

//   return results;
// }

// function findFullnameinJSON(obj, id){
//   result = "";
//   const bArray = Array.isArray(obj);
//   if (bArray) {
//     for(var i = 0; i < obj.length; i++){
//       const departName = findFullnameinJSON(obj[i], id);
//       if(departName.length > 0) {
//         return departName;
//       }
//       else
//         return "";
//     }
//   }
//   else
//   {
//     const bHasChild = Object.keys(obj).indexOf("CHILD") >= 0;
//     if(bHasChild) {
//       for(var i = 0; i < obj.CHILD.length; i++){
//         const departName = findFullnameinJSON(obj.CHILD[i], id);
//         if(departName.length > 0) {
//           return obj.NAME + " " + departName;
//         }
//       }
//       return "";
//     }
//     else {
//       if (obj.ID == id){
//         return obj.NAME;
//       }
//       else{
//         return "";
//       }
//     }
//   }
// }
