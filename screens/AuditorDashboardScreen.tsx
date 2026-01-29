import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import { RootStackParamList } from "../App";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AuditorDashboard"
>;

const AuditorDashboardScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused();

  const [userName, setUserName] = useState("Loading...");
  const [userRole, setUserRole] = useState("Loading...");
  const [district, setDistrict] = useState("Loading...");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({ pending: 0, assignedAudits: 0 });
  const [auditLogs, setAuditLogs] = useState<any>({});

  // Load user info
  useEffect(() => {
    const loadUserInfo = async () => {
      setUserName((await AsyncStorage.getItem("name")) || "Unknown User");
      setUserRole((await AsyncStorage.getItem("role")) || "Unknown Role");
      setDistrict((await AsyncStorage.getItem("district")) || "Unknown District");
    };
    loadUserInfo();
  }, []);

  // Load audits & stats
  const fetchDashboardData = async () => {
    if (!refreshing) setIsLoading(true);
    try {
      const raw = await AsyncStorage.getItem("auditLogs");
      const logs = raw ? JSON.parse(raw) : {};
      setAuditLogs(logs);

      const pending = Object.values(logs).filter((a: any) => !a.clockOut).length;
      const assignedAudits = 4; // Example
      setStats({ pending, assignedAudits });
    } catch (e) {
      console.warn("Failed to load dashboard data", e);
      setStats({ pending: 0, assignedAudits: 0 });
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isFocused) fetchDashboardData();
  }, [isFocused]);

  const audits = [
    { id: "1", branchName: "Colombo Main Branch", date: "2026-01-25" },
    { id: "2", branchName: "Kandy City Center", date: "2026-01-28" },
    { id: "3", branchName: "Galle Fort Branch", date: "2026-02-05" },
    { id: "4", branchName: "Matara Junction", date: "2026-02-10" },
  ];

  const renderAuditCard = ({ item }: { item: typeof audits[0] }) => {
    const log = auditLogs[item.id];
    const isDone = !!log?.clockOut;
    return (
      <TouchableOpacity
        activeOpacity={isDone ? 1 : 0.7}
        style={tw`bg-white border ${isDone ? "border-green-300" : "border-blue-300"} rounded-2xl px-4 py-4 flex-row items-center mb-4 shadow-sm`}
        onPress={() => {
          if (!isDone)
            navigation.navigate("AuditDetail", {
              auditId: item.id,
              branchName: item.branchName,
              dateText: item.date,
            });
        }}
      >
        <View style={tw`bg-blue-50 p-3 rounded-xl mr-4`}>
          <Ionicons name="business" size={24} color={isDone ? "#16A34A" : "#3B82F6"} />
        </View>
        <View style={tw`flex-1`}>
          <Text style={tw`text-[#1E3A8A] font-bold text-base`}>{item.branchName}</Text>
          <Text style={tw`text-gray-500 text-sm mt-1`}>
            <Ionicons name="calendar-outline" size={12} /> {item.date}
          </Text>
          {isDone && (
            <Text style={tw`text-green-600 text-xs mt-1`}>
              Clock In: {new Date(log.clockIn).toLocaleTimeString()} | Clock Out: {new Date(log.clockOut).toLocaleTimeString()}
            </Text>
          )}
        </View>
        {!isDone && <Ionicons name="chevron-forward" size={20} color="#3B82F6" />}
      </TouchableOpacity>
    );
  };

  const StatCard = ({ title, value, color }: { title: string; value: number; color: string }) => (
    <View style={tw`bg-white rounded-2xl p-4 border-l-4 border-${color} shadow mb-4`}>
      <Text style={tw`text-gray-600 text-sm`}>{title}</Text>
      <Text style={tw`text-2xl font-bold text-${color} mt-1`}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#BAE6FD", "#38BDF8", "#1E40AF"]} style={tw`px-6 pt-12 pb-10 rounded-b-[32px]`}>
        <View style={tw`flex-row justify-between items-center`}>
          <View>
            <Text style={tw`text-blue-900 text-sm opacity-80`}>Welcome,</Text>
            <Text style={tw`text-white text-2xl font-bold`}>Auditor Dashboard</Text>
            <Text style={tw`text-white text-sm mt-1`}>{userName} ({userRole})</Text>
            <Text style={tw`text-white text-sm mt-1`}>District: {district}</Text>
          </View>
          <TouchableOpacity onPress={fetchDashboardData} disabled={isLoading || refreshing} style={tw`bg-blue-600 p-3 rounded-lg`}>
            {isLoading || refreshing ? <ActivityIndicator color="white" /> : <Ionicons name="sync-outline" size={24} color="white" />}
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={tw`p-5`}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchDashboardData();
            }}
          />
        }
      >
        {/* Stats */}
        <StatCard title="Pending Audits" value={stats.pending} color="green" />
        <StatCard title="Assigned Audits" value={stats.assignedAudits} color="blue" />

        {/* Audit List */}
        <Text style={tw`text-gray-800 font-semibold text-lg mt-4 mb-2`}>Assigned Audits</Text>
        <FlatList
          data={audits}
          renderItem={renderAuditCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuditorDashboardScreen;
