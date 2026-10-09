import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { Watermark } from '@components/Watermark';
import { ProductCard } from '@components/ProductCard';
import { useProductsQuery, Product } from '@services/productApi';
import { useDebouncedValue } from '@hooks/useDebouncedValue';
import { STUDENT, ROOM_LABEL, DEBOUNCE_MS } from '@constants/student';
import { theme } from '@constants/theme';

const FlashListAny: any = FlashList;

export const HomeScreen = ({ navigation }: any) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, DEBOUNCE_MS);
  const { data, isPending, isError, refetch, isRefetching } = useProductsQuery();

  const filtered = (data || []).filter((p) =>
    p.title.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>KTXGO</Text>
        <Text style={styles.room}>Giao tận {ROOM_LABEL}</Text>
      </View>

      <View style={styles.searchBox}>
        <TextInput
          placeholder={`Tìm món (debounce) — ${STUDENT.mssv}`}
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
        />
      </View>

      {isPending ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.infoText}>Đang tải món...</Text>
        </View>
      ) : isError ? (
        <View style={styles.center}>
          <Text style={[styles.infoText, { color: theme.colors.error, fontWeight: 'bold' }]}>
            {STUDENT.mssv}
          </Text>
          <Text style={styles.infoText}>Không tải được dữ liệu món.</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={() => refetch()}>
            <Text style={styles.retryBtnText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.listWrapper}>
          <FlashListAny
            data={filtered}
            numColumns={2}
            keyExtractor={(item: Product) => `${STUDENT.mssv}-${item.id}`}
            renderItem={({ item }: { item: Product }) => (
              <ProductCard
                product={item}
                onPress={() =>
                  navigation.navigate('Detail', { id: String(item.id) })
                }
              />
            )}
            estimatedItemSize={190}
            refreshing={isRefetching}
            onRefresh={refetch}
          />
        </View>
      )}

      {/* Watermark ở đáy màn hình theo số cuối MSSV 1 */}
      <Watermark />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: {
    backgroundColor: theme.colors.primary,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  room: { color: '#FFF', fontSize: 13 },
  searchBox: { padding: 10 },
  searchInput: {
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  infoText: { marginTop: 10, color: theme.colors.textLight, fontSize: 14 },
  retryBtn: {
    marginTop: 14,
    backgroundColor: theme.colors.error,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 6,
  },
  retryBtnText: { color: '#FFF', fontWeight: 'bold' },
  listWrapper: { flex: 1 },
});