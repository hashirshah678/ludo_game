import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { persistor, store } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Wrapper from "../components/wrapper";
import { useEffect } from "react";

export default function RootLayout() {

  

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack
          initialRouteName="index"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
           name="index"
           options={{
            animation: "fade",
          }}
          />
          <Stack.Screen
          name="Splashscreen" 
          options={{
            animation: "fade",
          }}
          />
          <Stack.Screen
            name="Ludoboardscreen"
            options={{
              animation: "fade",
            }}
          />
        </Stack>
      </PersistGate>
    </Provider>
  );
}
