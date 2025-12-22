// Denne linje henter Mermaid direkte fra nettet (CDN)
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';

// Denne linje fortæller Mermaid, at den skal lede efter diagrammer på siden
mermaid.initialize({ 
    startOnLoad: true,
    theme: 'default' // Du kan også bruge 'dark', 'forest', etc.
});