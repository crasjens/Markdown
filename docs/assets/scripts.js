// // Når hele HTML'en er klar, starter vi
document.addEventListener('DOMContentLoaded', () => {

  //
  // 0) Eksterne links åbnes i nyt vindue
  //
  document.querySelectorAll('a').forEach(link => {
    if (link.hostname && link.hostname !== window.location.hostname) {
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
  // (du har allerede mermaid.initialize({ startOnLoad: false }) i layoutet)
  //
  if (window.mermaid && mermaid.run) {
    // Nyere Mermaid (v10) bruger run()
    mermaid.run({ querySelector: '.mermaid' });
  } else if (window.mermaid && mermaid.init) {
    // Fallback til ældre API
    mermaid.init(undefined, '.mermaid');
  }



  //
  // 3) Kopier-knap
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
  // 4) Zoom/pan med Panzoom på hele .mermaid-containeren
  //
  function enableZoom(diagram) {
    if (!window.Panzoom) return;                // Hvis Panzoom ikke er loadet, gør vi ingenting
    if (diagram.dataset.zoomInitialized) return;

    diagram.dataset.zoomInitialized = 'true';

    const panzoom = Panzoom(diagram, {
      maxScale: 3,
      minScale: 1,
      contain: 'outside'
    });

    // Scroll-zoom
    diagram.addEventListener('wheel', panzoom.zoomWithWheel);
  }



  //
  // 5) Når Mermaid har tegnet, tilføj knapper og zoom
  //
  // Vi venter 50 ms for at være sikre på, at SVG'erne er på plads.
  //
  setTimeout(() => {
    document.querySelectorAll('.mermaid').forEach(diagram => {
      addCopyButton(diagram);
      enableZoom(diagram);
    });
  }, 50);

});
