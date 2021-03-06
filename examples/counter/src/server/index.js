/* eslint-disable react/jsx-filename-extension */


import pug from 'pug'
import express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { renderToString } from 'react-dom/server'

import { I18ns } from 'module-i18n'

import I18nProvider from 'module-i18n/lib/provider'
import rootReducer from '../client/reducers'
import App from '../client/containers/App'


const renderFullPage = pug.compileFile('src/client/templates/server.pug')

const handleRender = I18n => ({ query, params }, res) => {
  const { counter } = query
  const { lang = 'en' } = params

  const i18n = I18n[lang]

  if (!i18n) return void res.status(400).send('Unsupported language')

  const store = createStore(rootReducer, { counter: Number(counter) || 0 })

  const html = renderToString(
    <Provider store={store}>
      <I18nProvider i18n={i18n}>
        <App />
      </I18nProvider>
    </Provider>,
  )

  res.send(renderFullPage({ html, lang, state: store.getState() }))
}

;(async () => {
  const app = express()
  const port = 3000

  app.use('/static', express.static('dist'))
  app.use('/:lang?/?$', handleRender(await I18ns()))

  app.listen(port, () => console.log(`listening on port ${port}`))
})()

