# Første kontakt med Markdown og Mermaid er her.

Så det er en hurtig introduktion, der viser, hvad der skete under de første skridt med Markdown og mermaid. Det var her, det begyndte. Repoet er i løbet af tre uger vokset en del med css, html, scss, js-filer, liquid syntax, yaml-konfiguration, så der faktisk er en reel github page motor og skabelon, der kan skaleres.  Min Github pages renderer nu mermaid ved hjælp af 8 forskellige scripts, som er nødvendige for at rendere mermaid korrekt. 

- For eksempel:  GitHub Pages viser kodeblokke som tekst. Mermaid kræver derimod en <div class="mermaid"> med ren tekst indeni. Så jeg bruger javascript til at finde alle kodeblokke med `<pre><code class="language-mermaid"></code></pre>`  og erstatte dem med  `<div class="mermaid">`
- Page'en åbner forresten links i en ny fane. Også ved hjælp af et script. På den måde forsvinder man ikke helt fra siden.

Her er min [page](https://crasjens.github.io/Markdown/)

## Små eksempler på rendering:

- **Bold**
- _Italic_
- `Inline code`

```mermaid
graph TD
    A --> B
    A --> C
    B --> D
    C --> D
```

## Links

[Næste skridt er Issues](https://https://github.com/crasjens/Markdown/issues/1) Her lagde jeg et længere cheat sheet af markdown syntaks. Mest for at have en oversigt, men også for at bruge editoren et andet sted til et markdown kursus på [Udemy.com](https://www.udemy.com/course/markdown-guide/?couponCode=CP250105G1)
