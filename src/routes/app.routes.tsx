import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../screens/SignIn";
import Dashboard from "../screens/Dashboard";
import Details from "../screens/Details";
import ForgotPassword from "../screens/ForgotPassword";

export type RootStackParamList = {
  SignIn: undefined;
  Dashboard: undefined;
  Details: undefined;
  ForgotPassword: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="SignIn" component={SignIn} />
      <Screen name="Dashboard" component={Dashboard} />
      <Screen name="Details" component={Details} />
      <Screen name="ForgotPassword" component={ForgotPassword} />
    </Navigator>
  );
}
