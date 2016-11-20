import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
// Итак, первый компонент из мира Redux - <Provider />
// Благодаря этому компоненту, мы сможем получать необходимые данные из store нашего приложения, 
// если воспользуемся вспомогательной функцией connect

import App from './containers/App'
import { AppContainer } from 'react-hot-loader'

import './styles/app.css'
import configureStore from './store/configureStore'

// Пока мы писали код для асинхронного запроса, мы НЕ нарушили главные принципы redux-приложения:
// 1) Мы всегда возвращали новое состояние (новый объект, смотрите src/reducers/page.js)
// 2) Мы строго следовали однонаправленному потоку данных в приложении: юзер кликнул - возникло действие - редьюсер изменил - компонент отобразил.

const store = configureStore()

render(
    <Provider store={store}>
      <div className='app'>
        <AppContainer>
          <App />
        </AppContainer>
      </div>
    </Provider>,
  
  document.getElementById('root')
)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default;
    render(
      <Provider store={store}>
        <AppContainer>
          <NextApp/>
        </AppContainer>
      </Provider>,
      document.getElementById('root')
    );
  });
}