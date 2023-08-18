
import { NavigationContainer } from '@react-navigation/native';

import StackNavigation from './app/StackNavigation';
import { AuthProvider } from './hooks/useAuth';
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  scopes: ["profile", "email"],
  offlineaccess: false
});

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigation />
      </AuthProvider>
    </NavigationContainer>
  );
}
