import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import tw from "twrnc";

interface NotesCardProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const NotesCard: React.FC<NotesCardProps> = ({
  value,
  onChangeText,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[tw`mb-4`, styles.cardShadow]}>
      <View
        style={tw`bg-white p-4 rounded-2xl border-[1.2px] border-[#3B82F6]`}
      >
        {/* Header Section (Icon + Label) */}
        <View style={tw`flex-row items-center mb-3`}>
          <View
            style={[
              tw`p-2 rounded-lg`,
              { backgroundColor: "rgba(59, 130, 246, 0.1)" },
            ]}
          >
            <Ionicons name="document-text" size={20} color="#3B82F6" />
          </View>
          <Text style={tw`text-[#1E3A8A] text-[16px] font-semibold ml-3`}>
            Notes
          </Text>
        </View>

        {/* Input Section */}
        <TextInput
          multiline
          numberOfLines={5}
          value={value}
          onChangeText={onChangeText}
          placeholder="Add notes about the audit..."
          placeholderTextColor="#9CA3AF"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          textAlignVertical="top"
          style={[
            tw`p-3 border rounded-xl text-base text-gray-800 min-h-[120px]`,
            {
              borderColor: isFocused ? "#0EA5E9" : "#3B82F6",
              borderWidth: isFocused ? 2 : 1,
            },
          ]}
        />
      </View>
    </View>
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
