import { instruments, instrumentById } from './data/instruments.js';
import { displayPitch, pitchRank } from './components/pitch.js';
import { renderStaff } from './components/staff.js';
import { renderValveDiagram } from './diagrams/valveDiagram.js';
import { renderFluteDiagram } from './diagrams/fluteDiagram.js';
import { renderClarinetDiagram } from './diagrams/clarinetDiagram.js';
import { renderSaxDiagram } from './diagrams/saxDiagram.js';
import { renderTromboneDiagram } from './diagrams/tromboneDiagram.js';

const app = document.querySelector('#app');
const homeButton = document.querySelector('#homeButton');
const auditLink = document.querySelector('#auditLink');

const state = {
  instrumentId: null,
  rangeMode: 'beginner',
  selectedPitch: null
};

function escapeHtml(str) {
  return String(str).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}

function notesForRange(instrument) {
  const range = instrument.ranges[state.rangeMode];
  const min = pitchRank(range.min);
  const max = pitchRank(range.max);
  return instrument.notes.filter(note => {
    const rank = pitchRank(note.pitch);
    return rank >= min && rank <= max;
  });
}

function registerGroup(instrument, pitch) {
  const octave = Number(pitch.match(/(-?\d+)$/)[1]);
  const base = instrument.registerBaseOctave ?? 3;
  if (octave <= base) return 'Low';
  if (octave === base + 1) return 'Middle';
  return 'High';
}

function ordinal(position) {
  const n = Number(position);
  if (n === 1) return '1st';
  if (n === 2) return '2nd';
  if (n === 3) return '3rd';
  return `${n}th`;
}

function fingeringLabel(instrument, note) {
  if (instrument.fingeringType === 'valves') {
    return note.valves.length ? note.valves.join(' + ') : 'OPEN';
  }
  if (instrument.fingeringType === 'keys') {
    return note.sourceNotation || 'Highlighted keys';
  }
  if (instrument.fingeringType === 'position') {
    return note.sourceNotation || `${ordinal(note.position)} position`;
  }
  return '';
}

function renderDiagram(instrument, note, options = {}) {
  if (instrument.fingeringType === 'valves') {
    return renderValveDiagram(note.valves, { ...options, instrumentName: instrument.name });
  }
  if (instrument.id === 'flute') {
    return renderFluteDiagram(note.keys, options);
  }
  if (instrument.diagramFamily === 'clarinet') {
    return renderClarinetDiagram(note.keys, { ...options, lowExtension: Boolean(instrument.lowExtension) });
  }
  if (instrument.diagramFamily === 'sax') {
    return renderSaxDiagram(note.keys, { ...options, baritone: Boolean(instrument.baritone) });
  }
  if (instrument.diagramFamily === 'trombone') {
    return renderTromboneDiagram(note.position, options);
  }
  return '<p>Diagram renderer not available.</p>';
}

function fingeringInstruction(instrument, note) {
  if (instrument.fingeringType === 'valves') {
    if (!note.valves.length) return 'No valves pressed.';
    const label = note.valves.join(' + ');
    return `Press valve${note.valves.length > 1 ? 's' : ''} ${label}.`;
  }
  if (instrument.id === 'flute') {
    return 'Pressed controls are highlighted. “T” means the primary B-natural thumb lever; E♭ is the right-pinky E♭ key.';
  }
  if (instrument.diagramFamily === 'clarinet') {
    return 'Pressed holes and keys are highlighted. R is the register key; T is the left-thumb hole.';
  }
  if (instrument.diagramFamily === 'sax') {
    return 'Pressed keys are highlighted. T indicates the octave key where shown.';
  }
  if (instrument.fingeringType === 'position') {
    return `Move the slide to ${ordinal(note.position)} position.`;
  }
  return 'Follow the highlighted controls.';
}

