/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    headerBackground: "rgb(242,242,242)",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    deleteIconBackground: "#bb4242",
    selectedTodoBackground: "rgba(1,1,1,0.2)",
    todoButtonBackground: "#232323",
    placeholderColor: "rgba(0, 0, 0, 0.5)",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    headerBackground: "rgb(1,1,1)",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    deleteIconBackground: "#bb4242",
    selectedTodoBackground: "rgba(255,255,255,0.2)",
    todoButtonBackground: "#dadada",
    placeholderColor: "#696969",
  },
};