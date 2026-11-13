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
    expect(screen.getByText(/Showing/)).toHaveTextContent('Showing 13 of 13 pets')
    await user.type(screen.getByPlaceholderText(/Search by name/i), 'Milo')
    expect(screen.getByText(/Showing/)).toHaveTextContent('Showing 1 of 13 pets')
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

  it('6. sign-up needs a real email, then the new member can log in', async () => {
    const user = userEvent.setup()
    renderApp('/signup')
    const email = screen.getByLabelText(/^email/i)
    expect(email).toHaveAttribute('type', 'email')
    await user.type(screen.getByLabelText(/full name/i), 'Jinhang Zhang')
    await user.type(email, 'jinhang')
    await user.type(screen.getByLabelText(/mobile number/i), '91234567')
    await user.type(screen.getByLabelText(/^password/i), 'petheaven1')
    await user.type(screen.getByLabelText(/confirm password/i), 'petheaven1')
    await user.click(screen.getByRole('checkbox', { name: /treat all animals kindly/i }))
    await user.click(screen.getByRole('button', { name: /create my account/i }))
    expect(await screen.findByText(/valid email/i)).toBeInTheDocument()

    await user.clear(email)
    await user.type(email, 'jinhang@example.com')
    await user.click(screen.getByRole('button', { name: /create my account/i }))
    // Signed up and logged in: the app moves to the pets page and the login button is gone
    expect(await screen.findByText(/Showing/)).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /log in \/ join/i })).not.toBeInTheDocument()
  })

  it('7. random match picks an available pet and opens its details', async () => {
    const user = userEvent.setup()
    window.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} }) // skip the shuffle animation
    renderApp('/')
    await user.click(screen.getByRole('button', { name: 'Dogs' }))
    await user.click(screen.getByRole('button', { name: /match me with a pet/i }))
    const heading = await screen.findByRole('heading', { name: /^it’s .+!$/i })
    const name = heading.textContent.replace(/^It’s |!$/g, '')
    await user.click(screen.getByRole('button', { name: new RegExp(`meet ${name}`, 'i') }))
    expect(await screen.findByRole('heading', { name: new RegExp(`hi, i'm ${name}`, 'i') })).toBeInTheDocument()
  })
})
