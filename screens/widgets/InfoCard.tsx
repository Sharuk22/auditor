import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "twrnc";

interface InfoCardProps {
  title: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap; // Ionicons වල නම පමණක් ලබා ගැනීමට
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, value, icon }) => {
  return (
    <View style={[tw`mb-4`, styles.cardShadow]}>
      <View
        style={tw`bg-white p-4 rounded-2xl border-[1.2px] border-[#3B82F6] flex-row items-center`}
      >
        {/* Icon Container with 10% Opacity Background */}
        <View
          style={[
            tw`p-2.5 rounded-xl mr-4`,
            { backgroundColor: "rgba(59, 130, 246, 0.1)" },
          ]}
        >
          <Ionicons name={icon} size={24} color="#3B82F6" />
        </View>

        {/* Text Content */}
        <View style={tw`flex-1`}>
          <Text style={tw`text-gray-400 text-[12px] font-medium uppercase`}>
            {title}
          </Text>
          <Text style={tw`text-[#1E3A8A] text-[16px] font-semibold mt-1`}>
            {value}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    // Flutter BoxShadow: color: black12, blurRadius: 6, offset: (0,3)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3, // Android සඳහා shadow එක පෙන්වීමට
  },
});
