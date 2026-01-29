import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";

type RootStackParamList = {
  Login: undefined;
  AuditorDashboard: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = () => {
    // Kisiidu validation ekak nathiwa next page ekata navigation eka damu
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace("AuditorDashboard");
    }, 500); // Thathpara 0.5ka loading ekak pamanai
  };

  return (
    <LinearGradient
      colors={["#BAE6FD", "#38BDF8", "#1E40AF"]}
      style={tw`flex-1`}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
      >
        <ScrollView
          contentContainerStyle={tw`flex-grow justify-center items-center px-6`}
        >
          <View
            style={[
              tw`bg-white w-full max-w-md p-8 rounded-[24px]`,
              { elevation: 10 },
            ]}
          >
            <View style={tw`items-center mb-6`}>
              <View
                style={tw`w-24 h-24 rounded-2xl border-2 border-white overflow-hidden bg-white`}
              >
                <Image
                  source={require("../assets/logo.jpg")}
                  style={tw`w-full h-full`}
                  resizeMode="cover"
                />
              </View>
            </View>

            <Text
              style={tw`text-2xl font-bold text-[#1E3A8A] text-center mb-8`}
            >
              Auditor Sign In
            </Text>

            <TextInput
              style={tw`bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4`}
              placeholder="Email address"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={tw`bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8`}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              onPress={handleLogin}
              style={tw`bg-[#0EA5E9] py-4 rounded-xl items-center shadow-md`}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={tw`text-white font-bold text-lg`}>Sign In</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default LoginScreen;
