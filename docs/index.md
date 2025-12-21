d# Markdown Cheat Sheet

Dette dokument viser de mest almindelige og udvidede muligheder i Markdown.

---

## Overskrifter

# H1
## H2
### H3
#### H4
##### H5
###### H6

---

## Typografi

**Bold**  
_Italic_  
**_Bold + italic_**  
~~Strikethrough~~  
`Inline code`

> Blockquote

---
<div style="width:120px; height:40px; background:#ffa500; border:1px solid #ccc;"></div>

This is the orange colour I think we should use `#ffa500`, what do you think?

## Lister

### Punktlister

- Punkt
  - Underpunkt
    - Under-underpunkt

### Nummererede lister

1. Første
2. Anden
3. Tredje

### Opgavelister

- [ ] Uafsluttet
- [x] Afsluttet

---

## Links

[Linktekst](https://example.com)  
[Link med titel](https://example.com "Titeltekst")

---

## Billeder

![Alt-tekst](https://example.com/billede.png)

---
<h2>GeoJSON Map</h2>
<div id="map" style="height: 500px;"></div>

<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

<script>
// Dit GeoJSON
const geojsonData = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": 1,
      "properties": { "ID": 0 },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [-90,35],
            [-90,30],
            [-85,30],
            [-85,35],
            [-90,35]
          ]
        ]
      }
    }
  ]
};

// Opret kort
const map = L.map('map').setView([32.5, -87.5], 6);

// Baggrundskort
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19
}).addTo(map);

// Tilføj GeoJSON
L.geoJSON(geojsonData).addTo(map);
</script>




---

## Kodeblokke

```javascript
console.log('Hello world');
```

## Tabeller

| Kolonne 1 | Kolonne 2 | Kolonne 3 |
| --------- | --------- | --------- |
| Celle A   | Celle B   | Celle C   |
| Celle D   | Celle E   | Celle F   |

---

## Escape af tegn

\*stjerne\*
\# hashtag

---

## Autolinks (GitHub)

https://github.com
<https://github.com>

---

## Footnotes (GitHub)

Tekst med fodnote.[^1]

[^1]: Dette er fodnoten.

---
## Sammenfoldelige sektioner (GitHub)

<details>
<summary>Klik for at åbne</summary>

Indhold her.

</details>

---
## Emojis (GitHub)

:smile:
:rocket:
:thumbsup:

---

## Mentions (GitHub)

@brugernavn
#123 issue reference

---

## Task-lister i PR/Issues (GitHub)

- [ ] Opgave 1
- [x] Opgave 2

---

## Definition Lists (GFM understøtter ikke officielt, men nogle renderere gør)

Term
: Definition

---

## Math (hvis renderer understøtter det)

Inline: $E = mc^2$

Block:

$$
a^2 + b^2 = c^2
$$

---

## Citater i flere niveauer

> Niveau 1
>
> > Niveau 2
> >
> > > Niveau 3

---

```mermaid
graph LR
    Start --> Slut
```

<iframe src="https://www.viewstl.com/?embedded&url=https://raw.githubusercontent.com/crasjens/Markdown/main/docs/model.stl" width="600" height="400" style="border: none;"> </iframe>

> [!NOTE]  
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]  
> Crucial information necessary for users to succeed.

> [!WARNING]  
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.




