// ** React Imports
import React, { useState, createContext } from 'react'

// ** Intl Provider Import
import { IntlProvider } from 'react-intl'

// ** Core Language Data
import messagesEn from '../assets/data/locales/en.json'
import messagesVi from '../assets/data/locales/vi.json'
import messagesCn from '../assets/data/locales/cn.json'

// ** Menu msg obj
const menuMessages = {
  en: { ...messagesEn },
  vi: { ...messagesVi },
  cn: { ...messagesCn },
}

// dung doan code nay de so sanh cac message thieu cua cac ngon ngu
// for (let i = 0; i < Object.keys(messagesVi).length; i++) {
//   const element = Object.keys(messagesVi)[i];
//   if (messagesEn[element] === undefined) {
//     console.log("messagesEn: " + element);
//   }
//   if (messagesCn[element] === undefined) {
//     console.log("messagesCn: " + element);
//   }
// }

// ** Create Context
const Context = createContext()

const IntlProviderWrapper = ({ children }) => {
  // ** States
  const [locale, setLocale] = useState(window.localStorage.getItem('lang') || 'en')
  const [messages, setMessages] = useState(menuMessages[locale])

  // ** Switches Language
  const switchLanguage = lang => {
    window.localStorage.setItem('lang', lang)
    setLocale(lang)
    setMessages(menuMessages[lang])
  }

  return (
    <Context.Provider value={{ locale, switchLanguage }}>
      <IntlProvider key={locale} locale={locale} messages={messages} defaultLocale='vi'>
        {children}
      </IntlProvider>
    </Context.Provider>
  )
}

export { IntlProviderWrapper, Context as IntlContext }
