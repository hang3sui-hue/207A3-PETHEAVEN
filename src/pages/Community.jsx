import { useState } from 'react'
import starterReviews from '../data/reviews'
import useForm from '../hooks/useForm'
import useLocalStorage from '../hooks/useLocalStorage'
import usePageTitle from '../hooks/usePageTitle'
import { checkMinLength } from '../utils/validation'
import FormField from '../components/FormField'
import MembersOnly from '../components/MembersOnly'
import PageHeader from '../components/PageHeader'
import StarRating from '../components/StarRating'
import { useAuth, useToast } from '../hooks/useAppContext'

const formatDate = (iso) => new Date(iso).toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' })

export default function Community() {
  usePageTitle('Community Reviews')
  const { user } = useAuth()
  // Reviews written on this device are saved; the starter reviews come from data/reviews.js.
  const [myReviews, setMyReviews] = useLocalStorage('reviews', [])
  const [helpfulVotes, setHelpfulVotes] = useLocalStorage('helpfulVotes', [])
  const [ratingFilter, setRatingFilter] = useState(0)
  const [sort, setSort] = useState('newest')

  const allReviews = [...myReviews, ...starterReviews]
  const average = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
  const countFor = (stars) => allReviews.filter((r) => r.rating === stars).length

  const shown = allReviews
    .filter((r) => !ratingFilter || r.rating === ratingFilter)
    .sort((a, b) => (sort === 'helpful' ? helpfulCount(b) - helpfulCount(a) : b.date.localeCompare(a.date)))

  function helpfulCount(review) {
    return review.helpful + (helpfulVotes.includes(review.id) ? 1 : 0)
  }

  function toggleHelpful(id) {
    setHelpfulVotes(helpfulVotes.includes(id) ? helpfulVotes.filter((v) => v !== id) : [...helpfulVotes, id])
  }

  function addReview(review) {
    setMyReviews([review, ...myReviews])
    setRatingFilter(0)
    setSort('newest')
  }

  function deleteReview(id) {
    setMyReviews(myReviews.filter((r) => r.id !== id))
  }

  return (
    <>
      <PageHeader
        eyebrow="Community"
        title="Reviews & feedback from our members"
        text="Real stories from adopters, volunteers and owners who released a pet to us. Members can share their own experience."
      />

      <section className="section section-tight">
        <div className="container community-layout">
          <aside className="rating-summary card">
            <p className="big-rating">{average.toFixed(1)}</p>
            <StarRating value={average} />
            <p className="soft">{allReviews.length} reviews</p>
            <div className="rating-bars">
              {[5, 4, 3, 2, 1].map((stars) => (
                <button
                  key={stars}
                  className={`rating-bar ${ratingFilter === stars ? 'active' : ''}`}
                  onClick={() => setRatingFilter(ratingFilter === stars ? 0 : stars)}
                  aria-pressed={ratingFilter === stars}
                  aria-label={`Show ${stars}-star reviews (${countFor(stars)})`}
                >
                  <span>{stars}★</span>
                  <span className="bar">
                    <span style={{ width: `${(countFor(stars) / allReviews.length) * 100}%` }} />
                  </span>
                  <span>{countFor(stars)}</span>
                </button>
              ))}
            </div>
            {ratingFilter > 0 && (
              <button className="btn btn-ghost btn-sm" onClick={() => setRatingFilter(0)}>
                Show all ratings
              </button>
            )}
          </aside>

          <div>
            <div className="card">
              <h2 className="h3">Share your experience</h2>
              <MembersOnly message="Log in or join for free to write a review.">
                <ReviewForm onAdd={addReview} />
              </MembersOnly>
            </div>

            <div className="section-head reviews-head">
              <h2 className="h3">
                {ratingFilter ? `${ratingFilter}-star reviews` : 'All reviews'} ({shown.length})
              </h2>
              <label className="inline-select">
                Sort by{' '}
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="newest">Newest</option>
                  <option value="helpful">Most helpful</option>
                </select>
              </label>
            </div>

            <ul className="review-list">
              {shown.map((r) => (
                <li key={r.id} className="review">
                  <div className="review-top">
                    <span className="avatar" aria-hidden="true">
                      {r.name.charAt(0)}
                    </span>
                    <div>
                      <strong>{r.name}</strong>
                      <span className="soft">
                        {formatDate(r.date)}
                        {r.pet && ` · ${r.pet}`}
                      </span>
                    </div>
                    <StarRating value={r.rating} size="sm" />
                  </div>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                  <div className="review-actions">
                    <button className={`chip ${helpfulVotes.includes(r.id) ? 'on' : ''}`} onClick={() => toggleHelpful(r.id)} aria-pressed={helpfulVotes.includes(r.id)}>
                      👍 Helpful ({helpfulCount(r)})
                    </button>
                    {user && r.email === user.email && (
                      <button className="chip" onClick={() => deleteReview(r.id)}>
                        Delete my review
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

function ReviewForm({ onAdd }) {
  const { user } = useAuth()
  const showToast = useToast()
  const { values, errors, field, setValue, validateAll, reset } = useForm({ rating: 0, title: '', text: '', pet: '' }, (v) => ({
    rating: v.rating ? '' : 'Please choose a star rating.',
    title: checkMinLength(v.title, 4, 'Title'),
    text: checkMinLength(v.text, 20, 'Review'),
  }))

  function handleSubmit(event) {
    event.preventDefault()
    if (!validateAll()) return
    const [first, last = ''] = user.name.split(' ')
    onAdd({
      ...values,
      id: `m${Date.now()}`,
      name: `${first} ${last.charAt(0)}${last ? '.' : ''}`.trim(),
      email: user.email,
      date: new Date().toISOString().slice(0, 10),
      helpful: 0,
    })
    reset()
    showToast('Thank you! Your review is now live.')
  }

  return (
    <form className="form review-form" onSubmit={handleSubmit} noValidate>
      <div className={`field ${errors.rating ? 'has-error' : ''}`}>
        <span className="label">
          Your rating <span className="req">*</span>
        </span>
        <StarRating value={values.rating} onChange={(n) => setValue('rating', n)} size="lg" />
        {errors.rating && <p className="field-error">{errors.rating}</p>}
      </div>
      <div className="form-grid">
        <FormField label="Title" error={errors.title} required>
          <input type="text" maxLength="60" placeholder="e.g. Best decision we made" {...field('title')} />
        </FormField>
        <FormField label="Pet you adopted (optional)">
          <input type="text" placeholder="e.g. Kaya (cat)" {...field('pet')} />
        </FormField>
      </div>
      <FormField label="Your review" error={errors.text} hint={`${values.text.length}/400`} required>
        <textarea rows="3" maxLength="400" {...field('text')} />
      </FormField>
      <button type="submit" className="btn btn-primary">
        Post review
      </button>
    </form>
  )
}
