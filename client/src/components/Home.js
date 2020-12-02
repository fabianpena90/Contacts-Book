import React, {useContext, useEffect} from 'react'
import ContactForm from '../components/contacts/ContactForm'
import Contacts from '../components/contacts/Contacts'
import ContactFilter from '../components/contacts/ContactFilter'
import AuthContext from '../context/auth/authContext'

const Home = () => {
  const authContext = useContext(AuthContext)
  const {loadUser} = authContext

  useEffect(() => {
    loadUser()
    // eslint-disable-next-line
  },[])

  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  )
}

export default Home
