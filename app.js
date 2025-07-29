import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

async function veriGetir() {
  const veriAlani = document.getElementById("veriler");
  veriAlani.innerHTML = "<p>⏳ Yükleniyor...</p>";

  const colRef = collection(db, "mac_analizleri");
  const snapshot = await getDocs(colRef);
  veriAlani.innerHTML = "";

  snapshot.forEach((d) => {
    const veriler = d.data();
    const div = document.createElement("div");
    div.className = "box has-background-grey-dark has-text-light";
    div.innerHTML = `
      <p><strong>Ev Sahibi:</strong> ${veriler.ev_sahibi || "-"}</p>
      <p><strong>Deplasman:</strong> ${veriler.deplasman || "-"}</p>
      <p><strong>Canlı:</strong> ${veriler.canli ? "✅" : "❌"}</p>
      <button class="button is-danger is-small mt-2">Sil</button>
    `;
    div.querySelector("button").onclick = async () => {
      await deleteDoc(doc(db, "mac_analizleri", d.id));
      alert("Silindi");
      location.reload();
    };
    veriAlani.appendChild(div);
  });
}

veriGetir();