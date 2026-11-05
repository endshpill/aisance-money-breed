// Entertainment-only preference quiz. Every breed is offered once per question.
// No balances, debt amounts or financial-health rankings are used.
const styleQuestions = [
  ['What would make money feel easier?', ['A clear overview', 'Progress towards an ambitious goal', 'A comfortable safety net', 'Room to treat the people I love', 'Space for things I value', 'A flexible plan for changing days']],
  ['Your ideal money check-in is…', ['A detailed review', 'A quick look at my goals', 'Checking the essentials are covered', 'Planning something with friends', 'Choosing what is worth spending on', 'One small next step']],
  ['An unexpected free afternoon. You would rather…', ['Organise something I have been meaning to', 'Make progress on a personal project', 'Enjoy a familiar favourite', 'Spend time with my people', 'Explore somewhere beautiful', 'See where the day takes me']],
  ['When choosing a goal, what draws you in?', ['A clear route and milestones', 'A challenge with room to grow', 'More peace of mind', 'Something we can enjoy together', 'Something special and lasting', 'Freedom to change direction']],
  ['Which reminder would you welcome?', ['Here is your monthly overview', 'Here is how your goal is progressing', 'Here are the essentials coming up', 'Remember the celebrations you planned', 'Make room for what matters to you', 'Let us take this one step at a time']],
  ['What matters most in a purchase?', ['How it fits the overall plan', 'How it supports my ambitions', 'Reliability over time', 'The experience it creates for others', 'Quality and personal meaning', 'How well it fits life right now']],
  ['A plan changes. Your first instinct?', ['Rework the details', 'Find another route to the goal', 'Keep the essentials steady', 'Check what works for everyone', 'Keep the part I value most', 'Try a different approach']],
  ['Which phrase sounds most like you?', ['I like to see the whole picture', 'I like to move things forward', 'I like to feel prepared', 'I like to bring people together', 'I like to choose with care', 'I like room for spontaneity']]
].map(([title, labels]) => ({ title, answers: labels.map((label, breed) => [label, breed]) }));

function selectStyle(answers) {
  const counts = Array(6).fill(0);
  answers.forEach(breed => counts[breed]++);
  const highest = Math.max(...counts);
  // Most recent preference breaks a tie; no breed has priority over another.
  return [...answers].reverse().find(breed => counts[breed] === highest);
}

const breedExamples = [
  ['I want a clearer picture of my money.', 'A useful starting point is to review your spending categories and choose one goal to focus on.'],
  ['I have a goal in mind. Where do I start?', 'Break the goal into a target amount and a timeframe, then review what fits your budget.'],
  ['I want to feel more prepared.', 'Start with the essentials coming up, then consider a manageable amount to set aside.'],
  ['I want room for gifts and time with friends.', 'Include those plans in your budget alongside bills and other priorities.'],
  ['I want to spend on things I really value.', 'Pick one priority and compare it with the other commitments in your budget.'],
  ['My plans change. I need a simple starting point.', 'Start with what is coming in and the essentials due next. Review one small decision at a time.']
];
