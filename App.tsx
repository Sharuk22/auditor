import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

// Screen Imports
import AuditDetailScreen from './screens/AuditDetailScreen';
import AuditorDashboardScreen from './screens/AuditorDashboardScreen';
import LoginScreen from './screens/LoginScreen';
import SplashScreen from './screens/SplashScreen';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  AuditorDashboard: undefined;
  AuditDetail: { branchName: string; dateText: string; auditId: string };
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