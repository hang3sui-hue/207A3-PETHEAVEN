# Pet Heaven – React Single Page Application

ISIT207 Frontend Web Programming – Assignment 3
Jinhang Zhang (UOW 1488235, T02)

Pet Heaven is a fictional charity society that cares for abandoned cats and dogs.
The website lets visitors read about the society, browse pets, become members,
send adoption and release requests, learn pet care and share reviews.

## Run on your computer

```bash
npm install
npm run dev      # development server at http://localhost:5173
npm run build    # production build in the dist/ folder
```

## Demo accounts

| Role   | Email                 | Password |
|--------|-----------------------|----------|
| Member | member@petheaven.com  | 1234     |
| Staff  | staff@petheaven.com   | 1234     |

## Tech

- React 19 + Vite, React Router (HashRouter) for the single page app
- useState, useEffect, useContext, useMemo, useRef and custom hooks (useForm, useLocalStorage, usePageTitle)
- No back-end: pets and reviews are JavaScript arrays; members, requests and reviews are saved in localStorage
- Forms are saved to the Staff Inbox and can be emailed to the administrator (mailto)

## Folder structure

```
src/
  components/   reusable UI (PetCard, PetArt, Modal, FormField, Accordion, StarRating…)
  context/      shared state providers (auth, theme, toasts, favourites)
  data/         pets, reviews, care tips, society information
  hooks/        custom hooks
  pages/        one component per page (route)
  utils/        validation, localStorage and request helpers
public/media/   pet care video and poster
```

All names, addresses, phone numbers and pets are fictional. Pet pictures are drawn in code (SVG).
