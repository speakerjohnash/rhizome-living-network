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
    question: { text: 'What would help our community orchard harvest more fruit before it spoils?', context: 'A question gives a direction to inquiry. Its value can emerge from what investigating it makes possible.', reference: 'Opens an inquiry' },
    statement: { text: 'Ten people are volunteering for the community orchard’s next harvest.', context: 'A present claim can be checked, questioned, and connected to what the community does next.', reference: 'Responds to the harvest inquiry', verity: .9, valence: .8 },
    prediction: { text: 'Weekly harvests will reduce fruit loss at our community orchard in September.', context: 'The expectation is recorded before its outcome. Wanting it to happen is different from believing it will.', reference: 'Responds to the harvest inquiry', verity: .6, valence: .8 },
    reflection: { text: 'A shortage of harvest volunteers caused fruit to spoil at the community orchard in August.', context: 'A reflection makes a claim about the past. Others can question its explanation or bring further evidence.', reference: 'Looks back on the previous harvest', verity: .6, valence: -.7 }
  };
  const signed = value => `${value > 0 ? '+' : ''}${value.toFixed(2)}`;
  function renderAxes() {
    const verity = Number(byId('verity').value), valence = Number(byId('valence').value);
    set('verityValue', verity.toFixed(2)); set('valenceValue', signed(valence));
    const belief = verity > .55 ? 'You lean toward believing the claim.' : verity < .45 ? 'You lean toward believing the claim is false.' : 'You are uncertain about the claim.';
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
    ['LOOKING BACK', 'Keep the lesson open.', 'Mara records lower fruit loss as one reflection. The cause remains open: separate observations and questions can examine harvest timing and volunteer availability without bundling them into that stake.']
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

})();

(() => {
  const map = document.querySelector('.synthesis-map');
  if (!map) return;
  const explanations = [
    'The orchard knows what grows and what damages crops. The retailer sees what people buy and what goes to waste. The lab studies pest control and ecological effects. Each holds a different part of the problem.',
    'Together, they can identify a growing method worth testing against real demand: a possibility that neither sales data, field experience, nor research establishes alone. Rhizome connects the chosen knowledge while each community keeps its own Iris.',
    'The trial feeds harvest, sales, and ecological observations back into all three communities. Did pesticide use fall? Did people buy the fruit? Was the crop viable? Those findings reshape the next shared question, rather than guaranteeing that everyone benefits.'
  ];
  map.querySelectorAll('[data-synthesis]').forEach(button => button.addEventListener('click', () => {
    map.dataset.synthesisStep = button.dataset.synthesis;
    map.querySelectorAll('[data-synthesis]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    map.querySelector('.synthesis-explanation').textContent = explanations[Number(button.dataset.synthesis)];
  }));
})();
