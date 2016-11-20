import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import User from '../components/User'
import Page from '../components/Page'
import * as pageActions from '../actions/PageActions'
import * as userActions from '../actions/UserActions'


class App extends Component {
  // У нас есть action, и есть reducer готовый изменить state приложения.
  // Но наш компонент не знает как обратиться к необходимому действию.
  // Для этого применяем bindActionCreators
  render() {
    const {user, page} = this.props
    const {getPhotos} = this.props.pageActions
    const {handleLogin, loginStatus} = this.props.userActions

    return (
      <div className='row'>
        <Page photos={page.photos} year={page.year} getPhotos={getPhotos} error={page.error} fetching={page.fetching} />
        <User name={user.name} handleLogin={handleLogin} loginStatus={loginStatus} error={page.error} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  // Возьми полностью "стейт" приложения и присоедини его в переменную user,
  // дабы она была доступна из компонета App.js как this.props.user
  return {
      user: state.user,
      page: state.page
  }
}

// присоединяем все pageActions в props контейнера <App />
function mapDispatchToProps (dispatch) {
  return {
    // как action creator связать с dispatch'ом? - bindActionCreators
    // bindActionCreators - ф-я принимает dispatch
    // возвращает новую функцию, которая будет вызывать dispatch над "тем что вы вернули"
    // то есть, сцепляется stor'a с dispatch'eм
    pageActions: bindActionCreators(pageActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
    // Тем самым необходимое изменение прослушивается в redux store, 
    // и в нашем редьюсере Page соответственно.
  }
}

// connect, первым аргументом принимает "маппинг" (соответствие) state к props,
// а вторым маппинг dispatch к props.
export default connect(mapStateToProps, mapDispatchToProps)(App)
// Назначение функции connect вытекает из названия: подключи React компонент к Redux store.
// С помощью функции connect мы можем не только подписаться на обновления данных,
// но и "прокинуть" наши actions в контейнер.

// Вызов этой ф-ии добавляет dispatch метод компоненту App
// Вся логика связи с redux спрятана в вызове ф-ии connect