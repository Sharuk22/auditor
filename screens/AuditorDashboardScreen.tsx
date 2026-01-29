// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { LinearGradient } from "expo-linear-gradient";
// import React from "react";
// import {
//   FlatList,
//   SafeAreaView,
//   StatusBar,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import tw from "twrnc";
// import { RootStackParamList } from "../App"; // App.tsx එකෙන් type එක import කරගන්න

// type NavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   "AuditorDashboard"
// >;

// const AuditorDashboardScreen = () => {
//   const navigation = useNavigation<NavigationProp>();

//   // Flutter code එකේ තිබූAssignments වලට සමාන දත්ත
//   const audits = [
//     { id: "1", branch_name: "Colombo Main Branch", audit_date: "2026-01-25" },
//     { id: "2", branch_name: "Kandy City Center", audit_date: "2026-01-28" },
//     { id: "3", branch_name: "Galle Fort Branch", audit_date: "2026-02-05" },
//     { id: "4", branch_name: "Matara Junction", audit_date: "2026-02-10" },
//   ];

//   const handleLogout = () => {
//     // Login පිටුවට යෑම සහ navigation history එක clear කිරීම
//     navigation.replace("Login");
//   };

//   // එක් එක් ListTile එක (Flutter _OutlinedTile එකට සමානයි)
//   const renderAuditItem = ({ item }: { item: (typeof audits)[0] }) => (
//     <TouchableOpacity
//       activeOpacity={0.7}
//       style={tw`bg-white border border-blue-100 rounded-2xl px-4 py-4 flex-row items-center mb-4 shadow-sm`}
//       onPress={() => alert(`${item.branch_name} තේරුවා`)} // පසුව AuditDetail එකට navigate කිරීමට
//     >
//       <View style={tw`bg-blue-50 p-3 rounded-xl mr-4`}>
//         <Ionicons name="business" size={24} color="#1E40AF" />
//       </View>

//       <View style={tw`flex-1`}>
//         <Text style={tw`text-[#1E3A8A] font-bold text-base`}>
//           {item.branch_name}
//         </Text>
//         <Text style={tw`text-gray-500 text-sm mt-1`}>
//           <Ionicons name="calendar-outline" size={12} /> {item.audit_date}
//         </Text>
//       </View>

//       <Ionicons name="chevron-forward" size={20} color="#1E40AF" />
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={tw`flex-1 bg-gray-50`}>
//       <StatusBar barStyle="light-content" />

//       {/* HEADER: Flutter Gradient Header එකට සමානයි */}
//       <LinearGradient
//         colors={["#BAE6FD", "#38BDF8", "#1E40AF"]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={tw`px-6 pt-12 pb-10 rounded-b-[32px]`}
//       >
//         <View style={tw`flex-row justify-between items-center`}>
//           <View>
//             <Text style={tw`text-blue-900 text-sm font-medium opacity-80`}>
//               Welcome,
//             </Text>
//             <Text style={tw`text-white text-2xl font-bold`}>
//               Auditor Dashboard
//             </Text>
//           </View>
//           <View style={tw`bg-white/30 p-2 rounded-full border border-white/50`}>
//             <Ionicons name="person" size={30} color="white" />
//           </View>
//         </View>
//       </LinearGradient>

//       {/* BODY: ලැයිස්තුව (Assignments) */}
//       <View style={tw`flex-1 px-5 mt-6`}>
//         <View style={tw`flex-row justify-between items-end mb-4`}>
//           <Text style={tw`text-[#1E3A8A] text-lg font-bold`}>
//             Assigned Audits
//           </Text>
//           <Text style={tw`text-blue-500 text-sm`}>{audits.length} Pending</Text>
//         </View>

//         <FlatList
//           data={audits}
//           renderItem={renderAuditItem}
//           keyExtractor={(item) => item.id}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={tw`pb-10`}
//           ListEmptyComponent={
//             <View style={tw`mt-20 items-center`}>
//               <Ionicons
//                 name="document-text-outline"
//                 size={50}
//                 color="#cbd5e1"
//               />
//               <Text style={tw`text-gray-400 mt-2`}>No assignments found</Text>
//             </View>
//           }
//         />
//       </View>

