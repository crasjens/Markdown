# 🏆 Universal Markdown Cheat Sheet
> Dette dokument er optimeret til at se ens ud på GitHub og GitHub Pages.

---

## 1. Tekst & Struktur
Man kan bruge **fed skrift**, *kursiv* eller ~~overstregning~~. 

For at lave et linjeskift uden at starte et nyt afsnit,  
skal du lave to mellemrum i slutningen af linjen.

---

## 2. Lister & Opgaver
* Standard punktliste
  * Indrykket punkt
1. Nummereret liste
2. Punkt nummer to

- [x] En opgave der er klaret
- [ ] En opgave der mangler

---

## 3. Citater & "Falske" Alerts
Da GitHub Pages ikke altid forstår `[!NOTE]`, bruger vi her den klassiske metode, som virker overalt:

> **NOTE:** Dette er en vigtig besked i et citat-felt.
> Det virker på alle platforme.

---

## 4. Tabeller
Husk altid en tom linje over din tabel for at sikre, at den renderes korrekt.

| Funktion | Status | Bemærkning |
| :--- | :---: | :--- |
| GFM Tabeller | ✅ Virker | Husk `|` og `-` |
| Formatering | `Kode` | Kan bruges i celler |

---

## 5. Kodeblokke
Syntax highlighting virker på begge platforme.

```javascript
function helloWorld() {
  console.log("Dette virker overalt!");
}
```

---

## 6. Links & Billeder
* Link: [Besøg Google](https://google.com)
* Billede: ![GitHub Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)

---

## 7. Emojis
Brug de rigtige symboler i stedet for koder som `:rocket:`, hvis du vil være 100% sikker uden plugins:
🚀 💡 ✅ ❌ ⚠️

---

## 8. Sammenfoldeligt indhold (HTML)
Dette er den sikreste måde at skjule tekst på, da begge motorer tillader disse tags:

<details>
<summary>Klik her for at se detaljer</summary>

Dette indhold gemmes væk, indtil brugeren klikker.
</details>

---

## 9. Matematiske formler (Billed-metoden)
Hvis du vil undgå JavaScript-fejl på din hjemmeside, er det sikrest at indsætte formler som billeder, eller bruge standard tekst:
**E = mc²**