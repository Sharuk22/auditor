// import { Ionicons } from "@expo/vector-icons";
// import React from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import tw from "twrnc";

// interface DateCardProps {
//   date: Date | string | null;
//   onTap: () => void;
// }

// export const DateCard: React.FC<DateCardProps> = ({ date, onTap }) => {
//   // දිනය format කිරීම (yyyy.MM.dd)
//   const formatDate = (dateVal: Date | string | null) => {
//     if (!dateVal) return "Select date";

//     const d = new Date(dateVal);
//     const year = d.getFullYear();
//     const month = `0${d.getMonth() + 1}`.slice(-2);
//     const day = `0${d.getDate()}`.slice(-2);

//     return `${year}.${month}.${day}`;
//   };

//   return (
//     <TouchableOpacity
//       onPress={onTap}
//       activeOpacity={0.7}
//       style={[tw`mb-4`, styles.cardShadow]}
//     >
//       <View
//         style={tw`bg-white p-4 rounded-2xl border-[1.2px] border-[#3B82F6] flex-row items-center`}
//       >
//         {/* Calendar Icon Container */}
//         <View style={tw`bg-[#3B82F6] p-2.5 rounded-xl mr-4`}>
//           <Ionicons name="calendar-outline" size={24} color="white" />
//         </View>

//         {/* Text Details */}
//         <View style={tw`flex-1`}>
//           <Text style={tw`text-gray-400 text-[12px] font-medium uppercase`}>
//             Date
//           </Text>
//           <Text style={tw`text-[#1E3A8A] text-[16px] font-semibold mt-1`}>
//             {formatDate(date)}
//           </Text>
//         </View>

//         {/* Right Arrow Icon */}
//         <Ionicons name="chevron-forward" size={20} color="#3B82F6" />
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   cardShadow: {
//     // Flutter වල තිබූ shadowing මෙලෙස ලබා දේ
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3, // Android සඳහා
//   },
// });

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

interface DateCardProps {
  date: Date | string | null;
  onTap: () => void;
}

export const DateCard: React.FC<DateCardProps> = ({ date, onTap }) => {
  // දිනය format කිරීම (yyyy.MM.dd)
  const formatDate = (dateVal: Date | string | null) => {
    if (!dateVal) return "Select date";

    const d = new Date(dateVal);
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const day = `0${d.getDate()}`.slice(-2);

    return `${year}.${month}.${day}`;
  };

  return (
    <TouchableOpacity
      onPress={onTap}
      activeOpacity={0.7}
      style={[tw`mb-4`, styles.cardShadow]}
    >
      <View
        style={tw`bg-white p-4 rounded-2xl border-[1.2px] border-[#3B82F6] flex-row items-center`}
      >
        {/* Calendar Icon Container */}
        <View style={tw`bg-[#3B82F6] p-2.5 rounded-xl mr-4`}>
          <Ionicons name="calendar" size={24} color="white" />
        </View>

        {/* Text Details */}
        <View style={tw`flex-1`}>
          <Text style={tw`text-gray-400 text-[12px] font-medium uppercase`}>
            Audit Date
          </Text>
          <Text style={tw`text-[#1E3A8A] text-[16px] font-semibold mt-1`}>
            {formatDate(date)}
          </Text>
        </View>

        {/* Right Arrow Icon */}
        <Ionicons name="chevron-forward" size={20} color="#3B82F6" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
});
