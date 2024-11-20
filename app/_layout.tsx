import { Colors } from "@/app-example/constants/Colors";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Appearance } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // getting use preferred color scheme
  const colorScheme = Appearance.getColorScheme();

  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.headerBackground },
          headerTintColor: theme.text,
          headerShadowVisible: false,
          headerShown: false,
        }}
      >
        {/* <Stack.Screen
          name="index"
          options={{ title: "Home", headerShown: false }}
        /> */}
      </Stack>
    </SafeAreaProvider>
  );
}
