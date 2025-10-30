import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, Pressable, Platform, Alert } from "react-native";
//React – samotná knihovna pro práci s komponentami (bez ní by kód nefungoval).
//{ useState } – tzv. hook, který nám umožní ukládat a měnit data uvnitř komponenty (např. text z formuláře).
//SafeAreaView – obal, který zajistí, že obsah nezačne pod horní lištou (např. pod výřezem u iPhonu).
//View – základní „div“ kontejner (jako <div> v HTML).
//Text – komponenta pro text.
//TextInput – pole, do kterého můžeš psát.
//Pressable – tlačítko reagující na dotyk.
//Platform – umožní detekovat, jestli běžíš na Androidu nebo iOS.
//Alert – jednoduché systémové upozornění (popup).

const colors = {
  bg: "#0b1220", //background barva pozadí celé obrazovky (SafeAreaView)
  text: "#e6eaf2", //hlavní barva textu pro nadpisy a běžný text
  muted: "#aab3c5", //tlumená barva pro popisky, méně důležité informace
  card: "#111a2b", // pozadí „karty“ nebo formuláře např. okno, ve kterém jsou vstupy
  border: "#1b2740", //barva ohraničení linky okolo inputů nebo karet
  accent: "#7aa2ff", //zvýrazňující barva tlačítko „Uložit“ nebo aktivní prvek
};

//struktura zápisu do deníku
type Entry = {
  id: string; // nikátní identifikátor
  createdAt: string;     // ISO datum/čas
  severity: number;      // 0–10
};

//hlavni funkce
export default function App() {
//useState vytváří proměnnou se stavem + funkci, jak ji měnit.
//severityInput je aktuální text v poli (např. „7“).
//setSeverityInput() mění tu hodnotu, když uživatel něco napíše.
//"5" je výchozí hodnota.
  const [severityInput, setSeverityInput] = useState("5");
//lastEntry = naposledy uložený záznam (na začátku žádný → null),
//setLastEntry() = funkce, která uloží nový záznam.
  const [lastEntry, setLastEntry] = useState<Entry | null>(null);


const onSave = () => {
  //Převede text (např. "7") na číslo 7.
  const n = Number(severityInput);
  //Ověří, že číslo je mezi 0–10, jinak ukáže upozornění.
  if (!Number.isFinite(n) || n < 0 || n > 10) {
    Alert.alert("Zadej číslo 0–10");
    return;
  }

  const now = new Date().toISOString();
  //Vezme aktuální čas v ISO formátu.
  const entry: Entry = {
    id: String(Date.now()),
    createdAt: now,
    severity: n,
  };
  //Uloží nový záznam do stavu → React vykreslí obrazovku znovu.
  setLastEntry(entry);
  //Resetuje vstupní pole zpět na výchozí hodnotu.
  setSeverityInput("5");
};

}
//return (...) – co se má vykreslit na obrazovku.
return (
  
  <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
    <View style={{ padding: 16 }}>
      <Text style={{ color: colors.text, fontSize: 24, fontWeight: "700" }}>
        Atopický deník
      </Text>
      <Text style={{ color: colors.muted, marginTop: 8 }}>
        Krok 3: jedno pole + uložení do paměti (ne do úložiště).
      </Text>