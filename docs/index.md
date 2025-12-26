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