import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3LKLEgiu_hCwZjknwtvhGyG0qEhInc6E",
  authDomain: "futbol-ai-uygulama.firebaseapp.com",
  projectId: "futbol-ai-uygulama",
  storageBucket: "futbol-ai-uygulama.firebasestorage.app",
  messagingSenderId: "748986759798",
  appId: "1:748986759798:web:21a96134cc33ab74dabd57"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Home() {
  const [veriler, setVeriler] = useState<any[]>([]);
  const [filtre, setFiltre] = useState("");

  useEffect(() => {
    const veriCek = async () => {
      const q = query(collection(db, "mac_analizleri"), orderBy("zaman", "desc"));
      const querySnapshot = await getDocs(q);
      const liste: any[] = [];
      querySnapshot.forEach((doc) => {
        liste.push({ id: doc.id, ...doc.data() });
      });
      setVeriler(liste);
    };
    veriCek();
  }, []);

  const filtreliVeriler = veriler.filter((v) =>
    v.ev_sahibi?.toLowerCase().includes(filtre.toLowerCase()) ||
    v.deplasman?.toLowerCase().includes(filtre.toLowerCase())
  );

  return (
    <div style={{ padding: 24 }}>
      <h1>📊 Maç Analiz Paneli</h1>

      <input
        type="text"
        placeholder="Takım adıyla filtrele..."
        value={filtre}
        onChange={(e) => setFiltre(e.target.value)}
        style={{ padding: 8, margin: "16px 0", width: "100%" }}
      />

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Ev Sahibi</th>
            <th>Deplasman</th>
            <th>Zaman</th>
          </tr>
        </thead>
        <tbody>
          {filtreliVeriler.map((v, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #ccc" }}>
              <td>{v.ev_sahibi}</td>
              <td>{v.deplasman}</td>
              <td>{v.zaman?.toDate?.().toLocaleString() || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
