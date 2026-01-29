// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { LinearGradient } from "expo-linear-gradient";
// import * as Location from "expo-location";
// import React, { useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import tw from "twrnc";

// // Widgets Import කිරීම (ඔබේ folder structure එක අනුව path එක නිවැරදි දැයි බලන්න)
// import { ClockStatusCard } from "./widgets/ClockStatusCard";
// import { DateCard } from "./widgets/DateCard";
// import { InfoCard } from "./widgets/InfoCard";
// import { LocationCard } from "./widgets/LocationCard";
// import { NotesCard } from "./widgets/NotesCard";

// const AuditDetailScreen = () => {
//   const route = useRoute<any>();
//   const navigation = useNavigation();

//   // Params ලබා ගැනීම
//   const { branchName, dateText } = route.params || {
//     branchName: "Unknown",
//     dateText: "",
//   };

//   // States
//   const [locationText, setLocationText] = useState("Add your location");
//   const [isLoadingLocation, setIsLoadingLocation] = useState(false);
//   const [isClockedIn, setIsClockedIn] = useState(false);
//   const [clockInTime, setClockInTime] = useState<Date | null>(null);
//   const [clockOutTime, setClockOutTime] = useState<Date | null>(null);
//   const [notes, setNotes] = useState("");
//   const [isSaving, setIsSaving] = useState(false);

//   // 📍 Location Logic
//   const getCurrentLocation = async () => {
//     setIsLoadingLocation(true);
//     try {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         Alert.alert("Permission Denied", "ස්ථානය ලබා ගැනීමට අවසර අවශ්‍යයි.");
//         return;
//       }
//       let location = await Location.getCurrentPositionAsync({
//         accuracy: Location.Accuracy.High,
//       });
//       const { latitude, longitude } = location.coords;
//       setLocationText(
//         `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`,
//       );
//     } catch (error) {
//       Alert.alert("Error", "ස්ථානය ලබා ගැනීමට නොහැකි විය.");
//     } finally {
//       setIsLoadingLocation(false);
//     }
//   };

//   // ⏰ Clock In/Out Logic
//   const handleClockAction = () => {
//     const now = new Date();
//     if (!isClockedIn) {
//       setIsClockedIn(true);
//       setClockInTime(now);
//       setClockOutTime(null);
//       Alert.alert(
//         "Clocked In",
//         `${now.toLocaleTimeString()} ට සාර්ථකව ඇතුළු විය.`,
//       );
//     } else {
//       setIsClockedIn(false);
//       setClockOutTime(now);
//       Alert.alert(
//         "Clocked Out",
//         `${now.toLocaleTimeString()} ට සාර්ථකව පිටවිය.`,
//       );
//     }
//   };

//   // 💾 Save Logic
//   const saveAudit = () => {
//     if (!clockInTime) {
//       Alert.alert("Wait!", "කරුණාකර ප්‍රථමයෙන් Clock-In වන්න.");
//       return;
//     }
//     setIsSaving(true);
//     setTimeout(() => {
//       setIsSaving(false);
//       Alert.alert("Success", "Audit details saved successfully!", [
//         { text: "OK", onPress: () => navigation.goBack() },
//       ]);
//     }, 1500);
//   };

//   return (
//     <SafeAreaView style={tw`flex-1 bg-white`}>
//       <StatusBar barStyle="light-content" />

//       {/* HEADER */}
//       <LinearGradient
//         colors={["#BAE6FD", "#38BDF8", "#1E40AF"]}
//         style={tw`px-4 pt-10 pb-6 rounded-b-[30px] shadow-md`}
//       >
//         <View style={tw`flex-row items-center`}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             style={tw`p-2 bg-white/20 rounded-full`}
//           >
//             <Ionicons name="arrow-back" size={24} color="white" />
//           </TouchableOpacity>
//           <View style={tw`ml-4`}>
//             <Text style={tw`text-white text-xl font-bold`}>Audit Details</Text>
//             <Text style={tw`text-blue-100 text-sm`}>{branchName}</Text>
//           </View>
//         </View>
//       </LinearGradient>

//       <ScrollView
//         contentContainerStyle={tw`p-5 pb-10`}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* 1. Branch Info Card */}
//         <InfoCard title="Branch Name" value={branchName} icon="business" />

