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
  //
  document.querySelectorAll('code.language-mermaid').forEach(codeBlock => {

    const pre = codeBlock.closest('pre');
    const container = document.createElement('div');

    container.className = 'mermaid';
    container.textContent = codeBlock.textContent.trim();

    if (pre) pre.replaceWith(container);
  });



  //
  // 2) Kør Mermaid og lad den tegne diagrammerne
  //
  if (window.mermaid) {
    mermaid.init();
  }



  //
  // 3) Tilføj "Kopier"-knap
  //
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



  //
  // 4) Zoom/pan med Panzoom — kun én gang pr. diagram
  //
  function enableZoom(diagram) {

    // Undgå dobbelt-initialisering
    if (diagram.dataset.zoomInitialized) return;
    diagram.dataset.zoomInitialized = "true";

    const svg = diagram.querySelector('svg');
    if (!svg) return;

    Panzoom(svg, {
      maxScale: 5,
      minScale: 1,
      contain: 'outside'
    });
  }



  //
  // 5) Når Mermaid er færdig med at tegne, tilføjer vi UI
  //
  // Først venter vi til næste tick (0 ms)
  // Derefter venter vi 10 ms ekstra, så SVG'en er helt klar
  //
  setTimeout(() => {
    document.querySelectorAll('.mermaid').forEach(diagram => {

      addCopyButton(diagram);

      // Vent lidt ekstra før zoom initialiseres
      setTimeout(() => {
        enableZoom(diagram);
      }, 10);

    });
  }, 0);



  //
  // 6) MutationObserver — håndterer nye diagrammer
  //
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {

        if (node.classList && node.classList.contains('mermaid')) {

          addCopyButton(node);

          setTimeout(() => {
            enableZoom(node);
          }, 10);
        }

        if (node.querySelectorAll) {
          node.querySelectorAll('.mermaid').forEach(diagram => {

            addCopyButton(diagram);

            setTimeout(() => {
              enableZoom(diagram);
            }, 10);

          });
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

});
