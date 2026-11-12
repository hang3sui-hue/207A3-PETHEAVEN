import { SITE } from '../data/siteInfo'
import { loadData, saveData } from './storage'

// Every form (adoption, release, contact) is saved as a "request".
// The staff page shows these requests, like an admin inbox.
// A mailto link also lets the visitor email the form to the administrator.

const KEY = 'requests'

export function getRequests() {
  return loadData(KEY, [])
}

export function saveRequest(type, details) {
  const prefix = { adopt: 'AD', release: 'RL', contact: 'CT' }[type]
  const request = {
    id: `${prefix}-${Date.now().toString().slice(-6)}`,
    type,
    status: 'New',
    sentAt: new Date().toISOString(),
    details,
  }
  saveData(KEY, [request, ...getRequests()])
  return request
}

export function updateRequestStatus(id, status) {
  const updated = getRequests().map((r) => (r.id === id ? { ...r, status } : r))
  saveData(KEY, updated)
  return updated
}

// Turn the form into a readable email for the administrator.
export function buildMailto(request, labels) {
  const title = { adopt: 'Adoption request', release: 'Pet release request', contact: 'Contact message' }[request.type]
  const lines = Object.entries(request.details)
    .filter(([key]) => labels[key])
    .map(([key, value]) => `${labels[key]}: ${typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}`)

  const subject = `[Pet Heaven] ${title} ${request.id}`
  const body = [`${title} (${request.id})`, '', ...lines, '', 'Sent from the Pet Heaven website.'].join('\n')
  return `mailto:${SITE.adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
