/* All examples are fictional and in-memory. No storage, model or network calls. */
(() => {
  'use strict';
  const byId = id => document.getElementById(id);
  const set = (id, text) => { byId(id).textContent = text; };
  const select = (attribute, value) => {
    document.querySelectorAll(`[${attribute}]`).forEach(button => {
      button.setAttribute('aria-pressed', String(button.getAttribute(attribute) === String(value)));
    });
  };
  const forms = {
    question: { text: 'What would help us harvest more fruit before it spoils?', context: 'A question gives a direction to inquiry. Its value can emerge from what investigating it makes possible.', reference: 'Opens an inquiry' },
    statement: { text: 'Ten people have volunteered for the next harvest.', context: 'A present claim can be checked, questioned, and connected to what the community does next.', reference: 'Responds to the harvest inquiry', verity: .9, valence: .8 },
    prediction: { text: 'Weekly harvests will reduce the amount of fruit we lose this month.', context: 'The expectation is recorded before its outcome. Wanting it to happen is different from believing it will.', reference: 'Responds to the harvest inquiry', verity: .6, valence: .8 },
    reflection: { text: 'We lost fruit last month because we did not have enough people to harvest it.', context: 'A reflection makes a claim about the past. Others can question its explanation or bring further evidence.', reference: 'Looks back on the previous harvest', verity: .6, valence: -.7 }
  };
  const signed = value => `${value > 0 ? '+' : ''}${value.toFixed(2)}`;
  function renderAxes() {
    const verity = Number(byId('verity').value), valence = Number(byId('valence').value);
    set('verityValue', signed(verity)); set('valenceValue', signed(valence));
    const belief = verity > .1 ? 'You lean toward believing the claim.' : verity < -.1 ? 'You lean toward believing the claim is false.' : 'You are uncertain about the claim.';
    const value = valence > .1 ? 'You view its meaning or outcome positively.' : valence < -.1 ? 'You view its meaning or outcome negatively.' : 'You feel neutral about its meaning or outcome.';
    set('axisInsight', `${belief} ${value} These judgments remain separate.`);
  }
  document.querySelectorAll('[data-form]').forEach(button => button.addEventListener('click', () => {
    const type = button.dataset.form, form = forms[type];
    select('data-form', type); set('thoughtType', type.toUpperCase());
    set('thoughtText', form.text); set('thoughtContext', form.context); set('thoughtReference', form.reference);
    byId('claimAxes').hidden = type === 'question'; byId('questionNote').hidden = type !== 'question';
    if (type !== 'question') {
      byId('verity').value = form.verity; byId('valence').value = form.valence; renderAxes();
    }
  }));
  ['verity', 'valence'].forEach(id => byId(id).addEventListener('input', renderAxes));
  renderAxes();

  const history = [
    ['AT THE BEGINNING', 'Make room for a question.', 'The community has named an uncertainty worth investigating. No future result is available yet.'],
    ['BEFORE THE OUTCOME', 'Record an expectation.', 'Mara expects weekly harvests to help. Her confidence and the value she places on the outcome are recorded separately.'],
    ['TWO VOICES IN VIEW', 'Agreement on a goal can include doubt.', 'Eli wants less fruit to go to waste, but doubts this prediction. The record holds both assessments rather than replacing them with a single community opinion.'],
    ['LOOKING BACK', 'Keep the lesson open.', 'Mara reports less waste and another change: more volunteers. Her reflection adds context without rewriting the prediction or pretending the cause is settled. The community has another question to pursue.']
  ];
  document.querySelectorAll('[data-moment]').forEach(button => button.addEventListener('click', () => {
    const moment = Number(button.dataset.moment); select('data-moment', moment);
    document.querySelectorAll('[data-record]').forEach(record => { record.hidden = Number(record.dataset.record) > moment; });
    const [label, title, explanation] = history[moment];
    set('historyLabel', label); set('historyTitle', title); set('historyExplanation', explanation); set('recordCount', moment + 1);
    document.querySelector('.history-count span').textContent = moment === 0 ? 'contribution in view' : 'contributions in view';
  }));

  const signals = {
    foresight: ['THE PROPHET INCENTIVE', 'Who saw something before it became clear?', 'Preserving the original claim and its surrounding disagreement lets later understanding recognize contextual foresight, including insights that were initially unpopular.'],
    impact: ['SOCIAL PROOF OF IMPACT', 'Who helped bring a wanted future about?', 'The record can connect intentions, actions, and subsequent outcomes. Contributing to change is different from predicting it; later reflections help a community examine both.'],
    questions: ['FRUITFUL QUESTIONING', 'Which questions led us somewhere useful?', 'A question earns its place through the inquiry it opens. The history can preserve the connections from a question to later evidence, understanding, or action.'],
    reflection: ['REFLECTIVE COMPRESSION', 'What have we learned that is worth carrying forward?', 'A reflection can bring a long experience into a useful account while retaining its relationship to earlier thoughts. That account can itself be questioned and revised.']
  };
  document.querySelectorAll('[data-signal]').forEach(button => button.addEventListener('click', () => {
    select('data-signal', button.dataset.signal);
    const [name, question, description] = signals[button.dataset.signal];
    set('signalName', name); set('signalQuestion', question); set('signalDescription', description);
  }));

  // Select from the complete ordered chapter list, not only observer change events.
  // Updating only on a chapter change prevents boundary-driven highlight churn.
  const chapters = [...document.querySelectorAll('main > section[id]')];
  const links = [...document.querySelectorAll('.nav-items a')];
  const nav = document.querySelector('.topbar');
  let scheduled = false, current = null;
  function updateNavigation() {
    scheduled = false;
    const threshold = nav.getBoundingClientRect().height + 36;
    let chapter = chapters[0].id;
    for (const section of chapters) {
      if (section.getBoundingClientRect().top <= threshold) chapter = section.id;
      else break;
    }
    // Keep unlisted supporting sections within their adjacent navigation chapter.
    const aliases = { opening: null, privacy: 'learning', reading: 'communities', outro: 'communities' };
    const target = Object.prototype.hasOwnProperty.call(aliases, chapter) ? aliases[chapter] : chapter;
    if (target === current) return;
    current = target;
    links.forEach(link => {
      const active = link.hash === `#${target}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
  }
  function scheduleNavigation() { if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); } }
  window.addEventListener('scroll', scheduleNavigation, { passive: true });
  window.addEventListener('resize', scheduleNavigation);
  updateNavigation();
})();