//         {/* 2. Date Card */}
//         <DateCard
//           date={dateText}
//           onTap={() => Alert.alert("Note", "දිනය වෙනස් කළ නොහැක.")}
//         />

//         {/* 3. Location Card */}
//         <LocationCard
//           location={locationText}
//           isLoading={isLoadingLocation}
//           onTap={getCurrentLocation}
//         />

//         {/* 4. Clock Status Log (පෙන්වන්නේ ClockIn හෝ Out වී ඇත්නම් පමණි) */}
//         {isClockedIn && clockInTime && (
//           <ClockStatusCard isClockedIn={true} time={clockInTime} />
//         )}
//         {!isClockedIn && clockOutTime && (
//           <ClockStatusCard isClockedIn={false} time={clockOutTime} />
//         )}

//         {/* 5. Clock Action Button */}
//         <TouchableOpacity
//           onPress={handleClockAction}
//           activeOpacity={0.8}
//           style={tw`overflow-hidden rounded-2xl mb-6 shadow-lg`}
//         >
//           <LinearGradient
//             colors={
//               isClockedIn ? ["#F87171", "#B91C1C"] : ["#0EA5E9", "#1D4ED8"]
//             }
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//             style={tw`flex-row justify-center items-center py-4`}
//           >
//             <Ionicons
//               name={isClockedIn ? "log-out" : "log-in"}
//               size={24}
//               color="white"
//             />
//             <Text style={tw`text-white font-bold text-lg ml-2`}>
//               {isClockedIn ? "Clock Out Now" : "Clock In Now"}
//             </Text>
//           </LinearGradient>
//         </TouchableOpacity>

//         {/* 6. Notes Card */}
//         <NotesCard value={notes} onChangeText={setNotes} />

//         {/* 7. Save Button */}
//         <TouchableOpacity
//           onPress={saveAudit}
//           disabled={isSaving}
//           style={tw`${isSaving ? "bg-gray-400" : "bg-[#1E40AF]"} py-4 rounded-2xl items-center shadow-xl mt-2`}
//         >
//           {isSaving ? (
//             <ActivityIndicator color="white" />
//           ) : (
//             <View style={tw`flex-row items-center`}>
//               <Ionicons
//                 name="cloud-upload-outline"
//                 size={20}
//                 color="white"
//                 style={tw`mr-2`}
//               />
//               <Text style={tw`text-white font-bold text-lg`}>
//                 Finish & Save Audit
//               </Text>
//             </View>
//           )}
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default AuditDetailScreen;

import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import tw from "twrnc";

// Widgets
import { ClockStatusCard } from "./widgets/ClockStatusCard";
import { DateCard } from "./widgets/DateCard";
import { InfoCard } from "./widgets/InfoCard";
import { LocationCard } from "./widgets/LocationCard";
import { NotesCard } from "./widgets/NotesCard";

const AuditDetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();

  const { branchName, dateText } = route.params || {
    branchName: "Unknown",
    dateText: new Date().toISOString().split("T")[0],
  };

  // States
  const [selectedDate, setSelectedDate] = useState(dateText);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [locationText, setLocationText] = useState("Add your location");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [clockOutTime, setClockOutTime] = useState<Date | null>(null);
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // 📍 Location Logic
  const getCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "ස්ථානය ලබා ගැනීමට අවසර අවශ්‍යයි.");
        return;
      }
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocationText(
        `Lat: ${location.coords.latitude.toFixed(6)}, Lng: ${location.coords.longitude.toFixed(6)}`,
      );
    } catch (error) {
      Alert.alert("Error", "ස්ථානය ලබා ගැනීමට නොහැකි විය.");
    } finally {
      setIsLoadingLocation(false);
    }
  };

  // ⏰ Clock In/Out Logic
  const handleClockAction = () => {
    const now = new Date();
    if (!isClockedIn) {
      setIsClockedIn(true);
      setClockInTime(now);
      setClockOutTime(null);
      Alert.alert("Clocked In", `${now.toLocaleTimeString()} ට ඇතුළු විය.`);
    } else {
      setIsClockedIn(false);
      setClockOutTime(now);
      Alert.alert("Clocked Out", `${now.toLocaleTimeString()} ට පිටවිය.`);
    }
  };

  // 💾 Save Logic
  const saveAudit = () => {
    if (!clockInTime) {
      Alert.alert("Wait!", "කරුණාකර ප්‍රථමයෙන් Clock-In වන්න.");
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      Alert.alert("Success", "Audit details saved successfully!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    }, 1500);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <LinearGradient
        colors={["#BAE6FD", "#38BDF8", "#1E40AF"]}
        style={tw`px-4 pt-10 pb-6 rounded-b-[30px] shadow-md`}
      >
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`p-2 bg-white/20 rounded-full`}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={tw`ml-4`}>
            <Text style={tw`text-white text-xl font-bold`}>Audit Details</Text>
            <Text style={tw`text-blue-100 text-sm`}>{branchName}</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={tw`p-5 pb-10`}
        showsVerticalScrollIndicator={false}
      >
        <InfoCard title="Branch Name" value={branchName} icon="business" />

        {/* 2. Date Card */}
        <DateCard
          date={selectedDate}
          onTap={() => setIsCalendarVisible(true)}
        />

        {/* --- CUSTOM CALENDAR MODAL --- */}
        <Modal visible={isCalendarVisible} transparent animationType="fade">
          <View style={tw`flex-1 justify-center items-center bg-black/50 px-5`}>
            <View style={tw`bg-white rounded-3xl p-4 w-full shadow-2xl`}>
              <Text
                style={tw`text-[#1E40AF] text-lg font-bold mb-4 text-center`}
              >
                Select Audit Date
              </Text>

              <Calendar
                current={selectedDate}
                onDayPress={(day) => {
                  setSelectedDate(day.dateString);
                  setIsCalendarVisible(false);
                }}
                markedDates={{
                  [selectedDate]: { selected: true, selectedColor: "#1E40AF" },
                }}
                theme={{
                  todayTextColor: "#1E40AF",
                  dayTextColor: "#3B82F6",
                  arrowColor: "#1E40AF",
                  monthTextColor: "#3B82F6",
                  textDayFontWeight: "600",
                  textMonthFontWeight: "bold",
                }}
              />

              <TouchableOpacity
                onPress={() => setIsCalendarVisible(false)}
                style={tw`mt-4 py-3 bg-gray-300 rounded-xl items-center`}
              >
                <Text style={tw`text-gray-700 font-bold`}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <LocationCard
          location={locationText}
          isLoading={isLoadingLocation}
          onTap={getCurrentLocation}
        />

        {isClockedIn && clockInTime && (
          <ClockStatusCard isClockedIn={true} time={clockInTime} />
        )}
        {!isClockedIn && clockOutTime && (
          <ClockStatusCard isClockedIn={false} time={clockOutTime} />
        )}

        <TouchableOpacity
          onPress={handleClockAction}
          activeOpacity={0.8}
          style={tw`overflow-hidden rounded-2xl mb-6 shadow-lg`}
        >
          <LinearGradient
            colors={
              isClockedIn ? ["#F87171", "#B91C1C"] : ["#0EA5E9", "#1D4ED8"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={tw`flex-row justify-center items-center py-4`}
          >
            <Ionicons
              name={isClockedIn ? "log-out" : "log-in"}
              size={24}
              color="white"
            />
            <Text style={tw`text-white font-bold text-lg ml-2`}>
              {isClockedIn ? "Clock Out Now" : "Clock In Now"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <NotesCard value={notes} onChangeText={setNotes} />

        <TouchableOpacity
          onPress={saveAudit}
          disabled={isSaving}
          style={tw`${isSaving ? "bg-gray-400" : "bg-[#1E40AF]"} py-4 rounded-2xl items-center shadow-xl mt-2`}
        >
          {isSaving ? (
            <ActivityIndicator color="white" />
          ) : (
            <View style={tw`flex-row items-center`}>
              <Ionicons
                name="cloud-upload-outline"
                size={20}
                color="white"
                style={tw`mr-2`}
              />
              <Text style={tw`text-white font-bold text-lg`}>
                Finish & Save Audit
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuditDetailScreen;
