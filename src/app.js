import { instruments, instrumentById } from './data/instruments.js';
import { displayPitch, pitchRank } from './components/pitch.js';
import { renderStaff } from './components/staff.js';
import { renderValveDiagram } from './diagrams/valveDiagram.js';
import { renderFluteDiagram } from './diagrams/fluteDiagram.js';

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
  return instrument.notes.filter(n => {
    const rank = pitchRank(n.pitch);
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

function fingeringLabel(instrument, note) {
  if (instrument.fingeringType === 'valves') {
    return note.valves.length ? note.valves.join(' + ') : 'OPEN';
  }
  if (instrument.fingeringType === 'keys') {
    return note.sourceNotation;
  }
  return '';
}

function renderDiagram(instrument, note, options = {}) {
  if (instrument.fingeringType === 'valves') return renderValveDiagram(note.valves, options);
  if (instrument.id === 'flute') return renderFluteDiagram(note.keys, options);
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
  return 'Follow the highlighted controls.';
}

function accuracyNote(instrument) {
  if (instrument.id === 'trumpet') {
    return 'Alternate trumpet fingerings are intentionally not shown. The app uses the primary fingering on the verified source chart.';
  }
  if (instrument.id === 'flute') {
    return 'This version uses primary closed-G♯ concert-flute fingerings only. Alternate, trill, harmonic, and special-purpose fingerings are intentionally omitted.';
  }
  return 'Primary standard fingerings only.';
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
      <p class="lede">Choose an instrument, then choose the written note. Only instruments with verified fingering data are enabled. No generated fingering pictures and no guessed entries.</p>
    </section>

    <section aria-labelledby="choose-heading">
      <h2 id="choose-heading">Choose an instrument</h2>
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
    <section class="hero">
      <p class="eyebrow">${escapeHtml(instrument.name)} • written pitch</p>
      <h1>Choose a note.</h1>
      <p class="lede">Primary standard fingering only. The note buttons are grouped by written register.</p>
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
      ${['Low','Middle','High'].filter(g => groups[g]).map(group => `
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
  const index = notes.findIndex(n => n.pitch === pitch);
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
          <div class="staff-wrap">${renderStaff(note.pitch)}</div>
          <p class="octave-label">Pitch ID: ${note.pitch}</p>
        </section>
        <section class="fingering-panel">
          <p class="eyebrow">Standard primary fingering</p>
          ${renderDiagram(instrument, note)}
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
      <span class="octave-label">Source-verified • primary fingering only</span>
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
  return instruments.find(i => i.status === 'verified')?.id || 'trumpet';
}

function renderAudit(instrumentId = auditInstrumentId()) {
  homeButton.classList.remove('hidden');
  auditLink.classList.add('hidden');
  const instrument = instrumentById[instrumentId];

  app.innerHTML = `
    <section class="hero">
      <p class="eyebrow">Teacher mode</p>
      <h1>Fingering audit.</h1>
      <p class="lede">Every student-visible fingering below is rendered from the same structured data used by the main app. This page exists to make mistakes conspicuous before students see them.</p>
    </section>

    <div class="audit-switcher" aria-label="Choose audit instrument">
      ${instruments.filter(i => i.status === 'verified').map(i => `
        <button type="button" class="quiet-button ${i.id === instrument.id ? 'audit-active' : ''}" data-audit-instrument="${i.id}">${escapeHtml(i.name)}</button>
      `).join('')}
    </div>

    <div class="audit-source">
      <span class="status-pill">Verified</span>
      <h2 style="margin-top:12px">${escapeHtml(instrument.name)}</h2>
      <p><strong>Primary source:</strong> <a href="${instrument.verification.sourceUrl}" target="_blank" rel="noreferrer">${escapeHtml(instrument.verification.sourceName)}</a></p>
      ${instrument.verification.crossCheckUrl ? `<p><strong>Cross-check:</strong> <a href="${instrument.verification.crossCheckUrl}" target="_blank" rel="noreferrer">${escapeHtml(instrument.verification.crossCheckName)}</a></p>` : ''}
      <p><strong>Reviewed:</strong> ${escapeHtml(instrument.verification.reviewed)}</p>
      <p>${escapeHtml(instrument.verification.scope)}</p>
    </div>

    <div class="audit-table-wrap">
      <table class="audit-table">
        <thead><tr><th>Pitch</th><th>Fingering</th><th>Rendered diagram</th></tr></thead>
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
