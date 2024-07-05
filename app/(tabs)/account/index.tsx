import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button, useTheme } from "react-native-paper";

const index = () => {
  const { user } = useUser();
  const auth = useAuth();
	const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: "center",
      paddingTop: 20,
    },
  });

  return (
    <View style={styles.container}>
      <SignedIn>
        <Avatar.Image size={150} source={{ uri: user?.imageUrl }} />
        <Text>{user?.fullName}</Text>
        <Text>Hello {user?.username}</Text>
        <Text>{user?.emailAddresses[0].emailAddress}</Text>
				<Button onPress={() => auth.signOut()}> Sign Out </Button>

      </SignedIn>
			<SignedOut>
				<Text>Sign in or sign up to access your account</Text>
				<View style={{flexDirection:"row"}}>
				<Button style={{backgroundColor: theme.colors.secondary, margin: 6}} mode="contained" onPress={() => router.push("/sign-in")}> Sign In </Button>
				<Button style={{backgroundColor: theme.colors.primary, margin: 6}} mode="contained" onPress={() => router.push("/sign-up")}> Sign Up </Button>
				</View>
			</SignedOut>
    </View>
  );
};

export default index;
