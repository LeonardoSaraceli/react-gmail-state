import { useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  // Use initialEmails for state
  console.log(initialEmails)

  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState('inbox')

  function toggleRead(id) {
    setEmails(emails.map(email => {
      if (email.id === id) {
        return { ...email, read: !email.read }
      } else {
        return email
      }
    }))
  }

  function toggleStar(id) {
    setEmails(emails.map(email => {
      if (email.id === id) {
        return { ...email, starred: !email.starred }
      } else {
        return email
      }
    }))
  }

  function getReadEmails() {
    if (hideRead) {
      return emails.filter(email => !email.read)
    } 

    if (currentTab === 'starred') {
      return emails.filter(email => email.starred)
    }
    
    return emails
  }

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
            type="checkbox"
            checked={email.read}
            onChange={() => toggleRead(email.id)}
            />
        </div>
        <div className="star">
          <input
            className="star-checkbox"
            type="checkbox"
            checked={email.starred}
            onChange={() => toggleStar(email.id)}
          />
        </div>
        <div className="sender">{email.sender}</div>
        <div className="title">{email.title}</div>
      </li>
    )
  }

  function renderEmails() {
    return getReadEmails().map(email => createEmails(email))
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === 'inbox' ? 'active' : ''}`}
            onClick={() => setCurrentTab('inbox')}
          >
            <span className="label">Inbox</span>
            <span className="count">{emails.filter(email => !email.read).length}</span>
          </li>
          <li
            className={`item ${currentTab === 'starred' ? 'active' : ''}`}
            onClick={() => setCurrentTab('starred')}
          >
            <span className="label">Starred</span>
            <span className="count">{emails.filter(email => email.starred).length}</span>
          </li>
          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => setHideRead(!hideRead)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{renderEmails()}</main>
    </div>
  )
}

export default App
