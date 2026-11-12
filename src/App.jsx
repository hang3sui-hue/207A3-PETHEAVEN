import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import About from './pages/About'
import Account from './pages/Account'
import Adopt from './pages/Adopt'
import Care from './pages/Care'
import Community from './pages/Community'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Login from './pages/Login'
import Mission from './pages/Mission'
import NotFound from './pages/NotFound'
import Pets from './pages/Pets'
import Release from './pages/Release'
import Signup from './pages/Signup'
import Staff from './pages/Staff'

// The single page app: the header and footer stay, only the page in <main> changes.
export default function App() {
  const location = useLocation()

  return (
    <>
      {/* HashRouter uses the # in the URL, so the skip link moves focus with JavaScript */}
      <a
        href="#main"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('main').focus()
        }}
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Navbar />
      {/* key changes on every route, so the fade-in animation plays for each page */}
      <main id="main" tabIndex="-1" key={location.pathname} className="page-transition">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/adopt" element={<Adopt />} />
          <Route path="/release" element={<Release />} />
          <Route path="/care" element={<Care />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
