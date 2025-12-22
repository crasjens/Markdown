# 🏆 Det Ultimative GFM Master Cheat Sheet

## 1. Overskrifter & Struktur
# H1 Titel
## H2 Sektion
### H3 Undersektion
#### H4 Detalje
##### H5 Lille
###### H6 Mindste

---

## 2. Tekstformatering
* **Fed:** **Tekst** eller __Tekst__
* *Kursiv:* *Tekst* eller _Tekst_
* ***Fed & Kursiv:*** ***Tekst***
* ~~Overstreget:~~ ~~Tekst~~
* `Inline kode:` `Tekst`

---

## 3. Lister & Opgaver

### Punkttegn & Nummerering
* Punkt 1
  * Underpunkt
1. Første
2. Anden
   1. Under-nummerering

### Task Lists (Interaktive)
- [x] Denne opgave er fuldført
- [ ] Denne opgave mangler stadig

---

## 4. Alerts & Callouts (Officiel GFM)
> [!NOTE]
> Bruges til vigtig baggrundsviden.

> [!TIP]
> Smarte genveje eller gode råd.

> [!IMPORTANT]
> Ting brugeren absolut skal vide.

> [!WARNING]
> Advarsler om potentielle fejl.

> [!CAUTION]
> Risiko for kritiske fejl eller tab af data.

---

## 5. Tabeller
| Funktion | Justering | Eksempel |
| :--- | :---: | ---: |
| Venstrestillet | Centreret | Højrestillet |
| Linje 2 | `center` | 1.000,00 |
| Multilinje | Brug <br> | Linje A <br> Linje B |

---

## 6. Kodeblokke (Syntax Highlighting)
Herunder ser du, hvordan man laver blokkene:

```python
def hilsen():
    print("Hej fra Python!")
```

```html
<h1>Hej fra HTML!</h1>
```

---

## 7. Links, Billeder & Video
* **Link:** [GitHub](https://github.com)
* **Autolink:** https://github.com
* **Billede:** ![Alt-tekst](https://github.com/fluidicon.png)
* **Video:** ![Beskrivelse](sti/til/video.mp4)

---

## 8. Citater & Fodnoter
> Dette er et citat.
>> Dette er et indlejret citat.

Her er en tekst med en fodnote.[^1]

[^1]: Dette er selve fodnoten, som placeres i bunden af dokumentet.

---

## 9. Matematik (LaTeX)
Inline: $a^2 + b^2 = c^2$

Blok:
$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

---

## 10. Organisering & Hemmeligheder

### Sammenfoldelig sektion
<details>
<summary>Klik her for at se mere</summary>

Dette indhold er skjult, indtil man trykker på pilen.
</details>

### Kommentarer (Usynlige i renderet version)
### Escape tegn (Viser tegnene i stedet for formatering)
\*Dette er ikke kursiv\*
\# Dette er ikke en overskrift
\[Dette er ikke et link\]

---

## 11. GitHub Specifikt
* **Mentions:** @brugernavn
* **Issues:** #123
* **Emojis:** :rocket: :art: :tada: :white_check_mark: