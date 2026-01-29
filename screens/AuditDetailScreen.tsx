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
  const navigation = useNavigation<any>();

  const { branchName, dateText, auditId } = route.params || {
    branchName: "Unknown Branch",
    dateText: new Date().toISOString().split("T")[0],
    auditId: "unknown",
  };

  const [selectedDate, setSelectedDate] = useState(dateText);
  const [showCalendar, setShowCalendar] = useState(false);
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [clockOutTime, setClockOutTime] = useState<Date | null>(null);
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [attachment, setAttachment] = useState<any>(null);

  // SAVE audit to AsyncStorage
  const saveAudit = async (data: any) => {
    try {
      const raw = await AsyncStorage.getItem("auditLogs");
      const logs = raw ? JSON.parse(raw) : {};
      logs[auditId] = data;
      await AsyncStorage.setItem("auditLogs", JSON.stringify(logs));
    } catch (e) {
      console.error("Failed to save audit:", e);
    }
  };

  // CLOCK IN
  const handleClockIn = async () => {
    if (clockInTime) {
      Alert.alert("Already Clocked In");
      return;
    }
    const now = new Date();
    setClockInTime(now);

    await saveAudit({
      auditId,
      branchName,
      date: selectedDate,
      clockIn: now.toISOString(),
    });

    Alert.alert("Clock In", "Clocked in successfully");
  };

  // ATTACH FILE
  const handleAttachFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      multiple: false,
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      setAttachment(result.assets[0]);
    }
  };

  // FINISH & SAVE (Clock Out automatically)
  const finishAudit = async () => {
    if (!clockInTime) {
      Alert.alert("Error", "Please Clock In first");
      return;
    }

    setIsSaving(true);
    const now = new Date();
    setClockOutTime(now);

    const auditData = {
      auditId,
      branchName,
      date: selectedDate,
      clockIn: clockInTime.toISOString(),
      clockOut: now.toISOString(),
      notes,
      attachment,
      completedAt: now.toISOString(),
    };

    await saveAudit(auditData);

    setIsSaving(false);

    // Navigate to dashboard after saving
    navigation.reset({
      index: 0,
      routes: [{ name: "AuditorDashboard" }],
    });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar barStyle="light-content" />

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
        <DateCard date={selectedDate} onTap={() => setShowCalendar(true)} />

        <Modal visible={showCalendar} transparent>
          <View style={tw`flex-1 bg-black/50 justify-center px-6`}>
            <View style={tw`bg-white rounded-3xl p-4`}>
              <Calendar
                onDayPress={(day) => {
                  setSelectedDate(day.dateString);
                  setShowCalendar(false);
                }}
                markedDates={{
                  [selectedDate]: { selected: true },
                }}
              />
              <TouchableOpacity
                onPress={() => setShowCalendar(false)}
                style={tw`mt-4 py-3 bg-gray-300 rounded-xl`}
              >
                <Text style={tw`text-center font-bold`}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {clockInTime && <ClockStatusCard isClockedIn time={clockInTime} />}
        {clockOutTime && <ClockStatusCard isClockedIn={false} time={clockOutTime} />}

        {!clockInTime && (
          <TouchableOpacity
            onPress={handleClockIn}
            style={tw`rounded-2xl overflow-hidden my-4`}
          >
            <LinearGradient
              colors={["#0EA5E9", "#1D4ED8"]}
              style={tw`py-4 flex-row justify-center items-center`}
            >
              <Ionicons name="log-in" size={22} color="white" />
              <Text style={tw`text-white font-bold ml-2`}>Clock In</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={handleAttachFile}
          style={tw`border border-dashed border-blue-400 rounded-2xl p-4 mb-4`}
        >
          <Text style={tw`text-blue-800 font-semibold`}>
            {attachment ? attachment.name : "Attach file"}
          </Text>
        </TouchableOpacity>

        <NotesCard value={notes} onChangeText={setNotes} />

        <TouchableOpacity
          onPress={finishAudit}
          disabled={!clockInTime || isSaving}
          style={tw`bg-[#1E40AF] py-4 rounded-2xl items-center mt-4`}
        >
          {isSaving ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={tw`text-white font-bold text-lg`}>
              Finish & Save Audit
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuditDetailScreen;
