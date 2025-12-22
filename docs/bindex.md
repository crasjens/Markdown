<link rel="stylesheet" href="assets/style.css">
<script src="assets/scripts.js" type="module"></script>

# Markdown Cheat Sheet

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
[Link med titel](https://example.com 'Titeltekst')

---

## Billeder

![Alt-tekst](https://example.com/billede.png)

---

<iframe src="map.html" width="100%" height="600" style="border:none;"></iframe>

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

## Emojis (Native)

😄
🚀
👍

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

<div class="mermaid">
graph LR
    A[Start] --> B[Slut]
</div>

---

<div class="mermaid">
graph LR;
    A[Input] -->|validerer| B{OK?}
    B -->|Ja| C[Gemmer data]
    B -->|Nej| D[Fejl]
</div>

---

<div class="callout callout-note">
  <strong>NOTE:</strong> Dette er en note.
</div>

<div class="callout callout-tip">
  <strong>TIP:</strong> Dette er et tip.
</div>

<div class="callout callout-warning">
  <strong>WARNING:</strong> Dette er en advarsel.
</div>
