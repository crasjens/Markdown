// document.addEventListener('DOMContentLoaded', () => {

//   //
//   // 0) Eksterne links i nyt vindue
//   //
//   document.querySelectorAll('a').forEach(link => {
//     if (link.hostname && link.hostname !== window.location.hostname) {
//       link.setAttribute('target', '_blank');
//       link.setAttribute('rel', 'noopener noreferrer');
//     }
//   });



//   //
//   // 1) Patch <pre><code class="language-mermaid"> → <div class="mermaid">
//   //
//   document.querySelectorAll('code.language-mermaid').forEach(codeBlock => {
//     const pre = codeBlock.closest('pre');
//     const container = document.createElement('div');

//     container.className = 'mermaid';
//     container.textContent = codeBlock.textContent.trim();

//     if (pre) pre.replaceWith(container);
//   });



//   //
//   // 2) Render Mermaid
//   //
//   if (window.mermaid && mermaid.run) {
//     mermaid.run({ querySelector: '.mermaid' });
//   } else if (window.mermaid && mermaid.init) {
//     mermaid.init(undefined, '.mermaid');
//   }



//   //
//   // 3) Kopier-knap
//   //
//   function addCopyButton(diagram) {
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
//   }



//   //
//   // 4) Normaliser SVG + tilføj zoom/pan
//   //
//   function enableZoom(diagram) {
//     if (!window.Panzoom) return;
//     if (diagram.dataset.zoomInitialized) return;
//     diagram.dataset.zoomInitialized = "true";

//     // Vent til Mermaid er færdig med at tegne
//     setTimeout(() => {
//       const svg = diagram.querySelector('svg');
//       if (!svg) return;

//       // 4a) Ryd Mermaid’s egen transform/size-rod
//       svg.removeAttribute('style');        // fjerner bl.a. transform: scale(3) og max-width
//       svg.setAttribute('width', '100%');
//       svg.setAttribute('height', '100%');
//       svg.style.display = 'block';

//       // 4b) Sørg for at containeren kan rumme zoom
//       diagram.style.overflow = 'hidden';

//       // 4c) Panzoom på SELVE SVG'en – nu ren og neutral
//       const panzoom = Panzoom(svg, {
//         maxScale: 3,
//         minScale: 1,
//         contain: 'outside'
//       });

//       // Scroll-zoom
//       svg.addEventListener('wheel', panzoom.zoomWithWheel);

//     }, 50);
//   }



//   //
//   // 5) Efter render → UI + zoom
//   //
//   setTimeout(() => {
//     document.querySelectorAll('.mermaid').forEach(diagram => {
//       addCopyButton(diagram);
//       enableZoom(diagram);
//     });
//   }, 100);

// });
// document.addEventListener('DOMContentLoaded', () => {

//   // 0) Eksterne links i nyt vindue
//   document.querySelectorAll('a').forEach(link => {
//     if (link.hostname && link.hostname !== window.location.hostname) {
//       link.setAttribute('target', '_blank');
//       link.setAttribute('rel', 'noopener noreferrer');
//     }
//   });

//   // 1) Patch <pre><code class="language-mermaid"> → <div class="mermaid">
//   document.querySelectorAll('code.language-mermaid').forEach(codeBlock => {
//     const pre = codeBlock.closest('pre');
//     const container = document.createElement('div');

//     container.className = 'mermaid';
//     container.textContent = codeBlock.textContent.trim();

//     if (pre) pre.replaceWith(container);
//   });

//   // 2) Render Mermaid (v10+)
//   if (window.mermaid && mermaid.run) {
//     mermaid.run({ querySelector: '.mermaid' });
//   } else if (window.mermaid && mermaid.init) {
//     mermaid.init(undefined, '.mermaid');
//   }

// });



document.addEventListener('DOMContentLoaded', () => {

  //
  // 1) Eksterne links i nyt vindue
  //
  document.querySelectorAll('a').forEach(link => {
    if (link.hostname && link.hostname !== window.location.hostname) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });



  //
  // 2) Patch <pre><code class="language-mermaid"> → <div class="mermaid">
  //
  document.querySelectorAll('code.language-mermaid').forEach(codeBlock => {
    const pre = codeBlock.closest('pre');
    const container = document.createElement('div');

    container.className = 'mermaid';
    container.textContent = codeBlock.textContent.trim();

    if (pre) pre.replaceWith(container);
  });

  document.querySelectorAll('.mermaid').forEach(container => {
    const svg = container.querySelector('svg');
    if (!svg) return;

    // Opret et indre panzoom-lag
    const inner = document.createElement('div');
    inner.classList.add('panzoom-inner');

    // Flyt SVG ind i det nye lag
    inner.appendChild(svg);

    // Læg laget ind i containeren
    container.appendChild(inner);

    // Start Panzoom på inner-laget
    panzoom(inner, {
        maxZoom: 5,
        minZoom: 0.5,
        bounds: false
    });
});



  //
  // 3) Render Mermaid
  //
  if (window.mermaid && mermaid.run) {
    mermaid.run({ querySelector: '.mermaid' });
  } else if (window.mermaid && mermaid.init) {
    mermaid.init(undefined, '.mermaid');
  }



  //
  // 4) Fjern Mermaid’s auto-transform OG height="100%"
  //
  function cleanUpSvg(diagram) {
    const svg = diagram.querySelector('svg');
    if (!svg) return;

    // Fjern Mermaid’s auto-zoom
    svg.style.transform = 'none';
    svg.style.maxWidth = 'none';
    svg.style.transition = 'none';
    svg.style.transformOrigin = 'center center';

    // Fjern den ENE ting der ødelægger alt
    svg.removeAttribute('height');   // ← den vigtige linje
    svg.setAttribute('width', '100%');
  }



  //
  // 5) Kopier-knap
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



  //
  // 6) Panzoom
  //
  function enableZoom(diagram) {
    if (!window.Panzoom) return;
    if (diagram.dataset.zoomInitialized) return;

    diagram.dataset.zoomInitialized = "true";

    const svg = diagram.querySelector('svg');
    if (!svg) return;

    const panzoom = Panzoom(svg, {
      maxScale: 3,
      minScale: 1,
      contain: 'outside'
    });

    svg.addEventListener('wheel', panzoom.zoomWithWheel);
  }



  //
  // 7) Når Mermaid er færdig → fix SVG → UI → zoom
  //
  setTimeout(() => {
    document.querySelectorAll('.mermaid').forEach(diagram => {
      cleanUpSvg(diagram);
      addCopyButton(diagram);
      enableZoom(diagram);
    });
  }, 500);

});
