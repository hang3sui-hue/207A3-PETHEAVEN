// Pet care tips shown on the Pet Care page.
// "for" says which pets the tip is about: Dog, Cat or Both.

const careTips = [
  {
    id: 'first-days',
    for: 'Both',
    title: 'The first few days at home',
    // photo for each filter, so a dog tip list never starts with a cat photo
    photo: { All: 'care/first-days', Cat: 'care/first-days', Dog: 'pages/adopt' },
    points: [
      'Prepare a quiet room with a bed, water and food (and a litter box for cats).',
      'Let your pet explore at its own speed – no forced cuddles.',
      'Give it time: 3 days to relax, 3 weeks to learn, 3 months to feel at home.',
    ],
  },
  {
    id: 'food',
    for: 'Both',
    title: 'Food and water',
    photo: { All: 'care/food', Dog: 'care/food', Cat: 'facilities/cat-lounge' },
    points: [
      'Keep the shelter food for a week, then change slowly.',
      'Always have clean water.',
      'Never give chocolate, grapes, onions or cooked bones.',
    ],
  },
  {
    id: 'dog-walks',
    for: 'Dog',
    title: 'Walks and exercise',
    photo: { All: 'care/dog-walks', Dog: 'care/dog-walks' },
    points: [
      'Two walks a day, early morning or after sunset in Singapore heat.',
      'Use a lead in public and bring a poop bag.',
    ],
  },
  {
    id: 'dog-training',
    for: 'Dog',
    title: 'Kind training',
    photo: { All: 'care/dog-training', Dog: 'care/dog-training' },
    points: [
      'Reward good behaviour straight away with a treat or praise.',
      'Short sessions, same words – and never hit or shout.',
    ],
  },
  {
    id: 'cat-litter',
    for: 'Cat',
    title: 'Litter box basics',
    photo: { All: 'care/cat-litter', Cat: 'care/cat-litter' },
    points: [
      'One box per cat plus one extra, in a quiet place.',
      'Scoop daily. If your cat stops using it, see a vet.',
    ],
  },
  {
    id: 'cat-safety',
    for: 'Cat',
    title: 'Keeping cats safe in a flat',
    photo: { All: 'care/cat-safety', Cat: 'care/cat-safety' },
    points: [
      'Put mesh on every window and the balcony.',
      'Keep cats indoors, with shelves and toys to stay happy.',
    ],
  },
  {
    id: 'health',
    for: 'Both',
    title: 'Health checks',
    photo: { All: 'care/health', Cat: 'care/health', Dog: 'facilities/vet-clinic' },
    points: [
      'See the vet once a year and keep vaccines up to date.',
      'Watch for warning signs: not eating, hiding or vomiting.',
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
