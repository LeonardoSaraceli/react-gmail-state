import { useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function createEmails(email) {
  let emailClassName = 'email'

  if (email.read) {
    emailClassName += ' read'
  } else {
    emailClassName += ' unread'
  }
  
  return (
    <li key={email.id} className={emailClassName}>
        <div className="select">
          <input
            className="select-checkbox"
            type="checkbox"/>
        </div>
        <div className="star">
          <input
            className="star-checkbox"
            type="checkbox"
            checked={email.starred}
          />
        </div>
        <div className="sender">{email.sender}</div>
        <div className="title">{email.title}</div>
    </li>
  )
}

function App() {
  // Use initialEmails for state
  console.log(initialEmails)

  const [emails, setEmails] = useState(initialEmails)

  function renderEmails() {
    return emails.map(email => createEmails(email))
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              // onChange={() => {}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{renderEmails()}</main>
    </div>
  )
}

export default App
