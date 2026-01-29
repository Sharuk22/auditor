import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Screen Imports
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import AuditorDashboardScreen from './screens/AuditorDashboardScreen';
import AuditDetailScreen from './screens/AuditDetailScreen';

// TypeScript පරාමිතීන් (Flutter routes වල arguments වලට සමානයි)
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  AuditorDashboard: undefined;
  AuditDetail: { branchName: string; dateText: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false, // Flutter වල වගේම custom headers භාවිතා කරන නිසා hide කරනවා
          animation: 'fade_from_bottom',
        }}
      >
        {/* Splash Page */}
        <Stack.Screen name="Splash" component={SplashScreen} />

        {/* Login Page */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Auditor & Admin Dashboard (Flutter වල දෙකටම එකම page එක තිබූ නිසා මෙලෙස යෙදුවා) */}
        <Stack.Screen name="AuditorDashboard" component={AuditorDashboardScreen} />

        {/* Audit Detail Page */}
        <Stack.Screen name="AuditDetail" component={AuditDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}