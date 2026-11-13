// All pets currently cared for by Pet Heaven.
// There is no back-end, so the data is kept in an array of objects.
// "art" holds the colours used by <PetArt /> to draw each pet.

const pets = [
  {
    id: 1,
    name: 'Biscuit',
    species: 'Dog',
    breed: 'Golden Retriever mix',
    age: 2,
    gender: 'Male',
    size: 'Large',
    colour: 'Golden',
    arrived: '2026-10-28',
    status: 'Available',
    personality: ['Friendly', 'Playful', 'Loves walks'],
    goodWith: ['Kids', 'Dogs'],
    health: { vaccinated: true, sterilised: true, microchipped: true },
    story:
      'Biscuit was found waiting outside a closed shop in Bedok. He is gentle, loves people and will bring you his toy again and again. He would be happiest in a home with time for long walks.',
    art: { fur: '#e2a756', accent: '#c4842f', muzzle: '#f6dfb4', ear: 'floppy', pattern: 'plain', bg: '#fde8cf' },
  },
  {
    id: 2,
    name: 'Kaya',
    species: 'Cat',
    breed: 'Ginger Tabby',
    age: 1,
    gender: 'Female',
    size: 'Small',
    colour: 'Ginger',
    arrived: '2026-11-05',
    status: 'Available',
    personality: ['Curious', 'Chatty', 'Cuddly'],
    goodWith: ['Kids', 'Cats'],
    health: { vaccinated: true, sterilised: true, microchipped: true },
    story:
      'Kaya was rescued from a void deck with her two brothers, who have already found homes. She follows you around the room and will "talk" back when you speak to her.',
    art: { fur: '#ee9b4e', accent: '#c96f24', muzzle: '#fbe3c8', ear: 'pointy', pattern: 'stripes', bg: '#fff0dc' },
  },
  {
    id: 3,
    name: 'Pepper',
    species: 'Dog',
    breed: 'Singapore Special (local mixed breed)',
    age: 4,
    gender: 'Female',
    size: 'Medium',
    colour: 'Black and tan',
    arrived: '2026-09-14',
    status: 'Available',
    personality: ['Loyal', 'Smart', 'Calm indoors'],
    goodWith: ['Kids'],
    health: { vaccinated: true, sterilised: true, microchipped: true },
    story:
      'Pepper lived on a construction site before our volunteers brought her in. She is a quick learner, already knows "sit" and "stay", and is very loyal once she trusts you.',
    art: { fur: '#3b302b', accent: '#b8713b', muzzle: '#c98a55', ear: 'upright', pattern: 'mask', bg: '#efe2d6' },
  },
  {
    id: 4,
    name: 'Oreo',
    species: 'Cat',
    breed: 'Domestic Shorthair',
    age: 3,
    gender: 'Male',
    size: 'Medium',
    colour: 'Black and white',
    arrived: '2026-08-30',
    status: 'Available',
    personality: ['Relaxed', 'Independent', 'Sunbather'],
    goodWith: ['Cats', 'Dogs'],
    health: { vaccinated: true, sterilised: true, microchipped: true },
    story:
      'Oreo was given up when his family moved overseas. He is easy-going, gets along with other pets, and spends most afternoons napping in the sun by the window.',
    art: { fur: '#2c2c33', accent: '#ffffff', muzzle: '#ffffff', ear: 'pointy', pattern: 'patch', bg: '#e6e8f0' },
  },
  {
    id: 5,
    name: 'Mochi',
    species: 'Dog',
    breed: 'Shiba Inu mix',
    age: 1,
    gender: 'Female',
    size: 'Medium',
    colour: 'Red and cream',
    arrived: '2026-11-02',
    status: 'Available',
    personality: ['Energetic', 'Clever', 'Bit stubborn'],
    goodWith: ['Dogs'],
    health: { vaccinated: true, sterilised: false, microchipped: true },
    story:
      'Mochi was released by an owner who could not keep up with her energy. She needs an active family and some patient training. Sterilisation is booked for next month.',
    art: { fur: '#d9783f', accent: '#b5582a', muzzle: '#fbeee0', ear: 'upright', pattern: 'mask', bg: '#ffe6d6' },
  },
  {
    id: 6,
    name: 'Snow',
    species: 'Cat',
    breed: 'Persian mix',
    age: 5,
    gender: 'Female',
    size: 'Medium',
    colour: 'White',
    arrived: '2026-07-19',
    status: 'Reserved',
    personality: ['Gentle', 'Quiet', 'Likes brushing'],
    goodWith: ['Kids', 'Cats'],
    health: { vaccinated: true, sterilised: true, microchipped: true },
    story:
      'Snow came to us from a home with too many cats. She is quiet and gentle and loves to be brushed. Her long coat needs daily grooming. A family is meeting her this week.',
    art: { fur: '#f7f5f2', accent: '#e4ddd5', muzzle: '#ffffff', ear: 'pointy', pattern: 'plain', bg: '#dfeaf2', eyes: '#3d8ccf' },
  },
  {
    id: 7,
    name: 'Bruno',
    species: 'Dog',
    breed: 'Beagle',
    age: 6,
    gender: 'Male',
    size: 'Medium',
    colour: 'Tricolour',
    arrived: '2026-06-03',
    status: 'Available',
    personality: ['Food lover', 'Sniffer', 'Friendly'],
    goodWith: ['Kids', 'Dogs', 'Cats'],
    health: { vaccinated: true, sterilised: true, microchipped: true },
    story:
      'Bruno follows his nose everywhere! He was found wandering near a hawker centre. He is friendly with everyone, including cats, and would fit well in a busy family home.',
    art: { fur: '#c98a4b', accent: '#2f2620', muzzle: '#ffffff', ear: 'floppy', pattern: 'patch', bg: '#f5e6d3' },
  },
  {
    id: 8,
    name: 'Milo',
    species: 'Cat',
    breed: 'Grey Tabby',
    age: 0.5,
    gender: 'Male',
    size: 'Small',
    colour: 'Grey',
    arrived: '2026-11-09',
    status: 'Available',
    personality: ['Playful', 'Brave', 'Climber'],
    goodWith: ['Kids', 'Cats', 'Dogs'],
    health: { vaccinated: true, sterilised: false, microchipped: false },
    story:
      'Milo is our youngest resident. He was found in a drain during heavy rain and is now healthy and full of energy. He will be sterilised and microchipped before going home.',
    art: { fur: '#9aa3ad', accent: '#5f6870', muzzle: '#eef0f2', ear: 'pointy', pattern: 'stripes', bg: '#e3ecef' },
  },
  {
    id: 9,
    name: 'Luna',
    species: 'Dog',
    breed: 'Poodle mix',
    age: 3,
    gender: 'Female',
    size: 'Small',
    colour: 'Apricot',
    arrived: '2026-10-10',
    status: 'Available',
    personality: ['Affectionate', 'Gentle', 'Lap dog'],
    goodWith: ['Kids', 'Cats'],
    health: { vaccinated: true, sterilised: true, microchipped: true },
    story:
      'Luna was rescued from a backyard breeder. She was shy at first but now loves sitting on laps. She is small, low-shedding and great for apartment living.',
    art: { fur: '#e8b98d', accent: '#d39a68', muzzle: '#f6dcc2', ear: 'floppy', pattern: 'plain', bg: '#fbe9ef' },
  },
  {
    id: 10,
    name: 'Sushi',
    species: 'Cat',
    breed: 'Calico',
    age: 2,
    gender: 'Female',
    size: 'Small',
    colour: 'Calico',
    arrived: '2026-10-21',
    status: 'Available',
    personality: ['Sweet', 'Shy at first', 'Lap cat'],
    goodWith: ['Cats'],
    health: { vaccinated: true, sterilised: true, microchipped: true },
    story:
      'Sushi was a community cat who was hurt in an accident. She has fully recovered. She needs a quiet home and a few days to settle in, then she becomes a loving lap cat.',
    art: { fur: '#ffffff', accent: '#e08a3c', muzzle: '#ffffff', ear: 'pointy', pattern: 'calico', bg: '#f3eadf' },
  },
  {
    id: 11,
    name: 'Rocky',
    species: 'Dog',
    breed: 'Labrador Retriever',
    age: 8,
    gender: 'Male',
    size: 'Large',
    colour: 'Chocolate',
    arrived: '2026-05-22',
    status: 'Available',
    personality: ['Calm', 'Loving', 'Easy to walk'],
    goodWith: ['Kids', 'Dogs', 'Cats'],
    health: { vaccinated: true, sterilised: true, microchipped: true },
    story:
      'Rocky is a senior gentleman whose owner passed away. He is calm, house-trained and walks nicely on a lead. Senior dogs like Rocky make wonderful, relaxed companions.',
    art: { fur: '#6b4430', accent: '#4e2f20', muzzle: '#8a5c42', ear: 'floppy', pattern: 'plain', bg: '#eadfd6' },
  },
  {
    id: 12,
    name: 'Tofu',
    species: 'Cat',
    breed: 'British Shorthair mix',
    age: 9,
    gender: 'Male',
    size: 'Large',
    colour: 'Blue-grey',
    arrived: '2026-04-11',
    status: 'Available',
    personality: ['Calm', 'Gentle giant', 'Loves treats'],
    goodWith: ['Kids', 'Cats', 'Dogs'],
    health: { vaccinated: true, sterilised: true, microchipped: true },
    story:
      'Tofu is a big, round, gentle cat who just wants a soft cushion and a kind person. He has been with us the longest. Could you be the one to give him a home?',
    art: { fur: '#7d8a99', accent: '#65717e', muzzle: '#a3aebb', ear: 'pointy', pattern: 'plain', bg: '#e1e6ee', eyes: '#d99a2b' },
  },
]

// Group pets by age, so visitors can filter by life stage.
export function getAgeGroup(age) {
  if (age < 2) return 'Young'
  if (age < 7) return 'Adult'
  return 'Senior'
}

// Show 0.5 as "6 months" and 3 as "3 years".
export function formatAge(age) {
  if (age < 1) return `${Math.round(age * 12)} months`
  return age === 1 ? '1 year' : `${age} years`
}

export function findPet(id) {
  return pets.find((pet) => pet.id === Number(id))
}

// Warm wording shown to visitors (the data keeps 'Available' / 'Reserved' for the logic).
export function statusLabel(status) {
  return { Available: 'Waiting for you', Reserved: 'Meeting a family' }[status] || status
}

export default pets
