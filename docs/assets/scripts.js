document.addEventListener('DOMContentLoaded', () => {
	// -------------------------------------------------------------
	// 1) ÅBN EKSTERNE LINKS I NYT VINDUE
	// -------------------------------------------------------------
	// GitHub Pages åbner normalt alle links i samme vindue.
	// Her sørger vi for, at links til andre domæner åbner i nyt vindue.
	//
	document.querySelectorAll('a').forEach((link) => {
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
	// Patch <pre><code class="language-mermaid"> → <div class="mermaid">
	//
	document.querySelectorAll('code.language-mermaid').forEach((codeBlock) => {
		// closest('pre')
		// - DOM-metode der går op i DOM-træet og finder nærmeste <pre>-forælder
		const pre = codeBlock.closest('pre');

		// document.createElement('div')
		// - opretter et nyt DOM-element af typen <div>
		const container = document.createElement('div');

		container.className = 'mermaid';
		container.textContent = codeBlock.textContent.trim();

		// pre.replaceWith(container)
		// - erstatter <pre> med vores nye <div class="mermaid">
		if (pre) pre.replaceWith(container);
	});

	// -------------------------------------------------------------
	// 3) RENDER MERMAID
	// -------------------------------------------------------------
	// Mermaid genererer SVG’er asynkront.
	// Vi kalder enten mermaid.run (ny API) eller mermaid.init (gammel API).
	//
	if (window.mermaid && mermaid.run) {
		// mermaid.run({ querySelector: '.mermaid' })
		// - Mermaid API der finder alle .mermaid-elementer og renderer dem
		mermaid.run({ querySelector: '.mermaid' });
	} else if (window.mermaid && mermaid.init) {
		// mermaid.init(undefined, '.mermaid')
		// - ældre API der gør det samme
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
	// Wrap SVG i panzoom-inner
	//
	function wrapSvgInPanzoomInner(diagram) {
		// diagram.querySelector('.panzoom-inner')
		// - finder et eksisterende panzoom-lag, så vi undgår at lave to
		if (diagram.querySelector('.panzoom-inner')) return;

		// diagram.querySelector('svg')
		// - finder den SVG Mermaid har genereret
		const svg = diagram.querySelector('svg');
		if (!svg) return;

		// document.createElement('div')
		// - opretter et nyt DOM-element til panoreringsrummet
		const inner = document.createElement('div');
		inner.classList.add('panzoom-inner');

		// inner.appendChild(svg)
		// - flytter SVG ind i det nye lag
		inner.appendChild(svg);

		// diagram.appendChild(inner)
		// - tilføjer panzoom-laget til .mermaid-containeren
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
		// diagram.querySelector('svg')
		// - finder SVG’en inde i diagrammet
		const svg = diagram.querySelector('svg');
		if (!svg) return;

		svg.style.transform = 'none';
		svg.style.maxWidth = 'none';
		svg.style.transition = 'none';
		svg.style.transformOrigin = 'center center';

		// svg.removeAttribute('height')
		// - fjerner height-attributten fra SVG-tagget
		svg.removeAttribute('height');

		// svg.setAttribute('width', '100%')
		// - sætter SVG til at fylde containerens bredde
		svg.setAttribute('width', '100%');
	}

	// -------------------------------------------------------------
	// 6) KOPIER-KNAP
	// -------------------------------------------------------------
	// Tilføjer en lille knap, der kopierer Mermaid-koden.
	//
	function addCopyButton(diagram) {
		if (diagram.querySelector('.copy-code-button')) return;

		// document.createElement('button')
		// - opretter et nyt <button>-element
		const button = document.createElement('button');

		button.className = 'copy-code-button';
		button.innerText = 'Kopier';

		// button.addEventListener('click', () => { ... })
		// - registrerer en event-handler med en arrow function
		// - arrow function = kort syntaks for function(event) { ... }
		button.addEventListener('click', () => {
			// navigator.clipboard.writeText(...)
			// - browser-API der skriver tekst til clipboard
			navigator.clipboard.writeText(diagram.textContent).then(() => {
				button.innerText = 'Kopieret!';
				setTimeout(() => {
					button.innerText = 'Kopier';
				}, 2000);
			});
		});

		// diagram.appendChild(button)
		// - tilføjer knappen som barn af diagrammet
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

		// diagram.dataset.zoomInitialized
		// - dataset = adgang til data-* attributter
		// - bruges til at undgå dobbelt-initialisering
		if (diagram.dataset.zoomInitialized) return;

		// diagram.querySelector('.panzoom-inner')
		// - finder det indre panoreringslag
		const inner = diagram.querySelector('.panzoom-inner');
		if (!inner) return;

		diagram.dataset.zoomInitialized = 'true';

		// Panzoom(inner, { ... })
		// - kalder Panzoom-biblioteket med et DOM-element og en options-objekt
		const panzoom = Panzoom(inner, {
			maxScale: 3,
			minScale: 1,
			contain: 'outside',
		});

		// inner.addEventListener('wheel', panzoom.zoomWithWheel)
		// - binder musens scrollhjul til Panzoom’s zoom-funktion
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
	//  Efter Mermaid er færdig → wrap → cleanup → UI → zoom
	//
	// setTimeout(() => { ... }, 500)
	// - udskyder eksekvering i 500ms
	// - giver Mermaid tid til at generere SVG’en
	//
	setTimeout(() => {
		// document.querySelectorAll('.mermaid').forEach(diagram => { ... })
		// - finder alle .mermaid-elementer og itererer over dem
		document.querySelectorAll('.mermaid').forEach((diagram) => {
			wrapSvgInPanzoomInner(diagram);
			cleanUpSvg(diagram);
			addCopyButton(diagram);
			enableZoom(diagram);
		});
	}, 500);
	const blocks = document.querySelectorAll('blockquote');
	blocks.forEach((block) => {
		const p = block.querySelector('p');
		if (!p) return;

		const text = p.innerHTML.trim();
		const types = {
			'[!NOTE]': 'note',
			'[!TIP]': 'tip',
			'[!IMPORTANT]': 'important',
			'[!WARNING]': 'warning',
			'[!CAUTION]': 'caution',
		};

		for (const tag in types) {
			if (text.startsWith(tag)) {
				const cls = types[tag];
				block.classList.add('admonition', cls);

				// Fjern tagget fra teksten
				p.innerHTML = text.replace(tag, '').trim();
			}
		}
	});
});
