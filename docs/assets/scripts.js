// 1. Eksterne links
document.querySelectorAll('a').forEach(link => {
  if (link.hostname !== window.location.hostname) {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  }
});

// 2. Konverter GFM-mermaid kodeblokke til <div class="mermaid">
document.querySelectorAll('pre > code.language-mermaid').forEach(codeBlock => {
  const pre = codeBlock.parentElement;
  const container = document.createElement('div');

  container.className = 'mermaid';
  container.textContent = codeBlock.textContent;

  pre.replaceWith(container);
});

// 3. Kør Mermaid igen, nu hvor DOM’en er rettet
if (window.mermaid) {
  mermaid.init();
}

// 4. Tilføj "Copy"-knap til mermaid-diagrammer
document.querySelectorAll('.mermaid').forEach((diagram) => {
  const button = document.createElement('button');
  button.className = 'copy-code-button';
  button.innerText = 'Kopier';

  button.addEventListener('click', () => {
    navigator.clipboard.writeText(diagram.textContent).then(() => {
      button.innerText = 'Kopieret!';
      setTimeout(() => { button.innerText = 'Kopier'; }, 2000);
    });
  });

  diagram.style.position = 'relative';
  diagram.appendChild(button);
});
