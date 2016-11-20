import { createStore, applyMiddleware  } from 'redux'
// redux - это реализация слоя store
// предоставляет всего 2 функции:
// provider - обеспечивает связь всех вложенных конпонентов к store
// connect - связывает компонент с куском store
//   connect(mapStateToProps, mapDispatchToProps) же, принимает ф-ии:
//     mapStateToProps - получает state и возвращает данные которые нужны только для этого компонента
//     mapDispatchToProps - нужна чтобы dispatch'ить из компонента не привязываясь к stor'e
// store имеет 3 метода:
//   dispatch - вызывает action
//   subscribe - вызывается когда значение stor'ы изменилось
//   getState - забираем данные из stor'ы

// action'ы должны не вызывать события а возвращать те данные, которые нужно вызвать
// то есть action возвращает то что нужно dispatch'нуть

// Каждый раз при вызове dispatch, будет вызываться ф-я rootReducer
// Начальное состояние при этом будет initialState

// Middleware - это небольшие функции, которые встраиваются и работают с тем что мы dispatch'нули
// до момента когда вызовется оригинальный redux'овский dispatch
// То есть:
// 1) произошёл store.dispatch('ересь')
// 2) вступает Middlew'арь, и приводит 'ересь' в понятный для redux вид
import rootReducer from '../reducers'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

export default function configureStore(initialState) {
    const logger = createLogger()
    const store = createStore(
        rootReducer, 
        initialState,
        // Middleware - это усилители
        // Суть middleware функций, взять входные данные, добавить что-то и передать дальше.
        // Представляйте усилитель, как нечто стороннее, добавляющее функционал для нашего store.
        applyMiddleware(thunk, logger))

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers')
            store.replaceReducer(nextRootReducer)
        })
    }

    return store;
}

// Store хранит состояние приложения.
// Единственный способ изменить store - это отправить действие (dispatch action).