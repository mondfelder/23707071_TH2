import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Watermark } from '@components/Watermark';
import { useProductsQuery } from '@services/productApi';
import { useCartStore } from '@stores/cartStore';
import { STUDENT, VARIANT } from '@constants/student';
import { theme } from '@constants/theme';

export const DetailScreen = ({ route, navigation }: any) => {
  const { id } = route.params;
  const { data } = useProductsQuery();
  const product = data?.find((p) => String(p.id) === String(id));
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    if (!product) return;
    ReactNativeHapticFeedback.trigger(VARIANT.hapticOnAdd as any, {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });
    addItem(product);
    Alert.alert('Thành công', `Đã thêm món vào giỏ! [${STUDENT.mssv}]`);
  };

  if (!product) return null;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={styles.backText}>← Chi tiết món</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{product.price.toLocaleString('vi-VN')} đ</Text>
        <Text style={styles.room}>Giao nội khu · nhận tận phòng</Text>
        <Text style={styles.desc} numberOfLines={3}>{product.description}</Text>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.btn} onPress={handleAdd}>
          <Text style={styles.btnText}>Thêm vào giỏ · Haptic</Text>
        </TouchableOpacity>
      </View>
      <Watermark />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.surface },
  backBtn: { padding: 14 },
  backText: { color: theme.colors.primary, fontWeight: 'bold', fontSize: 16 },
  scroll: { padding: 20, alignItems: 'center' },
  image: { width: '100%', height: 220, marginBottom: 16 },
  title: { fontSize: 18, fontWeight: 'bold', color: theme.colors.text, textAlign: 'center', marginBottom: 8 },
  price: { fontSize: 20, fontWeight: 'bold', color: theme.colors.primary, marginBottom: 4 },
  room: { fontSize: 13, color: theme.colors.textLight, marginBottom: 14 },
  desc: { fontSize: 14, color: theme.colors.textLight, lineHeight: 20, textAlign: 'center' },
  bottomBar: { padding: 16, borderTopWidth: 1, borderColor: theme.colors.border },
  btn: { backgroundColor: theme.colors.primary, height: 48, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});