// import { LinearGradient } from "expo-linear-gradient";
// import React, { useEffect, useRef } from "react";
// import { Animated, Image, StyleSheet, View } from "react-native";

// export default function SplashScreen({ navigation }: any) {
//   // Animation Values
//   const fadeAnim = useRef(new Animated.Value(0)).current; // ආරම්භක opacity 0
//   const scaleAnim = useRef(new Animated.Value(1.15)).current; // ආරම්භක scale 1.15 (Zoomed in)

//   useEffect(() => {
//     // ඇනිමේෂන් දෙකම එකවර ආරම්භ කිරීම (900ms duration)
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 900,
//         useNativeDriver: true,
//       }),
//       Animated.timing(scaleAnim, {
//         toValue: 1.0, // Zoom out වී 1.0 ට පැමිණේ
//         duration: 900,
//         useNativeDriver: true,
//       }),
//     ]).start();

//     // තත්පර 1.8 කට පසු Login screen එකට මාරු වීම
//     const timer = setTimeout(() => {
//       navigation.replace("Login"); // pushReplacementNamed එකට සමානව
//     }, 1800);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* Background Gradient */}
//       <LinearGradient
//         colors={["#BAE6FD", "#38BDF8", "#1E40AF"]}
//         style={StyleSheet.absoluteFill}
//       >
//         <View style={styles.centerContent}>
//           {/* Animated Logo Container */}
//           <Animated.View
//             style={[
//               styles.logoContainer,
//               {
//                 opacity: fadeAnim, // Fade effect
//                 transform: [{ scale: scaleAnim }], // Zoom effect
//               },
//             ]}
//           >
//             <Image
//               source={require("../assets/logo.jpg")} // ඔබේ Logo එකේ path එක නිවැරදිදැයි බලන්න
//               style={styles.logo}
//               resizeMode="cover"
//             />
//           </Animated.View>
//         </View>
//       </LinearGradient>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   centerContent: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   logoContainer: {
//     width: 160,
//     height: 160,
//     borderRadius: 24,
//     borderWidth: 4,
//     borderColor: "white",
//     overflow: "hidden",
//     backgroundColor: "white",
//     // iOS Shadow
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.26,
//     shadowRadius: 18,
//     // Android Elevation
//     elevation: 12,
//   },
//   logo: {
//     width: "100%",
//     height: "100%",
//   },
// });

// // import { useNavigation } from "@react-navigation/native";
// // // import type { NativeStackNavigationRouteProp } from "@react-navigation/native-stack";
// // import type { NativeStackNavigationRouteProp } from "@react-navigation/native-stack";
// // import LinearGradient from "expo-linear-gradient";
// // import React, { useEffect } from "react";
// // import { Animated, Image, Text, View } from "react-native";
// // import tw from "twrnc";

// // // Navigation types (ඔයාගේ routes එක්ක match කරගන්න)
// // type RootStackParamList = {
// //   Splash: undefined;
// //   Login: undefined;
// //   AuditorDashboard: undefined;
// //   // AdminDashboard: undefined; // ඕන නම් මේක uncomment කරන්න
// // };

// // type NavigationProp = NativeStackNavigationRouteProp<
// //   RootStackParamList,
// //   "Splash"
// // >;

// // export default function SplashScreen() {
// //   const navigation = useNavigation<NavigationProp>();

// //   // Animations
// //   const scaleAnim = React.useRef(new Animated.Value(1.15)).current;
// //   const fadeAnim = React.useRef(new Animated.Value(0)).current;

// //   useEffect(() => {
// //     // Parallel animations (zoom + fade)
// //     Animated.parallel([
// //       Animated.timing(scaleAnim, {
// //         toValue: 1.0,
// //         duration: 1200, // ටිකක් smooth කරලා දුන්නා
// //         useNativeDriver: true,
// //         easing: Animated.Easing.out(Animated.Easing.cubic),
// //       }),
// //       Animated.timing(fadeAnim, {
// //         toValue: 1,
// //         duration: 1200,
// //         useNativeDriver: true,
// //       }),
// //     ]).start();

// //     // Navigate to Login after 2.2 seconds
// //     const timer = setTimeout(() => {
// //       navigation.replace("Login");
// //     }, 2200); // ටිකක් time එක වැඩි කළා – ලස්සනට බලන්න පුළුවන් වෙන්න

// //     return () => clearTimeout(timer);
// //   }, [navigation]);

// //   return (
// //     <LinearGradient
// //       colors={["#BAE6FD", "#38BDF8", "#1E40AF"]}
// //       start={{ x: 0, y: 0 }}
// //       end={{ x: 1, y: 1 }}
// //       style={tw`flex-1`}
// //     >
// //       <View style={tw`flex-1 justify-center items-center px-6`}>
// //         {/* Logo with animation */}
// //         <Animated.View
// //           style={[
// //             tw`rounded-3xl border-4 border-white/90 shadow-2xl overflow-hidden mb-8`,
// //             {
// //               width: 180, // ටිකක් විශාල කළා
// //               height: 180,
// //               transform: [{ scale: scaleAnim }],
// //               opacity: fadeAnim,
// //             },
// //           ]}
// //         >
// //           <Image
// //             source={require("../../assets/logo.jpg")} // ← මේක ඔයාගේ path එකට match වෙනවා
// //             style={tw`w-full h-full`}
// //             resizeMode="contain" // jpg එකකට contain හොඳයි (cover වලින් එක පැත්තකට crop වෙන්න පුළුවන්)
// //           />
// //         </Animated.View>

// //         {/* App Name + Tagline with fade animation */}
// //         <Animated.View style={{ opacity: fadeAnim }}>
// //           <Text
// //             style={tw`text-white text-4xl font-bold tracking-wider text-center mb-2`}
// //           >
// //             Auditor Pro
// //           </Text>

// //           <Text style={tw`text-white/90 text-lg font-medium text-center`}>
// //             Field Audit Management System
// //           </Text>

// //           <Text style={tw`text-white/70 text-sm mt-3 text-center`}>
// //             Negombo Branch • 2026
// //           </Text>
// //         </Animated.View>
// //       </View>
// //     </LinearGradient>
// //   );
// // }

// screens/SplashScreen.tsx
// මේක full updated version එකයි – ඔයාගේ logo path එකත් fix කරලා තියෙනවා

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, Image, Platform } from "react-native";
import tw from "twrnc";

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const scaleAnim = useRef(new Animated.Value(1.15)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1.0,
        duration: 900,
        useNativeDriver: Platform.OS !== "web", // Web සඳහා driver එක false විය යුතුයි
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: Platform.OS !== "web",
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#BAE6FD", "#38BDF8", "#1E40AF"]}
      style={tw`flex-1 justify-center items-center`}
    >
      <Animated.View
        style={[
          tw`w-40 h-40 rounded-3xl border-4 border-white overflow-hidden bg-white`,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
            ...Platform.select({
              web: { boxShadow: "0px 8px 18px rgba(0,0,0,0.26)" },
              default: { elevation: 18 },
            }),
          },
        ]}
      >
        <Image
          // මෙන්න මෙතැනට ඔබේ assets වල ඇති image එක සම්බන්ධ කළා
          source={require("../assets/logo.jpg")}
          style={tw`w-full h-full`}
          resizeMode="cover"
        />
      </Animated.View>
    </LinearGradient>
  );
};

export default SplashScreen;