//       {/* FOOTER: Logout Button */}
//       <View style={tw`p-6 bg-white border-t border-gray-100`}>
//         <TouchableOpacity
//           onPress={handleLogout}
//           activeOpacity={0.8}
//           style={tw`bg-[#1E40AF] flex-row justify-center items-center py-4 rounded-2xl shadow-lg`}
//         >
//           <Ionicons
//             name="log-out-outline"
//             size={22}
//             color="white"
//             style={tw`mr-2`}
//           />
//           <Text style={tw`text-white font-bold text-lg`}>Log Out</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default AuditorDashboardScreen;

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import { RootStackParamList } from "../App"; // App.tsx එකේ path එක නිවැරදි දැයි බලන්න

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AuditorDashboard"
>;

const AuditorDashboardScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  // Assignments දත්ත ලැයිස්තුව
  const audits = [
    { id: "1", branch_name: "Colombo Main Branch", audit_date: "2026-01-25" },
    { id: "2", branch_name: "Kandy City Center", audit_date: "2026-01-28" },
    { id: "3", branch_name: "Galle Fort Branch", audit_date: "2026-02-05" },
    { id: "4", branch_name: "Matara Junction", audit_date: "2026-02-10" },
  ];

  const handleLogout = () => {
    navigation.replace("Login");
  };

  // එක් එක් Audit Card එක Render කිරීම
  const renderAuditItem = ({ item }: { item: (typeof audits)[0] }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={tw`bg-white border border-blue-100 rounded-2xl px-4 py-4 flex-row items-center mb-4 shadow-sm`}
      onPress={() => {
        // Notification එක වෙනුවට දැන් මෙතැනින් Next Page එකට Move වේ
        navigation.navigate("AuditDetail", {
          branchName: item.branch_name,
          dateText: item.audit_date,
        });
      }}
    >
      <View style={tw`bg-blue-50 p-3 rounded-xl mr-4`}>
        <Ionicons name="business" size={24} color="#3B82F6" />
      </View>

      <View style={tw`flex-1`}>
        <Text style={tw`text-[#1E3A8A] font-bold text-base`}>
          {item.branch_name}
        </Text>
        <Text style={tw`text-gray-500 text-sm mt-1`}>
          <Ionicons name="calendar-outline" size={12} /> {item.audit_date}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#3B82F6" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      <StatusBar barStyle="light-content" />

      {/* HEADER SECTION */}
      <LinearGradient
        colors={["#BAE6FD", "#38BDF8", "#1E40AF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={tw`px-6 pt-12 pb-10 rounded-b-[32px] shadow-lg`}
      >
        <View style={tw`flex-row justify-between items-center`}>
          <View>
            <Text style={tw`text-blue-900 text-sm font-medium opacity-80`}>
              Welcome,
            </Text>
            <Text style={tw`text-white text-2xl font-bold`}>
              Auditor Dashboard
            </Text>
          </View>
          <View style={tw`bg-white/30 p-2 rounded-full border border-white/50`}>
            <Ionicons name="person" size={30} color="white" />
          </View>
        </View>
      </LinearGradient>

      {/* BODY SECTION */}
      <View style={tw`flex-1 px-5 mt-6`}>
        <View style={tw`flex-row justify-between items-end mb-4`}>
          <Text style={tw`text-[#1E3A8A] text-lg font-bold`}>
            Assigned Audits
          </Text>
          <Text style={tw`text-blue-500 text-sm font-medium`}>
            {audits.length} Pending
          </Text>
        </View>

        <FlatList
          data={audits}
          renderItem={renderAuditItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`pb-10`}
          ListEmptyComponent={
            <View style={tw`mt-20 items-center`}>
              <Ionicons
                name="document-text-outline"
                size={50}
                color="#cbd5e1"
              />
              <Text style={tw`text-gray-400 mt-2`}>No assignments found</Text>
            </View>
          }
        />
      </View>

      {/* FOOTER SECTION */}
      <View style={tw`p-6 bg-white border-t border-gray-100`}>
        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.8}
          style={tw`bg-[#1E40AF] flex-row justify-center items-center py-4 rounded-2xl shadow-lg`}
        >
          <Ionicons
            name="log-out-outline"
            size={22}
            color="white"
            style={tw`mr-2`}
          />
          <Text style={tw`text-white font-bold text-lg`}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AuditorDashboardScreen;
