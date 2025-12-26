// document.addEventListener('DOMContentLoaded', () => {

//   // 1. Eksterne links åbnes i nyt vindue
//   document.querySelectorAll('a').forEach(link => {
//     if (link.hostname !== window.location.hostname) {
//       link.setAttribute('target', '_blank');
//       link.setAttribute('rel', 'noopener noreferrer');
//     }
//   });

//   // 2. Find ALLE mermaid-kodeblokke (uanset GitHub-wrapping)
//   document.querySelectorAll('code.language-mermaid').forEach(codeBlock => {
//     const pre = codeBlock.closest('pre');
//     const container = document.createElement('div');

//     container.className = 'mermaid';
//     container.textContent = codeBlock.textContent.trim();

//     if (pre) {
//       pre.replaceWith(container);
//     }
//   });

//   // 3. Kør Mermaid EFTER patchen
//   if (window.mermaid) {
//     mermaid.init();
//   }

//   // 4. Tilføj copy-knapper til ALLE mermaid-diagrammer
//   document.querySelectorAll('.mermaid').forEach(diagram => {

//     // Undgå dobbelt-knapper
//     if (diagram.querySelector('.copy-code-button')) return;

//     const button = document.createElement('button');
//     button.className = 'copy-code-button';
//     button.innerText = 'Kopier';

//     button.addEventListener('click', () => {
//       navigator.clipboard.writeText(diagram.textContent).then(() => {
//         button.innerText = 'Kopieret!';
//         setTimeout(() => { button.innerText = 'Kopier'; }, 2000);
//       });
//     });

//     diagram.style.position = 'relative';
//     diagram.appendChild(button);
//   });

// });
document.addEventListener('DOMContentLoaded', () => {

  // 1. Patch kodeblokke
  document.querySelectorAll('code.language-mermaid').forEach(codeBlock => {
    const pre = codeBlock.closest('pre');
    const container = document.createElement('div');

    container.className = 'mermaid';
    container.textContent = codeBlock.textContent.trim();

    if (pre) pre.replaceWith(container);
  });

  // 2. Kør Mermaid EFTER patchen
  if (window.mermaid) {
    mermaid.init();
  }

  // ⭐ 3. Vent et øjeblik, så GitHub’s auto-mermaid OGSÅ er færdig
  setTimeout(() => {
    document.querySelectorAll('.mermaid').forEach(diagram => {

      // Undgå dobbelt-knapper
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
    });
  }, 50); // lille delay, så GitHub når at rendere

});
