// 1. Mermaid setup (som før)
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
mermaid.initialize({ startOnLoad: true });

// 2. MathJax Konfiguration (VIGTIGT: Dette skal ske FØR scriptet hentes)
window.MathJax = {
	tex: {
		inlineMath: [
			['$', '$'],
			['\\(', '\\)'],
		], // Her aktiverer vi de enkelte $
		displayMath: [
			['$$', '$$'],
			['\\[', '\\]'],
		],
	},
	options: {
		skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
	},
};

// 3. Hent MathJax scriptet "dynamisk"
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
script.async = true;
document.head.appendChild(script);
