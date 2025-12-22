// Denne linje henter Mermaid direkte fra nettet (CDN)
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';

// Denne linje fortæller Mermaid, at den skal lede efter diagrammer på siden
mermaid.initialize({
	startOnLoad: true,
	theme: 'default', // Du kan også bruge 'dark', 'forest', etc.
});

// 1. Konfigurer MathJax (valgfrit, men godt for kontrollen)
window.MathJax = {
	tex: {
		inlineMath: [
			['$', '$'],
			['\\(', '\\)'],
		],
	},
};

// 2. Skab et nyt script-element "i luften"
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
script.async = true;

// 3. Sæt det ind på siden
