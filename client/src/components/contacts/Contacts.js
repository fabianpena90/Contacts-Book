import React, { useContext, Fragment } from 'react'
import ContactItem from './ContactItem'
import ContactContext from '../../context/contact/contactContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const Contacts = () => {
  const contactContext = useContext(ContactContext)

  const { contacts, filtered } = contactContext

  if (contacts.lenght > 0) {
    return <h4>Please add a Contact</h4>
  }
  return (
    <Fragment>
      <TransitionGroup className='todo-list'>
        {filtered !== null
          ? filtered.map((contact) => (
              <CSSTransition key={contact.id} timeout={500} classNames='item'>
                <ContactItem key={contact.id} contact={contact} />
              </CSSTransition>
            ))
          : contacts.map((contact) => (
              <CSSTransition key={contact.id} timeout={500} classNames='item'>
                <ContactItem key={contact.id} contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  )
}

export default Contacts