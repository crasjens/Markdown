---
layout: default
title: Mit Master Cheat Sheet site (under opbygning)
---

# 🏆 GFM Master Cheat Sheet

Dette indhold bliver nu automatisk lagt ind i "default" layoutet.

| Funktion | Status       |
| :------- | :----------- |
| Layout   | ✅ Virker    |
| CSS      | ✅ Tilkoblet |

## En sektion

Rene GFM kode ... kommer nok snart her

```mermaid
%%{init: { "flowchart": { "nodeSpacing": 20, "rankSpacing": 20 }}}%%
graph TD
    A --> B
    A --> C
    B --> D
    C --> D

```

```mermaid
classDiagram
Class01 <|-- AveryLongClass : Cool
Class03 *-- Class04
Class05 o-- Class06
Class07 .. Class08
Class09 --> C2 : "Where am I?"
Class09 --* C3
Class09 --|> Class07
Class07 : equals()
Class07 : Object[] elementData
Class01 : size()
Class01 : int chimp
Class01 : int gorilla
Class08 <--> C2 : "Cool label"
```

# Markdown Cheat Sheet

Dette dokument viser de mest almindelige og udvidede muligheder i Markdown

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
[Link med titel](https://example.com 'Titeltekst')

---

## Billeder

![Alt-tekst](https://example.com/billede.png)

---

## Kodeblokke

Eksempel:

```javascript
console.log('Hello world');
```

---

## Tabeller

| Kolonne 1 | Kolonne 2 | Kolonne 3 |
| --------- | --------- | --------- |
| Celle A   | Celle B   | Celle C   |
| Celle D   | Celle E   | Celle F   |

---

## Vandrette linjer

---

---

---

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

## Kommentarer (ikke synlige i render)

<!-- Dette er en kommentar -->

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

## Kombineret eksempel

# Titel

Her er **bold**, _italic_, og `inline code`.

- Punkt 1
- Punkt 2
  - Underpunkt

> Et citat

```python
print("kodeblok")
```

| A   | B   |
| --- | --- |
| 1   | 2   |

---

## Diagrammer (GitHub – Mermaid)

```mermaid
graph LR;
    A-->B;
    B-->C;
```

---

```mermaid
graph LR;
A[Input] -->|validerer| B{OK?};
 B -->|Ja| C[Gemmer data];
  B -->|Nej| D[Fejl];
```

---

```mermaid
graph LR;
    A[Markdown Elementer] --> B[Typografi];
    A --> C[Links & Billeder];
    A --> D[Lister];
    A --> E[Kode & Kodeblokke];
    A --> F[Tabeller];
    A --> G[Diagrammer];

    B --> B1(**Bold / *Italic* / ~~Strik~~**);
    C --> C1[Links];
    C --> C2[Billeder];
    D --> D1[Punktlister];
    D --> D2[Nummererede lister];
    D --> D3[Task-lister];
    E --> E1[`Inline code`];
    E --> E2[Kodeblokke];
    F --> F1[Standardtabeller];
    F --> F2[Justering];
    G --> G1[Mermaid];
```

---

```mermaid
graph LR;
    Start((Start)) --> A[Write Markdown];
    A --> B{Renderer?};

    B -->|GitHub| C[GitHub Flavored Markdown];
    B -->|VS Code| D[Markdown Preview];
    B -->|Browser| E[Static HTML];

    C --> F[Diagrammer, tabeller, task-lister];
    D --> G[Kræver extensions for Mermaid];
    E --> H[Ren HTML uden GitHub-features];

    F --> End((Output));
    G --> End;
    H --> End;
```

---

```mermaid
graph LR;

    A[Markdown Cheat Sheet] --> B[Typografi];
    A --> C[Lister];
    A --> D[Links & Billeder];
    A --> E[Kode & Kodeblokke];
    A --> F[Tabeller];
    A --> G[Diagrammer];
    A --> H[Avancerede Elementer];

    %% Typografi
    B --> B1(**Bold / *Italic* / ~~Strik~~**);
    B --> B2[`Inline code`];
    B --> B3[Blockquotes];

    %% Lister
    C --> C1[Punktlister];
    C --> C2[Nummererede lister];
    C --> C3[Task-lister];

    %% Links & billeder
    D --> D1[Links];
    D --> D2[Billeder];
    D --> D3[Autolinks];

    %% Kode
    E --> E1[`Inline code`];
    E --> E2[Kodeblokke];
    E --> E3[Sprog-highlighting];

    %% Tabeller
    F --> F1[Standardtabeller];
    F --> F2[Justering];
    F --> F3[HTML-tabeller];

    %% Diagrammer
    G --> G1[Mermaid];
    G --> G2[Flowcharts];
    G --> G3[Sequence diagrams];

    %% Avanceret
    H --> H1[Footnotes];
    H --> H2[Details/Summary];
    H --> H3[HTML i Markdown];
    H --> H4[Emojis];
    H --> H5[Definition Lists];
```

---

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

</div>
