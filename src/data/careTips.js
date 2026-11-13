// Pet care tips shown on the Pet Care page.
// "for" says which pets the tip is about: Dog, Cat or Both.

const careTips = [
  {
    id: 'first-days',
    for: 'Both',
    title: 'The first few days at home',
    points: [
      'Prepare one quiet room with a bed, water, food and (for cats) a litter box.',
      'Let your pet explore at its own speed. Do not force cuddles.',
      'Keep visitors away for the first week so your pet can settle.',
      'Follow the 3-3-3 rule: 3 days to relax, 3 weeks to learn the routine, 3 months to feel at home.',
    ],
  },
  {
    id: 'food',
    for: 'Both',
    title: 'Food and water',
    points: [
      'Keep the same food the shelter used for the first week, then change slowly over 7 days.',
      'Clean water must be available all the time.',
      'Never give chocolate, grapes, onions, garlic or bones from cooked meat.',
      'Ask your vet how much to feed. Overweight pets live shorter lives.',
    ],
  },
  {
    id: 'dog-walks',
    for: 'Dog',
    title: 'Walks and exercise for dogs',
    points: [
      'Most adult dogs need two walks a day, 20 to 40 minutes each.',
      'In Singapore heat, walk early in the morning or after sunset. Test the ground with your hand.',
      'Always use a lead in public areas and bring a poop bag.',
      'Games like fetch and sniffing toys are good exercise for the mind too.',
    ],
  },
  {
    id: 'dog-training',
    for: 'Dog',
    title: 'Kind training for dogs',
    points: [
      'Reward good behaviour straight away with a treat or praise.',
      'Keep sessions short: 5 minutes, two or three times a day.',
      'Use the same words every time ("sit", "stay", "come").',
      'Never hit or shout. Fear makes behaviour problems worse.',
    ],
  },
  {
    id: 'cat-litter',
    for: 'Cat',
    title: 'Litter box basics for cats',
    points: [
      'Have one box per cat, plus one extra.',
      'Scoop every day and wash the box every week.',
      'Put the box in a quiet place, away from the food bowl.',
      'If your cat stops using the box, see a vet – it can be a health problem.',
    ],
  },
  {
    id: 'cat-safety',
    for: 'Cat',
    title: 'Keeping cats safe in a flat',
    points: [
      'Install mesh on all windows and the balcony. Falls from high floors are common.',
      'Keep cats indoors. It protects them from traffic and disease.',
      'Give them shelves, scratching posts and window views to stay happy.',
      'Play with a wand toy for 10 minutes twice a day.',
    ],
  },
  {
    id: 'health',
    for: 'Both',
    title: 'Health checks',
    points: [
      'Visit the vet once a year (twice a year for seniors).',
      'Keep vaccinations, flea and worm treatment up to date.',
      'Brush teeth or use dental treats to prevent gum disease.',
      'Watch for warning signs: not eating, hiding, vomiting or breathing fast.',
    ],
  },
]

// A short quiz that helps visitors check if they are ready to adopt.
// Each answer gives points to "Dog" or "Cat", and to "ready".
export const quizQuestions = [
  {
    question: 'How much time can you spend with a pet each day?',
    options: [
      { text: 'Less than 1 hour', dog: 0, cat: 2, ready: 1 },
      { text: '1 to 3 hours', dog: 1, cat: 2, ready: 2 },
      { text: 'More than 3 hours', dog: 2, cat: 1, ready: 2 },
    ],
  },
  {
    question: 'What kind of home do you live in?',
    options: [
      { text: 'Small flat or room', dog: 0, cat: 2, ready: 1 },
      { text: 'Family HDB or condo', dog: 1, cat: 1, ready: 2 },
      { text: 'Landed house with garden', dog: 2, cat: 1, ready: 2 },
    ],
  },
  {
    question: 'How active are you?',
    options: [
      { text: 'I like quiet days at home', dog: 0, cat: 2, ready: 2 },
      { text: 'A walk now and then', dog: 1, cat: 1, ready: 2 },
      { text: 'I exercise outdoors a lot', dog: 2, cat: 0, ready: 2 },
    ],
  },
  {
    question: 'Can you pay about $100 a month for food, litter and vet care?',
    options: [
      { text: 'Yes, easily', dog: 1, cat: 1, ready: 2 },
      { text: 'Yes, with some planning', dog: 1, cat: 1, ready: 1 },
      { text: 'Not right now', dog: 0, cat: 0, ready: 0 },
    ],
  },
  {
    question: 'Does everyone in your home agree to get a pet?',
    options: [
      { text: 'Yes, everyone is excited', dog: 1, cat: 1, ready: 2 },
      { text: 'Most people agree', dog: 0, cat: 1, ready: 1 },
      { text: 'Not yet', dog: 0, cat: 0, ready: 0 },
    ],
  },
]

export const firstMonthChecklist = [
  'Book a vet check within the first 2 weeks',
  'Buy a bed, bowls, toys and a carrier or lead',
  'Mesh windows and hide electric cables',
  'Register the microchip in your name',
  'Choose a daily routine for food and play',
  'Join a Pet Heaven new-adopter class',
]

export default careTips
