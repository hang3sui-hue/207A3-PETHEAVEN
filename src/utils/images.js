// Paths to the photos in public/images. BASE_URL keeps them working on GitHub Pages.
const BASE = `${import.meta.env.BASE_URL}images`

export const img = (path) => `${BASE}/${path}`

// Pet photos are named by id + name, e.g. pets/08-milo.jpg
export const petPhoto = (pet) => img(`pets/${String(pet.id).padStart(2, '0')}-${pet.name.toLowerCase()}.jpg`)

// "Grace Tan" -> team/grace-tan.jpg
export const teamPhoto = (name) => img(`team/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`)
