import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Product } from '@services/productApi';
import { theme } from '@constants/theme';
import { VARIANT } from '@constants/student';
import { useCartStore } from '@stores/cartStore';

export const ProductCard = ({
  product,
  onPress,
}: {
  product: Product;
  onPress: () => void;
}) => {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    // Ép kiểu trigger để TypeScript không báo lỗi
    ReactNativeHapticFeedback.trigger(VARIANT.hapticOnAdd as any, {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });
    addItem(product);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
      <View style={styles.bottomRow}>
        <Text style={styles.price}>{product.price.toLocaleString('vi-VN')} đ</Text>
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    margin: 6,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'space-between',
  },
  image: { width: '100%', height: 100, marginBottom: 8 },
  title: { fontSize: 13, fontWeight: '600', color: theme.colors.text, height: 34 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  price: { fontSize: 13, fontWeight: 'bold', color: theme.colors.primary },
  addBtn: { backgroundColor: theme.colors.primary, width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  addBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});