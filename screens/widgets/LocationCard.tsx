import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";

interface LocationCardProps {
  location: string;
  isLoading: boolean;
  onTap: () => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  location,
  isLoading,
  onTap,
}) => {
  return (
    <TouchableOpacity
      onPress={isLoading ? undefined : onTap}
      activeOpacity={isLoading ? 1 : 0.7}
      style={[tw`mb-4`, styles.cardShadow]}
    >
      <View
        style={tw`bg-white p-4 rounded-2xl border-[1.2px] border-[#3B82F6] flex-row items-center`}
      >
        {/* Icon or Loader Container */}
        <View
          style={[
            tw`p-2.5 rounded-xl mr-4`,
            { backgroundColor: "rgba(59, 130, 246, 0.1)" },
          ]}
        >
          {isLoading ? (
            <ActivityIndicator size={24} color="#3B82F6" />
          ) : (
            <Ionicons name="location" size={24} color="#3B82F6" />
          )}
        </View>

        {/* Text Content */}
        <View style={tw`flex-1`}>
          <Text style={tw`text-gray-400 text-[12px] font-medium uppercase`}>
            Location
          </Text>
          <Text
            style={[
              tw`text-[16px] font-semibold mt-1`,
              {
                color: location === "Add your location" ? "#9CA3AF" : "#1E3A8A",
              },
            ]}
          >
            {location}
          </Text>
        </View>

        {/* Right Chevron Icon */}
        <Ionicons name="chevron-forward" size={20} color="#3B82F6" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
});
