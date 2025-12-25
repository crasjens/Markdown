// assets/scripts.js

/**
 * 1. Automatisk åbning af eksterne links i en ny fane
 * Dette sikrer, at dine brugere ikke forlader din side, 
 * når de klikker på et link til f.eks. GitHub.com
 */
document.querySelectorAll('a').forEach(link => {
  if (link.hostname !== window.location.hostname) {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  }
});

/**
 * 2. Tilføj "Copy"-knap til kodeblokke
 * Selvom det er ren GFM, er det super brugervenligt at kunne 
 * kopiere din kode med ét klik.
 */
document.querySelectorAll('pre').forEach((codeBlock) => {
  const button = document.createElement('button');
  button.className = 'copy-code-button';
  button.innerText = 'Kopier';

  button.addEventListener('click', () => {
    const code = codeBlock.querySelector('code').innerText;
    navigator.clipboard.writeText(code).then(() => {
      button.innerText = 'Kopieret!';
      setTimeout(() => { button.innerText = 'Kopier'; }, 2000);
    });
  });

  codeBlock.style.position = 'relative';
  codeBlock.appendChild(button);
});

/**
 * 3. Konverter GFM-mermaid kodeblokke til <div class="mermaid">
 * GitHub Pages pakker mermaid-blokke ind i <pre><code>,
 * hvilket gør at Mermaid ikke kan rendere dem.
 * Dette script omskriver dem automatisk.
 */
document.querySelectorAll('pre > code.language-mermaid').forEach(codeBlock => {
  const pre = codeBlock.parentElement;
  const container = document.createElement('div');

  container.className = 'mermaid';
  container.textContent = codeBlock.textContent;

  pre.replaceWith(container);
});
