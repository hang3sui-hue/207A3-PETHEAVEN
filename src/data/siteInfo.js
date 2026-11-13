// Fixed information about the society, used on many pages.
// All names, addresses and numbers are fictional.

export const SITE = {
  name: 'Pet Heaven',
  tagline: 'Every pet deserves a second chance.',
  adminEmail: 'admin@petheaven.org.sg',
  phone: '+65 6738 2468',
  whatsapp: '+65 9738 2468',
  address: '8 Lorong Kasih, Singapore 509123',
  hours: [
    { days: 'Tue – Fri', time: '11:00 am – 7:00 pm' },
    { days: 'Sat – Sun', time: '10:00 am – 6:00 pm' },
    { days: 'Mon & public holidays', time: 'Closed (rescue line still open)' },
  ],
}

export const STATS = [
  { value: 1280, label: 'Pets rehomed since 2015' },
  { value: 136, label: 'Pets rehomed this year' },
  { value: 310, label: 'Active volunteers' },
  { value: 98, label: 'Adopters who would adopt again', suffix: '%' },
]

export const ADOPTION_STEPS = [
  { title: 'Meet the pets', text: 'Browse our pets online and save the ones you like.' },
  { title: 'Send a request', text: 'Become a member and fill in the adoption form for one pet.' },
  { title: 'Interview & visit', text: 'Our staff call you, then you meet the pet at our shelter.' },
  { title: 'Welcome home', text: 'Sign the agreement and take your new friend home.' },
]

export const FACILITIES = [
  { title: 'Indoor shelter', photo: 'indoor-shelter', text: 'Air-conditioned rooms for 30 dogs and 40 cats, cleaned twice a day.' },
  { title: 'Vet clinic', photo: 'vet-clinic', text: 'A part-time vet checks, vaccinates and sterilises every pet.' },
  { title: 'Play garden', photo: 'play-garden', text: 'A fenced garden where dogs run and visitors can meet pets.' },
  { title: 'Cat lounge', photo: 'cat-lounge', text: 'A quiet room with shelves and windows so shy cats can relax.' },
  { title: 'Training room', photo: 'training-room', text: 'Free weekend classes for new adopters and their pets.' },
  { title: 'Rescue van', photo: 'rescue-van', text: 'Our van picks up injured or abandoned pets across Singapore.' },
]

export const TEAM = [
  { name: 'Grace Tan', role: 'Founder & Director', colour: '#e07a5f' },
  { name: 'Daniel Lim', role: 'Adoption Manager', colour: '#2a6f6a' },
  { name: 'Priya Nair', role: 'Shelter Vet', colour: '#81b29a' },
  { name: 'Marcus Wong', role: 'Volunteer Lead', colour: '#d9a441' },
]

export const FAQS = [
  {
    q: 'How much does it cost to adopt?',
    a: 'The adoption fee is $150 for cats and $250 for dogs. It covers vaccination, sterilisation and microchipping, which would cost much more at a clinic.',
  },
  {
    q: 'Do I need to be a member to adopt?',
    a: 'Yes. Membership is free. It lets us know who you are and lets you send adoption requests and write reviews.',
  },
  {
    q: 'How long does the adoption process take?',
    a: 'Usually one to two weeks: we call you within 3 working days, arrange a visit, and then do a short home check.',
  },
  {
    q: 'I can no longer keep my pet. What should I do?',
    a: 'Fill in the Release a Pet form. We will call you to talk about other options first, and if release is the best choice, we will book a handover date.',
  },
  {
    q: 'Can I visit without an appointment?',
    a: 'You can visit the shelter during opening hours, but to meet a specific pet please book through the adoption form so a staff member can be with you.',
  },
]
