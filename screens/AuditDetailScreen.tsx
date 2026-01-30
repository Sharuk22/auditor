import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";
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
import { NotesCard } from "./widgets/NotesCard";

const AuditDetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();

  const { branchName, dateText, auditId } = route.params || {
    branchName: "Unknown",
    dateText: new Date().toISOString().split("T")[0],
    auditId: "unknown",
  };

  // States
  const [selectedDate, setSelectedDate] = useState(dateText);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [clockOutTime, setClockOutTime] = useState<Date | null>(null);
  const [notes, setNotes] = useState("");
  const [attachment, setAttachment] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Save to AsyncStorage
  const saveClockEventToDatabase = async (data: any) => {
    const key = "clockEvents";
    const existingRaw = await AsyncStorage.getItem(key);
    const existing = existingRaw ? JSON.parse(existingRaw) : {};

    existing[data.auditId] = {
      ...existing[data.auditId],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    await AsyncStorage.setItem(key, JSON.stringify(existing));
  };

  // CLOCK IN / CLOCK OUT = FINISH & SAVE
  const handleClockAction = async () => {
    const now = new Date();

    // CLOCK IN
    if (!isClockedIn) {
      setIsClockedIn(true);
      setClockInTime(now);
      setClockOutTime(null);

      await saveClockEventToDatabase({
        auditId,
        branchName,
        date: selectedDate,
        clockInTime: now.toISOString(),
        notes,
        attachment,
      });

      Alert.alert("Clocked In", now.toLocaleTimeString());
      return;
    }

    // CLOCK OUT = FINISH AUDIT
    setIsSaving(true);
    setIsClockedIn(false);
    setClockOutTime(now);

    await saveClockEventToDatabase({
      auditId,
      branchName,
      date: selectedDate,
      clockInTime: clockInTime?.toISOString(),
      clockOutTime: now.toISOString(),
      notes,
      attachment,
    });

    setIsSaving(false);

    Alert.alert("Audit Completed", "Audit finished & saved successfully", [
      {
        text: "OK",
        onPress: () =>
          navigation.reset({
            index: 0,
            routes: [{ name: "AuditorDashboard" as never }],
          }),
      },
    ]);
  };

  // Attach file
  const handleAttachFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      multiple: false,
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      const file = result.assets[0];
      setAttachment({
        name: file.name,
        uri: file.uri,
        size: file.size,
        mimeType: file.mimeType,
      });
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <LinearGradient
        colors={["#BAE6FD", "#38BDF8", "#1E40AF"]}
        style={tw`px-4 pt-10 pb-6 rounded-b-[30px]`}
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

      <ScrollView contentContainerStyle={tw`p-5 pb-10`}>
        <InfoCard title="Branch Name" value={branchName} icon="business" />

        <DateCard date={selectedDate} onTap={() => setIsCalendarVisible(true)} />

        {/* Calendar */}
        <Modal visible={isCalendarVisible} transparent animationType="fade">
          <View style={tw`flex-1 bg-black/50 justify-center px-5`}>
            <View style={tw`bg-white rounded-3xl p-4`}>
              <Calendar
                current={selectedDate}
                onDayPress={(day) => {
                  setSelectedDate(day.dateString);
                  setIsCalendarVisible(false);
                }}
                markedDates={{
                  [selectedDate]: { selected: true, selectedColor: "#1E40AF" },
                }}
              />
            </View>
          </View>
        </Modal>

        {isClockedIn && clockInTime && (
          <ClockStatusCard isClockedIn time={clockInTime} />
        )}
        {!isClockedIn && clockOutTime && (
          <ClockStatusCard isClockedIn={false} time={clockOutTime} />
        )}

        {/* Attach file */}
        <TouchableOpacity
          onPress={handleAttachFile}
          style={tw`mb-4 p-4 border border-dashed border-blue-400 rounded-2xl flex-row`}
        >
          <Ionicons name="attach" size={20} color="#1E40AF" />
          <Text style={tw`ml-2`}>
            {attachment ? attachment.name : "Attach file"}
          </Text>
        </TouchableOpacity>

        <NotesCard value={notes} onChangeText={setNotes} />

        {/* CLOCK BUTTON */}
        <TouchableOpacity
          onPress={handleClockAction}
          disabled={isSaving}
          style={tw`mt-6 rounded-2xl overflow-hidden`}
        >
          <LinearGradient
            colors={
              isClockedIn ? ["#F87171", "#B91C1C"] : ["#0EA5E9", "#1D4ED8"]
            }
            style={tw`py-4 flex-row justify-center items-center`}
          >
            {isSaving ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Ionicons
                  name={isClockedIn ? "checkmark-done" : "log-in"}
                  size={24}
                  color="white"
                />
                <Text style={tw`text-white text-lg font-bold ml-2`}>
                  {isClockedIn ? "Finish & Save Audit" : "Clock In Now"}
                </Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuditDetailScreen;
