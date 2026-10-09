import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Watermark } from "@components/Watermark";
import { useCartStore } from "@stores/cartStore";
import { ROOM_LABEL } from "@constants/student";
import { theme } from "@constants/theme";

export const CartScreen = () => {
  const { items, changeQty, removeItem, totalAmount } = useCartStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>GIỎ HÀNG</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => String(item.product.id)}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle} numberOfLines={1}>
                {item.product.title}
              </Text>
              <Text style={styles.itemPrice}>
                x{item.quantity}{" "}
                {(item.product.price * item.quantity).toLocaleString("vi-VN")} đ
              </Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() => changeQty(item.product.id, -1)}
                style={styles.qtyBtn}
              >
                <Text style={styles.qtyText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changeQty(item.product.id, 1)}
                style={styles.qtyBtn}
              >
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => removeItem(item.product.id)}
                style={styles.delBtn}
              >
                <Text style={styles.delText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.shipCard}>
          <Text style={styles.shipTitle}>Giao đến {ROOM_LABEL}</Text>
          <Text style={styles.shipSub}>Chưa ước tính phí — mở tab Tôi</Text>
        </View>
        <Text style={styles.totalText}>
          Tổng hàng: {totalAmount().toLocaleString("vi-VN")} đ
        </Text>
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
  itemRow: {
    flexDirection: "row",
    backgroundColor: theme.colors.surface,
    marginHorizontal: 12,
    marginTop: 8,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  itemTitle: { fontSize: 14, fontWeight: "600", color: theme.colors.text },
  itemPrice: { fontSize: 13, color: theme.colors.textLight, marginTop: 4 },
  actions: { flexDirection: "row", alignItems: "center" },
  qtyBtn: {
    width: 26,
    height: 26,
    backgroundColor: theme.colors.border,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
    borderRadius: 4,
  },
  qtyText: { fontSize: 16, fontWeight: "bold", color: theme.colors.text },
  delBtn: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 6,
  },
  delText: { color: "#FFF", fontSize: 12 },
  footer: {
    padding: 16,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderColor: theme.colors.border,
  },
  shipCard: {
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  shipTitle: { fontWeight: "bold", color: theme.colors.text },
  shipSub: { color: theme.colors.secondary, fontSize: 12 },
  totalText: { fontSize: 16, fontWeight: "bold", color: theme.colors.primary },
});
