import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

// Cache tokens
const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

// Clerk key
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

// defalt theme
const theme = {
  ...DefaultTheme,
  custom: "property",
  colors: {
    ...DefaultTheme.colors,
    // Buttons
    primary: "#016FB9",
    secondary: "#519872",
    error: "#D7263D",
    surfaceDisabled: "#808080",
    // Main Text
    tertiary: "#D95D39",
    elevation: "#E0FF4F",
    
    // Main Background
    background: "#DBE3E6"
  },
};

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <PaperProvider theme={theme}>
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </PaperProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default RootLayout;
