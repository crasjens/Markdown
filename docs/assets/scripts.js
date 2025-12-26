

// document.addEventListener('DOMContentLoaded', () => {

//    // Eksterne links åbnes i nyt vindue
//   document.querySelectorAll('a').forEach(link => {
//     if (link.hostname !== window.location.hostname) {
//       link.setAttribute('target', '_blank');
//       link.setAttribute('rel', 'noopener noreferrer');
//     }
//   });

//   // 1. Patch kodeblokke
//   document.querySelectorAll('code.language-mermaid').forEach(codeBlock => {
//     const pre = codeBlock.closest('pre');
//     const container = document.createElement('div');

//     container.className = 'mermaid';
//     container.textContent = codeBlock.textContent.trim();

//     if (pre) pre.replaceWith(container);
//   });

//   // 2. Kør Mermaid
//   if (window.mermaid) {
//     mermaid.init();
//   }

//   // ⭐ 3. Tilføj knapper EFTER Mermaid har rendret
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

//   // ⭐ 4. Vent et øjeblik, så Mermaid når at rendere
//   setTimeout(() => {
//     document.querySelectorAll('.mermaid').forEach(addCopyButton);
//   }, 0);

// });


// Når hele HTML'en er klar, starter vi
document.addEventListener('DOMContentLoaded', () => {

// Eksterne links åbnes i nyt vindue
  document.querySelectorAll('a').forEach(link => {
    if (link.hostname !== window.location.hostname) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  // 1) Find alle mermaid-kodeblokke og lav dem om til <div class="mermaid">
  // Mermaid kan ikke arbejde direkte med <pre><code>, så vi omskriver dem.
  //

  document.querySelectorAll('code.language-mermaid').forEach(codeBlock => {

    // Find den <pre> der omslutter <code>
    const pre = codeBlock.closest('pre');

    // Lav en ny container som Mermaid kan forstå
    const container = document.createElement('div');
    container.className = 'mermaid';

    // Kopiér selve diagram-teksten ind i containeren
    container.textContent = codeBlock.textContent.trim();

    // Erstat <pre><code> med vores nye <div class="mermaid">
    if (pre) pre.replaceWith(container);
  });



  //
  // 2) Kør Mermaid og lad den tegne diagrammerne
  // mermaid.init() finder alle .mermaid-elementer og laver dem om til SVG.
  //
  if (window.mermaid) {
    mermaid.init();
  }

  //
  // 3) Funktion der tilføjer en "Kopier"-knap til et diagram
  // Vi bruger den både efter Mermaid har tegnet, og i MutationObserver.
  //
  function addCopyButton(diagram) {

    // Undgå at lave flere knapper på samme diagram
    if (diagram.querySelector('.copy-code-button')) return;

    // Selve knappen
    const button = document.createElement('button');
    button.className = 'copy-code-button';
    button.innerText = 'Kopier';

    // Når man klikker, kopieres diagram-teksten
    button.addEventListener('click', () => {
      navigator.clipboard.writeText(diagram.textContent).then(() => {
        button.innerText = 'Kopieret!';
        setTimeout(() => { button.innerText = 'Kopier'; }, 2000);
      });
    });

    // Sørg for at knappen kan ligge ovenpå diagrammet
    diagram.style.position = 'relative';

    // Sæt knappen ind i diagrammet
    diagram.appendChild(button);
  }

  // 4) Tilføj knapper EFTER Mermaid har tegnet diagrammerne
  //
  // Mermaid tegner ikke SVG'en med det samme — den gør det i næste "tick".
  // Derfor bruger vi setTimeout(..., 0) for at vente til DOM'en er stabil.
  //
  setTimeout(() => {
    document.querySelectorAll('.mermaid').forEach(addCopyButton);
  }, 0);
});
