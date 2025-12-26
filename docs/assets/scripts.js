document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------------------
  // 1) ÅBN EKSTERNE LINKS I NYT VINDUE
  // -------------------------------------------------------------
  // GitHub Pages åbner normalt alle links i samme vindue.
  // Her sørger vi for, at links til andre domæner åbner i nyt vindue.
  //
  document.querySelectorAll('a').forEach(link => {
    if (link.hostname && link.hostname !== window.location.hostname) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });



  // -------------------------------------------------------------
  // 2) ERSTAT <pre><code class="language-mermaid"> MED <div class="mermaid">
  // -------------------------------------------------------------
  // GitHub Pages viser kodeblokke som tekst.
  // Mermaid kræver derimod en <div class="mermaid"> med ren tekst indeni.
  //
  // Denne blok finder alle kodeblokke med "language-mermaid"
  // og erstatter dem med en <div class="mermaid">, som Mermaid kan arbejde med.
  //
  document.querySelectorAll('code.language-mermaid').forEach(codeBlock => {
    const pre = codeBlock.closest('pre');
    const container = document.createElement('div');

    container.className = 'mermaid';
    container.textContent = codeBlock.textContent.trim();

    if (pre) pre.replaceWith(container);
  });



  // -------------------------------------------------------------
  // 3) RENDER MERMAID
  // -------------------------------------------------------------
  // Mermaid genererer SVG’er asynkront.
  // Vi kalder enten mermaid.run (ny API) eller mermaid.init (gammel API).
  //
  if (window.mermaid && mermaid.run) {
    mermaid.run({ querySelector: '.mermaid' });
  } else if (window.mermaid && mermaid.init) {
    mermaid.init(undefined, '.mermaid');
  }



  // -------------------------------------------------------------
  // 4) WRAP SVG I ET INDRE PANZOOM-LAG
  // -------------------------------------------------------------
  // Mermaid genererer kun:
  //   <div class="mermaid"><svg>...</svg></div>
  //
  // Men for at få en baggrundsfarve i "panoreringsrummet",
  // skal SVG’en ligge inde i et ekstra lag:
  //
  //   <div class="mermaid">
  //       <div class="panzoom-inner">
  //           <svg>...</svg>
  //       </div>
  //   </div>
  //
  // Det er *panzoom-inner*, der får baggrundsfarve og bliver zoomet.
  //
  function wrapSvgInPanzoomInner(diagram) {
    // Undgå at wrappe to gange
    if (diagram.querySelector('.panzoom-inner')) return;

    const svg = diagram.querySelector('svg');
    if (!svg) return; // Mermaid er ikke færdig endnu

    const inner = document.createElement('div');
    inner.classList.add('panzoom-inner');

    // Flyt SVG ind i det nye lag
    inner.appendChild(svg);

    // Tilføj laget til containeren
    diagram.appendChild(inner);
  }



  // -------------------------------------------------------------
  // 5) FJERN MERMAID’S AUTO-ZOOM OG HEIGHT="100%"
  // -------------------------------------------------------------
  // Mermaid sætter height="100%" på SVG’en.
  // Det gør SVG’en gigantisk høj og ødelægger Panzoom.
  //
  // Vi fjerner height og sætter width="100%" i stedet.
  //
  function cleanUpSvg(diagram) {
    const svg = diagram.querySelector('svg');
    if (!svg) return;

    // Fjern auto-transform
    svg.style.transform = 'none';
    svg.style.maxWidth = 'none';
    svg.style.transition = 'none';
    svg.style.transformOrigin = 'center center';

    // Den vigtigste linje:
    svg.removeAttribute('height');

    // Gør SVG responsiv i bredden
    svg.setAttribute('width', '100%');
  }



  // -------------------------------------------------------------
  // 6) KOPIER-KNAP
  // -------------------------------------------------------------
  // Tilføjer en lille knap, der kopierer Mermaid-koden.
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

    diagram.appendChild(button);
  }



  // -------------------------------------------------------------
  // 7) PANZOOM PÅ DET INDRE LAG
  // -------------------------------------------------------------
  // Panzoom skal IKKE køre på SVG’en direkte.
  // Det skal køre på panzoom-inner, så baggrunden følger med.
  //
  function enableZoom(diagram) {
    if (!window.Panzoom) return;
    if (diagram.dataset.zoomInitialized) return;

    const inner = diagram.querySelector('.panzoom-inner');
    if (!inner) return;

    diagram.dataset.zoomInitialized = "true";

    const panzoom = Panzoom(inner, {
      maxScale: 3,
      minScale: 1,
      contain: 'outside'
    });

    inner.addEventListener('wheel', panzoom.zoomWithWheel);
  }



  // -------------------------------------------------------------
  // 8) EFTER MERMAID ER FÆRDIG → WRAP → CLEANUP → UI → ZOOM
  // -------------------------------------------------------------
  // Mermaid renderer asynkront, så vi venter 500ms.
  // Derefter:
  //   1) Wrap SVG i panzoom-inner
  //   2) Fix SVG-størrelse
  //   3) Tilføj kopier-knap
  //   4) Aktivér Panzoom
  //
  setTimeout(() => {
    document.querySelectorAll('.mermaid').forEach(diagram => {
      wrapSvgInPanzoomInner(diagram);
      cleanUpSvg(diagram);
      addCopyButton(diagram);
      enableZoom(diagram);
    });
  }, 500);

});
