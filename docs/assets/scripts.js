// Når hele HTML'en er klar, starter vi
document.addEventListener('DOMContentLoaded', () => {

  //
  // 0) Eksterne links åbnes i nyt vindue
  //
  document.querySelectorAll('a').forEach(link => {
    if (link.hostname !== window.location.hostname) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });



  //
  // 1) Find alle mermaid-kodeblokke og lav dem om til <div class="mermaid">
  // Mermaid kan ikke arbejde direkte med <pre><code>, så vi omskriver dem.
  //
  document.querySelectorAll('code.language-mermaid').forEach(codeBlock => {

    const pre = codeBlock.closest('pre');     // Find <pre> omkring <code>
    const container = document.createElement('div');

    container.className = 'mermaid';
    container.textContent = codeBlock.textContent.trim();

    if (pre) pre.replaceWith(container);      // Erstat <pre><code> med <div>
  });



  //
  // 2) Kør Mermaid og lad den tegne diagrammerne
  //
  if (window.mermaid) {
    mermaid.init();                           // Mermaid laver SVG'er
  }



  //
  // 3) Funktion der tilføjer en "Kopier"-knap til et diagram
  //
  function addCopyButton(diagram) {

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
  }



  //
  // 4) Zoom/pan med Panzoom
  //
  function enableZoom(diagram) {
    const svg = diagram.querySelector('svg');
    if (!svg) return;

    Panzoom(svg, {
      maxScale: 5,
      minScale: 1,
      contain: 'outside'
    });
  }



  //
  // 5) Når Mermaid er færdig med at tegne, tilføjer vi UI (knapper + zoom)
  //
  // Mermaid tegner ikke SVG'en synkront — derfor setTimeout(..., 0)
  //
  setTimeout(() => {
    document.querySelectorAll('.mermaid').forEach(diagram => {
      addCopyButton(diagram);
      enableZoom(diagram);
    });
  }, 0);



  //
  // 6) MutationObserver (valgfrit)
  // Hvis der senere dukker nye .mermaid-elementer op, giver vi dem UI.
  //
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {

        // Hvis et nyt .mermaid-element dukker op direkte
        if (node.classList && node.classList.contains('mermaid')) {
          addCopyButton(node);
          enableZoom(node);
        }

        // Hvis .mermaid ligger længere nede i en ny struktur
        if (node.querySelectorAll) {
          node.querySelectorAll('.mermaid').forEach(diagram => {
            addCopyButton(diagram);
            enableZoom(diagram);
          });
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

});
