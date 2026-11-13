// Integration tests: each test uses the full app and checks a complete user flow.
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import renderApp from './renderApp'

describe('Pet Heaven SPA – integration tests', () => {
  it('1. navigates between pages without reloading (SPA routing)', async () => {
    const user = userEvent.setup()
    renderApp('/')
    const nav = screen.getByRole('navigation')
    await user.click(within(nav).getAllByRole('link', { name: /about/i })[0])
    expect(await screen.findByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByText(/JHyper/)).toBeInTheDocument()
  })

  it('2. searches the pet directory by name', async () => {
    const user = userEvent.setup()
    renderApp('/pets')
    expect(screen.getByText(/Showing/)).toHaveTextContent('Showing 12 of 12 pets')
    await user.type(screen.getByPlaceholderText(/Search by name/i), 'Milo')
    expect(screen.getByText(/Showing/)).toHaveTextContent('Showing 1 of 12 pets')
  })

  it('3. shows validation errors when the login form is empty', async () => {
    const user = userEvent.setup()
    renderApp('/login')
    await user.click(screen.getByRole('button', { name: /log in/i }))
    expect((await screen.findAllByText(/email|password/i)).length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { level: 1, name: /welcome back/i })).toBeInTheDocument()
  })

  it('4. rejects a wrong password and accepts the demo member', async () => {
    const user = userEvent.setup()
    renderApp('/login')
    await user.type(screen.getByLabelText(/email or username/i), 'admin')
    await user.type(screen.getByLabelText(/^password/i), 'wrong')
    await user.click(screen.getByRole('button', { name: /log in/i }))
    expect(await screen.findByText(/username or password is wrong/i)).toBeInTheDocument()

    await user.clear(screen.getByLabelText(/^password/i))
    await user.type(screen.getByLabelText(/^password/i), '1234')
    await user.click(screen.getByRole('button', { name: /log in/i }))
    expect(await screen.findByText(/^welcome back\.$/i)).toBeInTheDocument()
  })

  it('5. blocks the release form until required fields are filled', async () => {
    const user = userEvent.setup()
    renderApp('/release')
    await user.click(screen.getByRole('button', { name: /send release request/i }))
    // Each required field shows its own error message and the request is not sent
    expect(document.querySelectorAll('.field-error').length).toBeGreaterThan(3)
    expect(screen.getByRole('button', { name: /send release request/i })).toBeInTheDocument()
  })
})
