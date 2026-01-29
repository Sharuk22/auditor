import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "twrnc";

interface ClockStatusCardProps {
  isClockedIn: boolean;
  time: Date;
}

export const ClockStatusCard: React.FC<ClockStatusCardProps> = ({
  isClockedIn,
  time,
}) => {
  // Flutter එකේ තිබූ වර්ණ (Green for In, Orange for Out)
  const gradientColors = isClockedIn
    ? ["#4ADE80", "#16A34A"] // Green.shade400 to shade600
    : ["#FB923C", "#EA580C"]; // Orange.shade400 to shade600

  return (
    <View style={styles.shadowContainer}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={tw`p-4 rounded-2xl flex-row items-center mb-4`}
      >
        {/* Icon */}
        <View style={tw`mr-4`}>
          <Ionicons
            name={isClockedIn ? "time" : "log-out"}
            size={28}
            color="white"
          />
        </View>

        {/* Text Content */}
        <View style={tw`flex-1`}>
          <Text style={tw`text-white text-[14px] font-medium opacity-90`}>
            {isClockedIn ? "Clocked In" : "Clocked Out"}
          </Text>

          <Text style={tw`text-white text-[20px] font-bold mt-1`}>
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            })}
          </Text>

          <Text style={tw`text-white text-[12px] opacity-70`}>
            {time.toLocaleDateString([], {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    // Flutter වල තිබූ BoxShadow එක මෙලෙස ලබා දිය හැකියි
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4, // Android සඳහා
  },
});
