import { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { API_PREFIX, type HealthResponse } from "@app/shared";

// Android Emulator dùng 10.0.2.2 để trỏ về máy host.
// iOS Simulator dùng localhost. Điện thoại thật: đổi thành IP LAN của máy.
const HOST = Platform.OS === "android" ? "10.0.2.2" : "localhost";
const API_URL = `http://${HOST}:4000${API_PREFIX}`;

export default function App() {
  const [status, setStatus] = useState("Đang kiểm tra API...");

  useEffect(() => {
    fetch(`${API_URL}/health`)
      .then((res) => res.json() as Promise<HealthResponse>)
      .then((data) => setStatus(`API: ${data.status}`))
      .catch(() => setStatus("Không kết nối được API"));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mobile</Text>
      <Text>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  title: { fontSize: 20, fontWeight: "bold" },
});
