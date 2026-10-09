import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Watermark } from "@components/Watermark";
import { STUDENT, examStamp } from "@constants/student";
import { theme } from "@constants/theme";
import { useAuthStore } from "@stores/authStore";
import { useCampusLocation } from "@hooks/useCampusLocation";

export const MeScreen = () => {
  const logout = useAuthStore((s) => s.logout);
  const token = useAuthStore((s) => s.token);
  const { status, km, fee, requestPermission } = useCampusLocation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>TÔI · LOCATION</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{STUDENT.hoTen}</Text>
        <Text style={styles.mssv}>
          {STUDENT.mssv} · #{examStamp()}
        </Text>
        <Text style={styles.token}>Token: {token?.slice(0, 18)}...</Text>

        <View style={styles.locCard}>
          <Text
            style={[
              styles.status,
              {
                color:
                  status === "granted"
                    ? theme.colors.success
                    : theme.colors.error,
              },
            ]}
          >
            Quyền: {status}
          </Text>
          {status === "granted" && km !== null && fee !== null && (
            <>
              <Text style={styles.km}>≈ {km} km tới cổng KTX</Text>
              <Text style={styles.feeLabel}>
                Phí ship ước tính (công thức B):
              </Text>
              <Text style={styles.feeVal}>{fee.toLocaleString("vi-VN")} đ</Text>
            </>
          )}
        </View>

        <TouchableOpacity style={styles.btn} onPress={requestPermission}>
          <Text style={styles.btnText}>Lấy vị trí ước tính ship</Text>
        </TouchableOpacity>

        {status === "blocked" && (
          <TouchableOpacity
            style={[styles.btn, styles.outlineBtn]}
            onPress={() => Linking.openSettings()}
          >
            <Text style={[styles.btnText, { color: theme.colors.primary }]}>
              Mở Cài đặt (blocked)
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.btn, styles.logoutBtn]}
          onPress={logout}
        >
          <Text style={styles.btnText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>

      <Watermark />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: {
    backgroundColor: theme.colors.primary,
    padding: 14,
    alignItems: "center",
  },
  headerText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
  content: { flex: 1, padding: 20, alignItems: "center" },
  name: { fontSize: 20, fontWeight: "bold", color: theme.colors.text },
  mssv: { fontSize: 14, color: theme.colors.textLight, marginTop: 4 },
  token: {
    fontSize: 12,
    color: theme.colors.textLight,
    marginTop: 2,
    marginBottom: 20,
  },
  locCard: {
    width: "100%",
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 20,
  },
  status: { fontWeight: "bold", fontSize: 15, marginBottom: 6 },
  km: { color: theme.colors.text, fontSize: 14 },
  feeLabel: { color: theme.colors.textLight, fontSize: 13, marginTop: 6 },
  feeVal: { color: theme.colors.secondary, fontSize: 18, fontWeight: "bold" },
  btn: {
    width: "100%",
    height: 46,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  btnText: { color: "#FFF", fontWeight: "bold" },
  outlineBtn: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  logoutBtn: { backgroundColor: theme.colors.error, marginTop: 12 },
});
