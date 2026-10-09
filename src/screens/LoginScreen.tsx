import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Watermark } from "@components/Watermark";
import { STUDENT, examStamp } from "@constants/student";
import { theme } from "@constants/theme";
import { useAuthStore } from "@stores/authStore";

export const LoginScreen = () => {
  const [val, setVal] = useState("");
  const login = useAuthStore((s) => s.login);

  const handleLogin = () => {
    if (!val.trim()) {
      Alert.alert("Lỗi", "Vui lòng không để trống số điện thoại");
      return;
    }
    const token = `ktxgo-${STUDENT.mssv}-${examStamp()}`;
    login(token);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>KTXGO</Text>
        <Text style={styles.subTitle}>Giao đồ tận phòng ký túc xá</Text>

        <View style={styles.inputBox}>
          <TextInput
            placeholder={`Số điện thoại — 09${STUDENT.mssv.slice(-7)}`}
            keyboardType="phone-pad"
            value={val}
            onChangeText={setVal}
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btnText}>Vào cửa hàng</Text>
        </TouchableOpacity>

        <Text style={styles.note}>Auth Stack · chưa có token</Text>
      </View>

      <Watermark />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    alignItems: "center",
  },
  logo: {
    fontSize: 36,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 4,
  },
  subTitle: { fontSize: 14, color: theme.colors.textLight, marginBottom: 32 },
  inputBox: {
    width: "100%",
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 16,
  },
  input: {
    paddingHorizontal: 16,
    height: 48,
    fontSize: 15,
    color: theme.colors.text,
  },
  btn: {
    width: "100%",
    height: 48,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  note: { marginTop: 24, fontSize: 12, color: theme.colors.textLight },
});