function accuracyNote(instrument) {
  const notes = {
    trumpet: 'Primary three-valve trumpet fingerings only; alternate fingerings are intentionally omitted.',
    flute: 'Primary closed-G♯ concert-flute fingerings only; alternate, trill, harmonic, and special-purpose fingerings are omitted.',
    clarinet: 'Primary Boehm-system fingerings only. Where left/right pinky equivalents exist, one standard choice is shown rather than every alternate.',
    'bass-clarinet': 'Primary Boehm-system fingerings are shown with a low-E♭ extension. Low-D and low-C extension layouts vary by model and are not included.',
    'alto-sax': 'Primary written-pitch saxophone fingerings only. Alternate and altissimo fingerings are omitted.',
    'tenor-sax': 'Primary written-pitch saxophone fingerings only. Alternate and altissimo fingerings are omitted.',
    'bari-sax': 'Primary written-pitch saxophone fingerings only, including the baritone low-A key. Alternate and altissimo fingerings are omitted.',
    horn: 'This chart is explicitly for a single F horn. Double-horn B♭-side choices are not mixed into the fingering display.',
    trombone: 'Standard straight-tenor seven-position choices are shown. F-attachment and context-specific alternate positions are omitted.',
    euphonium: 'Three-valve, bass-clef concert-pitch fingerings are shown. Fourth-valve alternatives are intentionally omitted.',
    tuba: 'BB♭ tuba, bass-clef concert-pitch three-valve fingerings are shown. Fourth-valve and compensating-system alternatives vary by instrument and are omitted.'
  };
  return notes[instrument.id] || 'Primary standard fingerings only.';
}

function configurationLabel(instrument) {
  const parts = [];
  if (instrument.configuration) parts.push(instrument.configuration);
  if (instrument.system) parts.push(`${instrument.system} system`);
  if (instrument.transposition && instrument.transposition !== 'C') parts.push(`${instrument.transposition} instrument`);
  if (instrument.clef) parts.push(`${instrument.clef} clef`);
  return parts.join(' • ');
}

function renderHome() {
  state.instrumentId = null;
  state.selectedPitch = null;
  homeButton.classList.add('hidden');
  auditLink.classList.remove('hidden');

  app.innerHTML = `
    <section class="hero">
      <p class="eyebrow">Two clicks to the answer</p>
      <h1>Find your fingering.</h1>
      <p class="lede">Choose an instrument, then choose the written note. Every enabled instrument uses structured fingering data and a reusable deterministic diagram — never a generated fingering image.</p>
    </section>

    <section aria-labelledby="choose-heading">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Middle school concert band</p>
          <h2 id="choose-heading">Choose an instrument</h2>
        </div>
        <span class="ready-count">${instruments.filter(i => i.status === 'verified').length} ready</span>
      </div>
      <div class="instrument-grid">
        ${instruments.map(instrument => {
          const ready = instrument.status === 'verified';
          return `
            <button class="instrument-card ${ready ? 'verified' : ''}" type="button" data-instrument="${instrument.id}" ${ready ? '' : 'disabled'}>
              <span class="icon" aria-hidden="true">${instrument.icon}</span>
              <span class="name">${escapeHtml(instrument.name)}</span>
              <span class="status">${ready ? 'Verified • ready' : 'Verification pending'}</span>
            </button>`;
        }).join('')}
      </div>
    </section>`;

  app.querySelectorAll('[data-instrument]:not([disabled])').forEach(button => {
    button.addEventListener('click', () => openInstrument(button.dataset.instrument));
  });
}

function openInstrument(id) {
  const instrument = instrumentById[id];
  if (!instrument || instrument.status !== 'verified') return;
  state.instrumentId = id;
  state.selectedPitch = null;
  state.rangeMode = 'beginner';
  homeButton.classList.remove('hidden');
  renderNotePicker();
}

