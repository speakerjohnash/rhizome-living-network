/* Rhizome mobile visualizations
 * Optional presentation layer. Original renderers, scenario state, and data
 * remain authoritative. Never loads external code or sends user information.
 * This module is inert above 600 CSS pixels.
 */
(() => {
  'use strict';

  const media = window.matchMedia('(max-width: 600px)');
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const palette = Object.freeze({
    blue: '#91a6ff', green: '#9becaa', pink: '#f5a1d8',
    purple: '#c59af4', orange: '#ffbd86', red: '#ff8b9b',
    muted: '#a7bbd4', white: '#f0f5ff', dark: '#121b32'
  });
  const charts = [
    { id: 'federationChart', title: 'Community federation', mode: 'adaptive', render: renderFederation },
    { id: 'routingChart', title: 'Protected network routes', mode: 'adaptive', render: renderRoute },
    { id: 'computeChart', title: 'Private computation', mode: 'adaptive', render: renderComputation },
    { id: 'perspectiveChart', title: 'Historical perspectives', mode: 'explore' },
    { id: 'classificationChart', title: 'Changing classification', mode: 'explore' },
    { id: 'relationsChart', title: 'Relationship field', mode: 'explore' },
    { id: 'resilienceChart', title: 'Distributed failure timeline', mode: 'adaptive', render: renderFailure },
    { id: 'diagnosticsChart', title: 'Failure attribution pipeline', mode: 'adaptive', render: renderDiagnostics },
    { id: 'hardwareChart', title: 'Implementation feasibility', mode: 'explore' }
  ];
  const active = new Map();
  let dialog = null;
  let zoom = 1;
  let originalPosition = null;
  let refreshQueued = false;
  let started = false;

  const byId = id => document.getElementById(id);
  const text = (tag, className, content) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    el.textContent = content;
    return el;
  };
  const svgEl = (tag, attrs = {}, parent = null, content = undefined) => {
    const node = document.createElementNS(SVG_NS, tag);
    for (const [key, value] of Object.entries(attrs)) {
      if (value !== null && value !== undefined) node.setAttribute(key, String(value));
    }
    if (content !== undefined) node.textContent = String(content);
    if (parent) parent.appendChild(node);
    return node;
  };
  const button = (label, className, handler) => {
    const b = text('button', className, label);
    b.type = 'button';
    b.addEventListener('click', handler);
    return b;
  };
  const chosen = attribute => {
    const elements = [...document.querySelectorAll(`[${attribute}]`)];
    const selected = elements.find(x => x.classList.contains('active') || x.getAttribute('aria-pressed') === 'true');
    return selected ? selected.getAttribute(attribute) : (elements[0]?.getAttribute(attribute) ?? '');
  };
  function createDrawing(width, height, label, interactive = false) {
    const svg = svgEl('svg', {
      viewBox: `0 0 ${width} ${height}`,
      preserveAspectRatio: 'xMidYMin meet',
      role: interactive ? 'group' : 'img',
      'aria-label': label,
      class: 'rh-mobile-svg'
    });
    svgEl('title', {}, svg, label);
    return svg;
  }
  function drawLine(svg, x1, y1, x2, y2, color, dashed = false) {
    return svgEl('path', {
      d: `M ${x1} ${y1} L ${x2} ${y2}`,
      fill: 'none', stroke: color, 'stroke-width': 2.5,
      'stroke-linecap': 'round',
      'stroke-dasharray': dashed ? '5 7' : null,
      opacity: dashed ? '.8' : '.84'
    }, svg);
  }
  function drawPath(svg, path, color, dashed = false, width = 2.7) {
    return svgEl('path', {
      d: path, fill: 'none', stroke: color,
      'stroke-width': width, 'stroke-linecap': 'round',
      'stroke-dasharray': dashed ? '7 8' : null, opacity: '.87'
    }, svg);
  }
  function drawLabel(svg, x, y, label, options = {}) {
    return svgEl('text', {
      x, y, fill: options.color || palette.white,
      'text-anchor': options.anchor || 'middle',
      'font-family': 'system-ui, -apple-system, sans-serif',
      'font-size': options.size || 11,
      'font-weight': options.weight || 750,
      'letter-spacing': options.spacing || '.03em'
    }, svg, label);
  }
  function wrapLabel(svg, x, y, label, { max = 16, color = palette.muted, size = 10 } = {}) {
    const words = String(label).split(/\s+/);
    const lines = [];
    let current = '';
    for (const word of words) {
      if (current && `${current} ${word}`.length > max) {
        lines.push(current); current = word;
      } else {
        current = current ? `${current} ${word}` : word;
      }
    }
    if (current) lines.push(current);
    lines.slice(0, 3).forEach((line, index) =>
      drawLabel(svg, x, y + index * 14, line, { color, size })
    );
  }
  function drawNode(svg, x, y, key, name, color, details, entry, radius = 31) {
    const node = svgEl('g', {
      role: 'button', tabindex: '0', 'aria-label': `${key}: ${name}. Tap for details.`,
      class: 'rh-mobile-node', style: 'cursor:pointer'
    }, svg);
    svgEl('circle', { cx: x, cy: y, r: radius + 10, fill: color, 'fill-opacity': '.065', stroke: color, 'stroke-opacity': '.25', 'stroke-width': 1 }, node);
    svgEl('circle', { cx: x, cy: y, r: radius, fill: palette.dark, stroke: color, 'stroke-width': 2 }, node);
    drawLabel(node, x, y + 6, key, { size: 17, weight: 850 });
    drawLabel(node, x, y + radius + 28, name, { size: 10, color });
    const show = () => {
      if (entry.feedback) entry.feedback.textContent = details;
      node.classList.add('rh-mobile-selected');
      node.parentNode.querySelectorAll('.rh-mobile-node').forEach(other => {
        if (other !== node) other.classList.remove('rh-mobile-selected');
      });
    };
    node.addEventListener('click', show);
    node.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault(); show();
      }
    });
    return node;
  }
  function shortNote(entry, message) {
    if (entry.feedback) entry.feedback.textContent = message;
  }
  function setGraphic(entry, drawing) {
    entry.graphic.replaceChildren(drawing);
  }

  function renderFederation(entry) {
    const state = chosen('data-federation');
    const svg = createDrawing(360, 585,
      `Mobile federation diagram: ${state}. Four separate communities with scoped relationships.`, true);
    // Sparse vertical path keeps every participant and edge in the first visible column.
    const nodes = [
      [96, 95, 'A', 'RESEARCH', palette.blue],
      [260, 218, 'B', 'MUTUAL AID', palette.green],
      [96, 356, 'C', 'COOPERATIVE', palette.pink],
      [260, 482, 'D', 'ARCHIVE', palette.orange]
    ];
    if (state === 'introduced') {
      drawPath(svg, 'M 118 119 Q 190 144 239 196', palette.orange, true);
      drawLabel(svg, 194, 129, 'PROPOSED', { color: palette.orange, size: 10 });
    } else if (state === 'approved') {
      drawPath(svg, 'M 118 119 Q 190 144 239 196', palette.green);
      drawPath(svg, 'M 239 243 Q 186 285 118 334', palette.green);
      drawLabel(svg, 183, 284, 'SIGNED', { color: palette.green, size: 10 });
    } else if (state === 'breach') {
      drawPath(svg, 'M 118 119 Q 190 144 239 196', palette.red, true);
      drawPath(svg, 'M 239 243 Q 186 285 118 334', palette.green);
      drawLabel(svg, 191, 132, 'SUSPENDED', { color: palette.red, size: 10 });
    }
    nodes.forEach(([x, y, key, name, color]) =>
      drawNode(svg, x, y, key, name, color,
        `Community ${key}, ${name}. Membership and hosting never automatically grant access to private vaults.`, entry));
    drawLabel(svg, 178, 574, 'NO TRANSITIVE PRIVATE ACCESS', { color: palette.muted, size: 10 });
    setGraphic(entry, svg);
    shortNote(entry,
      state === 'approved' ? 'A–B and B–C are authorized. A–C has no implied relationship.' :
      state === 'introduced' ? 'A proposal is not a signed authorization.' :
      state === 'breach' ? 'The compromised A–B connection is suspended; B–C remains separate.' :
      'No community receives another community’s permissions by default.');
  }

  function renderRoute(entry) {
    const state = chosen('data-route');
    const failure = byId('routeFailure')?.getAttribute('aria-pressed') === 'true';
    const nodes = state === 'core' ? [
      ['YOU', 'PRIVATE CLIENT'], ['01', 'ENTRY RELAY'],
      ['02', 'INDEPENDENT HOP'], ['03', 'EXIT RELAY'], ['PEER', 'VERIFIED DESTINATION']
    ] : state === 'mix' ? [
      ['YOU', 'PRIVATE CLIENT'], ['01', 'MIX ENTRY'],
      ['02', 'BATCH AND DELAY'], ['03', 'INDEPENDENT HOP'],
      ['04', 'MIX EXIT'], ['PEER', 'VERIFIED DESTINATION']
    ] : [['YOU', 'PRIVATE CLIENT'], ['PEER', 'VERIFIED DESTINATION']];
    const step = 94;
    const height = 110 + step * (nodes.length - 1) + 74;
    const svg = createDrawing(360, height,
      `Mobile route diagram: ${state}${failure ? ', relay failure blocks forwarding' : ''}.`);
    const x = 75;
    const start = 77;
    nodes.forEach(([key, label], i) => {
      const y = start + i * step;
      if (i < nodes.length - 1) {
        const blocked = failure && (state === 'core' ? i >= 1 : state === 'mix' ? i >= 2 : false);
        drawLine(svg, x, y + 28, x, y + step - 28,
          blocked ? palette.red : palette.purple, blocked);
      }
      const isFailed = failure && (state === 'core' ? i === 2 : state === 'mix' ? i === 3 : false);
      svgEl('circle', {
        cx: x, cy: y, r: 29, fill: palette.dark,
        stroke: isFailed ? palette.red : i === 0 ? palette.blue : i === nodes.length - 1 ? palette.green : palette.purple,
        'stroke-width': 2
      }, svg);
      drawLabel(svg, x, y + 5, key, { size: key.length > 2 ? 12 : 15 });
      drawLabel(svg, 124, y - 4, label, {
        anchor: 'start', size: 12,
        color: isFailed ? palette.red : palette.white
      });
      drawLabel(svg, 124, y + 17, isFailed ? 'RELAY OFFLINE' :
        i === 0 ? 'Owner-controlled endpoint' :
        i === nodes.length - 1 ? 'Verified recipient' :
        'Independent forwarding stage',
      { anchor: 'start', size: 10, color: isFailed ? palette.red : palette.muted });
    });
    drawLabel(svg, 180, height - 31,
      failure ? 'NO INSECURE FALLBACK' : 'END-TO-END CONTENT ENCRYPTION',
      { color: failure ? palette.red : palette.green, size: 11 });
    setGraphic(entry, svg);
    shortNote(entry, failure ?
      'Relay failure blocks the simulated protected route. It does not silently connect directly.' :
      state === 'direct' ? 'A direct peer connection exposes more routing metadata.' :
      state === 'mix' ? 'Mix relays delay and batch messages; anonymity is not guaranteed.' :
      'Separate relays can limit individual observers’ view of routing metadata.');
  }

  function renderComputation(entry) {
    // Use the authoritative desktop SVG's current text labels; avoid copying
    // the six scenario definitions into a second state machine.
    const originals = [...entry.original.querySelectorAll('text')].map(node => node.textContent?.trim() || '');
    const labels = [originals[0] || 'LOCAL SOURCE A', originals[1] || 'LOCAL SOURCE B',
      originals[2] || 'AUTHORIZED COMPUTATION', originals[5] || 'APPROVED RESULT'];
    const svg = createDrawing(360, 530,
      'Private computation: two independent inputs combine in a scoped process, producing an authorized output.');
    drawLabel(svg, 180, 29, 'SEPARATE TRUST DOMAINS', { size: 11, color: palette.muted });

    // Wires stay behind the cards. They do not pass through any caption.
    drawPath(svg, 'M 90 165 C 90 204 154 204 170 226', palette.blue);
    drawPath(svg, 'M 270 165 C 270 204 206 204 190 226', palette.pink);
    drawLine(svg, 180, 333, 180, 403, palette.green);

    function card(x, y, width, height, color, title, detail, maxWords) {
      svgEl('rect', { x, y, width, height, rx: 16,
        fill: '#151c37', stroke: color, 'stroke-width': 1.5,
        'stroke-opacity': '.87' }, svg);
      svgEl('rect', { x: x + 1, y: y + 1, width: width - 2, height: height - 2,
        rx: 15, fill: color, 'fill-opacity': '.04' }, svg);
      drawLabel(svg, x + width / 2, y + 29, title, { color, size: 13, weight: 900 });
      wrapLabel(svg, x + width / 2, y + 51, detail,
        { max: maxWords, color: palette.white, size: 10 });
    }
    card(15, 75, 150, 90, palette.blue, 'SOURCE A', labels[0], 18);
    card(195, 75, 150, 90, palette.pink, 'SOURCE B', labels[1], 18);
    card(61, 225, 238, 108, palette.purple, 'SCOPED PROCESS', labels[2], 27);
    card(61, 403, 238, 86, palette.green, 'AUTHORIZED RESULT', labels[3], 27);
    drawLabel(svg, 180, 518, 'ONLY APPROVED OUTPUT LEAVES', { color: palette.green, size: 10 });
    setGraphic(entry, svg);
    shortNote(entry, 'The current computation scenario, limitations, and hardware guidance remain in the explanation below.');
  }

  function renderFailure(entry) {
    // Reconstruct the mobile timeline from the desktop chart's current event
    // marks, rather than maintaining a second copy of the scenario data.
    const points = [];
    for (const group of entry.original.querySelectorAll('g')) {
      const circle = [...group.children].find(node => node.tagName?.toLowerCase() === 'circle');
      const label = [...group.children].find(node => node.tagName?.toLowerCase() === 'text');
      if (!circle || !label) continue;
      const x = Number(circle.getAttribute('cx'));
      const y = Number(circle.getAttribute('cy'));
      const t = Math.round((x - 100) / 79);
      if (!Number.isFinite(x) || ![92, 203, 314].some(v => Math.abs(v - y) < 3) || t < 1 || t > 11) continue;
      const node = Math.abs(y - 92) < 3 ? 'A' : Math.abs(y - 203) < 3 ? 'B' : 'C';
      const message = label.textContent.trim();
      if (message) points.push({ node, t, message });
    }
    points.sort((a, b) => a.t - b.t);
    const wrap = document.createElement('div');
    wrap.className = 'rh-mobile-events';
    if (!points.length) {
      wrap.append(text('p', 'rh-mobile-empty', 'Timeline markers unavailable. Use Full view to inspect the complete diagram.'));
    } else {
      const list = document.createElement('ol');
      list.className = 'rh-mobile-steps';
      for (const event of points) {
        const item = document.createElement('li');
        const alert = /blocked|denied|partition|stale|fork|conflict|quarantine/i.test(event.message);
        if (alert) item.classList.add('rh-mobile-event-alert');
        item.append(text('span', 'rh-step-time', `T+${event.t}`));
        item.append(text('span', 'rh-step-node', `NODE ${event.node}`));
        item.append(text('span', 'rh-step-action', event.message));
        list.appendChild(item);
      }
      wrap.appendChild(list);
    }
    setGraphic(entry, wrap);
  }

  function renderDiagnostics(entry) {
    const pipeline = [
      ['W', 'World'], ['U', 'User'], ['Q', 'Query'],
      ['R', 'Retrieval'], ['F', 'Fetch'], ['E', 'Extract'],
      ['K', 'Context'], ['C', 'Claim'], ['T', 'Tools'],
      ['S', 'Synthesis'], ['P', 'Presentation'], ['D', 'Decision']
    ];
    const current = chosen('data-incident');
    const firstDefect = ({ retrieval: 3, auth: 5, model: 9 })[current] ?? 3;
    const wrap = document.createElement('div');
    wrap.className = 'rh-mobile-events rh-mobile-diagnostics';
    const list = document.createElement('ol');
    list.className = 'rh-mobile-steps';
    pipeline.forEach(([initial, name], index) => {
      const item = document.createElement('li');
      if (index === firstDefect) item.classList.add('rh-mobile-event-alert');
      if (index > firstDefect) item.classList.add('rh-mobile-event-subsequent');
      item.append(text('span', 'rh-step-symbol', initial));
      item.append(text('span', 'rh-step-action', name));
      item.append(text('span', 'rh-step-status', index === firstDefect ? 'FIRST DEFECT' : index < firstDefect ? 'OBSERVED UPSTREAM' : 'DOWNSTREAM'));
      list.appendChild(item);
    });
    wrap.appendChild(list);
    setGraphic(entry, wrap);
  }

  function buildDialog() {
    const node = document.createElement('dialog');
    node.id = 'rhMobileDialog';
    node.className = 'rh-mobile-dialog';
    node.setAttribute('aria-label', 'Expanded visualization');
    const header = document.createElement('div');
    header.className = 'rh-mobile-dialog-header';
    const heading = text('h2', 'rh-mobile-dialog-title', 'Full visualization');
    heading.id = 'rhMobileDialogTitle';
    node.setAttribute('aria-labelledby', heading.id);
    const close = button('Close ×', 'rh-mobile-close', () => { node.close(); restoreOriginal(); });
    header.append(heading, close);
    const controls = document.createElement('div');
    controls.className = 'rh-mobile-zoom';
    controls.append(
      button('−', 'rh-mobile-zoom-button', () => changeZoom(1 / 1.3)),
      button('Fit', 'rh-mobile-zoom-button', () => fitZoom()),
      button('+', 'rh-mobile-zoom-button', () => changeZoom(1.3))
    );
    const hint = text('p', 'rh-mobile-dialog-hint', 'Scroll to pan. Use + and − to change scale. Close to return.');
    const viewport = document.createElement('div');
    viewport.className = 'rh-mobile-dialog-viewport';
    viewport.tabIndex = 0;
    viewport.setAttribute('role', 'region');
    viewport.setAttribute('aria-label', 'Scrollable full-size visualization');
    viewport.id = 'rhMobileDialogViewport';
    node.append(header, controls, hint, viewport);
    document.body.appendChild(node);
    node.addEventListener('close', restoreOriginal);
    node.addEventListener('cancel', () => { /* Native Escape handling closes the dialog. */ });
    return node;
  }
  function chartDimensions(svg) {
    const values = svg.getAttribute('viewBox')?.trim().split(/[\s,]+/).map(Number);
    const width = values?.length === 4 && Number.isFinite(values[2]) && values[2] > 0 ? values[2] : 800;
    const height = values?.length === 4 && Number.isFinite(values[3]) && values[3] > 0 ? values[3] : 450;
    return { width, height };
  }
  function drawModalSize() {
    if (!originalPosition) return;
    const { svg, width, height } = originalPosition;
    const px = Math.round(width * zoom);
    svg.style.width = `${px}px`;
    svg.style.height = `${Math.round(height * zoom)}px`;
    svg.style.minWidth = '0';
    svg.style.minHeight = '0';
    svg.style.maxWidth = 'none';
    svg.style.maxHeight = 'none';
  }
  function changeZoom(factor) {
    zoom = Math.max(.3, Math.min(2.5, zoom * factor));
    drawModalSize();
  }
  function fitZoom() {
    if (!originalPosition) return;
    const viewport = byId('rhMobileDialogViewport');
    zoom = Math.min(1, Math.max(.3, (viewport.clientWidth - 20) / originalPosition.width));
    drawModalSize();
    viewport.scrollTo({ top: 0, left: 0 });
  }
  function openFullView(entry) {
    if (!dialog || !entry.original || !dialog.showModal) return;
    if (dialog.open) dialog.close();
    const svg = entry.original;
    const dimensions = chartDimensions(svg);
    originalPosition = {
      svg, parent: svg.parentNode, nextSibling: svg.nextSibling,
      css: svg.style.cssText, width: dimensions.width, height: dimensions.height
    };
    byId('rhMobileDialogTitle').textContent = entry.config.title;
    byId('rhMobileDialogViewport').appendChild(svg);
    zoom = 1;
    drawModalSize();
    try {
      dialog.showModal();
      byId('rhMobileDialogViewport').scrollTo({ top: 0, left: 0 });
    } catch (error) {
      restoreOriginal();
      throw error;
    }
  }
  function restoreOriginal() {
    if (!originalPosition) return;
    const { svg, parent, nextSibling, css } = originalPosition;
    if (nextSibling && nextSibling.parentNode === parent) {
      parent.insertBefore(svg, nextSibling);
    } else {
      parent.appendChild(svg);
    }
    svg.style.cssText = css;
    originalPosition = null;
  }

  function addMobileUI(config) {
    const original = byId(config.id);
    if (!original || !original.parentNode) return;
    const holder = original.parentNode;
    const toolbar = document.createElement('div');
    toolbar.className = 'rh-mobile-toolbar';
    toolbar.append(text('span', 'rh-mobile-kicker',
      config.mode === 'adaptive' ? 'MOBILE VIEW' : 'EXPLORE THE DETAIL'));
    const entry = { config, original, toolbar, graphic: null, feedback: null };
    toolbar.append(button('Full view ↗', 'rh-mobile-full', () => openFullView(entry)));
    holder.insertBefore(toolbar, original);
    if (config.mode === 'adaptive') {
      const graphic = document.createElement('div');
      graphic.className = 'rh-mobile-graphic';
      graphic.setAttribute('data-rhizome-mobile', config.id);
      original.insertAdjacentElement('afterend', graphic);
      entry.graphic = graphic;
      if (['federationChart', 'routingChart', 'computeChart'].includes(config.id)) {
        const feedback = text('p', 'rh-mobile-feedback', 'Explore the diagram.');
        feedback.setAttribute('role', 'status');
        feedback.setAttribute('aria-live', 'polite');
        graphic.insertAdjacentElement('afterend', feedback);
        entry.feedback = feedback;
      }
    } else {
      const hint = text('p', 'rh-mobile-scroll-hint', 'Swipe horizontally to explore, or select Full view to pan and zoom.');
      original.insertAdjacentElement('beforebegin', hint);
    }
    active.set(config.id, entry);
  }
  function refresh() {
    refreshQueued = false;
    if (!media.matches || (dialog && dialog.open)) return;
    for (const entry of active.values()) {
      if (entry.config.render) {
        try { entry.config.render(entry); }
        catch (error) {
          console.error(`Rhizome mobile layout failed for ${entry.config.id}`, error);
          // The original SVG remains accessible with the Full view button.
          entry.graphic.replaceChildren(text('p', 'rh-mobile-empty',
            'Mobile layout unavailable. Open Full view for the complete chart.'));
        }
      }
    }
  }
  function requestRefresh() {
    if (refreshQueued) return;
    refreshQueued = true;
    window.requestAnimationFrame(refresh);
  }
  function initialize() {
    if (!media.matches) return;
    if (!started) {
      dialog = buildDialog();
      charts.forEach(addMobileUI);
      document.addEventListener('click', event => {
        if (event.target.closest('[data-federation], [data-route], #routeFailure, [data-compute], [data-incident], [data-failure]')) {
          requestRefresh();
        }
      });
      started = true;
    }
    requestRefresh();
  }
  if (media.addEventListener) media.addEventListener('change', event => {
    if (!event.matches && dialog?.open) dialog.close();
    initialize();
  });
  else media.addListener(event => {
    if (!event.matches && dialog?.open) dialog.close();
    initialize();
  });
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
