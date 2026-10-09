import { useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { BASE_SHIP_FEE } from "@constants/student";

const KTX_COORDS = { lat: 10.8222, lng: 106.6875 };

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export const useCampusLocation = () => {
  const [status, setStatus] = useState<
    "idle" | "granted" | "denied" | "blocked"
  >("idle");
  const [km, setKm] = useState<number | null>(null);
  const [fee, setFee] = useState<number | null>(null);

  const requestPermission = async () => {
    try {
      if (Platform.OS === "android") {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (result === PermissionsAndroid.RESULTS.GRANTED) {
          setStatus("granted");
          // Mock tọa độ trên máy ảo
          const userLat = 10.83;
          const userLng = 106.68;
          const calculatedKm = parseFloat(
            haversine(userLat, userLng, KTX_COORDS.lat, KTX_COORDS.lng).toFixed(
              1,
            ),
          );
          setKm(calculatedKm);
          // Công thức B: BASE_SHIP_FEE + km * 1500 + 2000
          setFee(BASE_SHIP_FEE + Math.round(calculatedKm * 1500) + 2000);
        } else if (result === PermissionsAndroid.RESULTS.DENIED) {
          setStatus("denied");
        } else if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          setStatus("blocked");
        }
      } else {
        setStatus("granted");
        setKm(1.2);
        setFee(BASE_SHIP_FEE + Math.round(1.2 * 1500) + 2000);
      }
    } catch {
      setStatus("denied");
    }
  };

  return { status, km, fee, requestPermission };
};