function renderNotePicker() {
  const instrument = instrumentById[state.instrumentId];
  const notes = notesForRange(instrument);
  const groups = notes.reduce((acc, note) => {
    const group = registerGroup(instrument, note.pitch);
    (acc[group] ||= []).push(note);
    return acc;
  }, {});

  app.innerHTML = `
    <section class="hero compact-hero">
      <p class="eyebrow">${escapeHtml(instrument.name)} • written pitch</p>
      <h1>Choose a note.</h1>
      <p class="lede">Primary standard fingering or position only. ${escapeHtml(configurationLabel(instrument))}</p>
    </section>

    <div class="toolbar">
      <div>
        <strong>${notes.length} verified notes</strong><br>
        <span class="octave-label">Range: ${escapeHtml(instrument.ranges[state.rangeMode].label)}</span>
      </div>
      <div class="segmented" aria-label="Range mode">
        <button type="button" data-range="beginner" class="${state.rangeMode === 'beginner' ? 'active' : ''}">Beginner</button>
        <button type="button" data-range="full" class="${state.rangeMode === 'full' ? 'active' : ''}">Full</button>
      </div>
    </div>

    <div class="note-sections">
      ${['Low','Middle','High'].filter(group => groups[group]).map(group => `
        <section class="note-section">
          <h3>${group}</h3>
          <div class="note-grid">
            ${groups[group].map(note => `
              <button class="note-button" type="button" data-pitch="${note.pitch}">
                ${displayPitch(note.pitch)}
                <small>${note.pitch.replace(/[A-G][#b]?/, '')}</small>
              </button>`).join('')}
          </div>
        </section>`).join('')}
    </div>

    <p class="notice"><strong>Accuracy note:</strong> ${escapeHtml(accuracyNote(instrument))}</p>`;

  app.querySelectorAll('[data-range]').forEach(button => {
    button.addEventListener('click', () => {
      state.rangeMode = button.dataset.range;
      renderNotePicker();
    });
  });

  app.querySelectorAll('[data-pitch]').forEach(button => {
    button.addEventListener('click', () => renderFingering(button.dataset.pitch));
  });
}

function renderFingering(pitch) {
  const instrument = instrumentById[state.instrumentId];
  const notes = notesForRange(instrument);
  const index = notes.findIndex(note => note.pitch === pitch);
  if (index < 0) return;

  state.selectedPitch = pitch;
  const note = notes[index];
  const previous = notes[index - 1] || null;
  const next = notes[index + 1] || null;
  const label = fingeringLabel(instrument, note);

  app.innerHTML = `
    <div class="toolbar">
      <div>
        <p class="eyebrow">${escapeHtml(instrument.name)} • written pitch</p>
        <strong>${escapeHtml(instrument.ranges[state.rangeMode].label)} ${state.rangeMode} range</strong>
      </div>
      <div class="segmented" aria-label="Range mode">
        <button type="button" data-range="beginner" class="${state.rangeMode === 'beginner' ? 'active' : ''}">Beginner</button>
        <button type="button" data-range="full" class="${state.rangeMode === 'full' ? 'active' : ''}">Full</button>
      </div>
    </div>

    <article class="detail-card">
      <div class="detail-top">
        <section class="note-panel">
          <p class="eyebrow">Written note</p>
          <div class="note-name">${displayPitch(note.pitch)}</div>
          <div class="staff-wrap">${renderStaff(note.pitch, instrument.clef)}</div>
          <p class="octave-label">Pitch ID: ${note.pitch} • ${escapeHtml(instrument.clef)} clef</p>
        </section>
        <section class="fingering-panel">
          <p class="eyebrow">${instrument.fingeringType === 'position' ? 'Standard primary position' : 'Standard primary fingering'}</p>
          <div class="diagram-scroll">${renderDiagram(instrument, note)}</div>
          <div class="fingering-label">${escapeHtml(label)}</div>
          <p class="fingering-note">${escapeHtml(fingeringInstruction(instrument, note))}</p>
        </section>
      </div>
      <nav class="detail-nav" aria-label="Adjacent notes">
        <button class="nav-button" type="button" data-nav="prev" ${previous ? '' : 'disabled'}>${previous ? `← ${displayPitch(previous.pitch)}` : '←'}</button>
        <span class="current-chip">${displayPitch(note.pitch, true)}</span>
        <button class="nav-button" type="button" data-nav="next" ${next ? '' : 'disabled'}>${next ? `${displayPitch(next.pitch)} →` : '→'}</button>
      </nav>
    </article>

    <div class="back-row">
      <button id="backToNotes" class="quiet-button" type="button">← Back to notes</button>
      <span class="octave-label">Source-verified • primary fingering/position only</span>
    </div>`;

  app.querySelectorAll('[data-range]').forEach(button => {
    button.addEventListener('click', () => {
      state.rangeMode = button.dataset.range;
      const available = notesForRange(instrument);
      if (available.some(n => n.pitch === state.selectedPitch)) renderFingering(state.selectedPitch);
      else renderNotePicker();
    });
  });

  app.querySelector('#backToNotes').addEventListener('click', renderNotePicker);
  app.querySelector('[data-nav="prev"]').addEventListener('click', () => previous && renderFingering(previous.pitch));
  app.querySelector('[data-nav="next"]').addEventListener('click', () => next && renderFingering(next.pitch));
}

