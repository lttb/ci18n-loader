import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { counterIncrement, counterDecrement } from '~/actions'

import Counter from '~/components/Counter'
import LangList from '~/components/LangList'

import style from './style.scss'


const App = ({ counter, ...actions }, { i18n }) => (
  <div className={style.app}>
    <section className={style.content}>
      <header className={style.header}>
        <h1>{i18n`Module i18n example`}</h1>

        <LangList current={i18n.current} langs={i18n.supported} />
      </header>

      <main>
        <Counter {...{ counter, actions }} />
      </main>
    </section>
  </div>
)

App.propTypes = {
  counter: PropTypes.number.isRequired,

  counterIncrement: PropTypes.func.isRequired,
  counterDecrement: PropTypes.func.isRequired,
}

App.contextTypes = {
  i18n: PropTypes.func,
}


export default connect(
  ({ counter }) => ({ counter }),
  { counterIncrement, counterDecrement },
)(App)