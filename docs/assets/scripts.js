

document.addEventListener('DOMContentLoaded', () => {

   // Eksterne links åbnes i nyt vindue
  document.querySelectorAll('a').forEach(link => {
    if (link.hostname !== window.location.hostname) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  // 1. Patch kodeblokke
  document.querySelectorAll('code.language-mermaid').forEach(codeBlock => {
    const pre = codeBlock.closest('pre');
    const container = document.createElement('div');

    container.className = 'mermaid';
    container.textContent = codeBlock.textContent.trim();

    if (pre) pre.replaceWith(container);
  });

  // 2. Kør Mermaid
  if (window.mermaid) {
    mermaid.init();
  }

  // ⭐ 3. Tilføj knapper EFTER Mermaid har rendret
  function addCopyButton(diagram) {
    if (diagram.querySelector('.copy-code-button')) return;

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
  }

  // ⭐ 4. Vent et øjeblik, så Mermaid når at rendere
  setTimeout(() => {
    document.querySelectorAll('.mermaid').forEach(addCopyButton);
  }, 0);

});