function auditInstrumentId() {
  const requested = new URLSearchParams(location.search).get('audit');
  if (requested && requested !== '1' && instrumentById[requested]?.status === 'verified') return requested;
  return instruments.find(instrument => instrument.status === 'verified')?.id || 'trumpet';
}

function renderAudit(instrumentId = auditInstrumentId()) {
  homeButton.classList.remove('hidden');
  auditLink.classList.add('hidden');
  const instrument = instrumentById[instrumentId];

  app.innerHTML = `
    <section class="hero compact-hero">
      <p class="eyebrow">Teacher mode</p>
      <h1>Fingering audit.</h1>
      <p class="lede">Every student-visible fingering below is rendered from the same structured data used by the main app. This page exists to make mismatches conspicuous before students see them.</p>
    </section>

    <div class="audit-switcher" aria-label="Choose audit instrument">
      ${instruments.filter(i => i.status === 'verified').map(i => `
        <button type="button" class="quiet-button ${i.id === instrument.id ? 'audit-active' : ''}" data-audit-instrument="${i.id}">${escapeHtml(i.name)}</button>
      `).join('')}
    </div>

    <div class="audit-source">
      <span class="status-pill">Verified</span>
      <h2 style="margin-top:12px">${escapeHtml(instrument.name)}</h2>
      <p><strong>Configuration:</strong> ${escapeHtml(configurationLabel(instrument))}</p>
      <p><strong>Primary source:</strong> <a href="${instrument.verification.sourceUrl}" target="_blank" rel="noreferrer">${escapeHtml(instrument.verification.sourceName)}</a></p>
      ${instrument.verification.crossCheckUrl ? `<p><strong>Cross-check:</strong> <a href="${instrument.verification.crossCheckUrl}" target="_blank" rel="noreferrer">${escapeHtml(instrument.verification.crossCheckName)}</a></p>` : ''}
      <p><strong>Reviewed:</strong> ${escapeHtml(instrument.verification.reviewed)}</p>
      <p>${escapeHtml(instrument.verification.scope)}</p>
    </div>

    <div class="audit-table-wrap">
      <table class="audit-table">
        <thead><tr><th>Pitch</th><th>Fingering / position</th><th>Rendered diagram</th></tr></thead>
        <tbody>
          ${instrument.notes.map(note => `
            <tr>
              <td><strong>${displayPitch(note.pitch, true)}</strong></td>
              <td>${escapeHtml(fingeringLabel(instrument, note))}</td>
              <td>${renderDiagram(instrument, note, { mini: true })}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;

  app.querySelectorAll('[data-audit-instrument]').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.auditInstrument;
      history.replaceState({}, '', `?audit=${id}`);
      renderAudit(id);
    });
  });
}

homeButton.addEventListener('click', () => {
  if (new URLSearchParams(location.search).has('audit')) {
    history.pushState({}, '', location.pathname);
  }
  renderHome();
});

const params = new URLSearchParams(location.search);
if (params.has('audit')) renderAudit();
else renderHome();
