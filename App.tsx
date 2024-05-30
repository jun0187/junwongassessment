import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Provider } from "react-redux";
import { useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Home from "./src/screen/Home";
import { getMovieListAction } from "./src/saga/movie.saga";
import { store } from "./src/store";
import Detail from "./src/screen/Detail";
import Book from "./src/screen/Book";
import { NAVIGATION } from "./src/constant";

const Stack = createStackNavigator();
export const backgroundStyle = () => {
  return {
    backgroundColor:
      useColorScheme() === "dark" ? Colors.darker : Colors.lighter,
  };
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name={NAVIGATION.HOME} component={Home} />
          <Stack.Screen name={NAVIGATION.DETAIL} component={Detail} />
          <Stack.Screen name={NAVIGATION.BOOK} component={Book} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
