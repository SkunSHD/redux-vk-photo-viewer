import { combineReducers } from 'redux'
import page from './page'
import user from './user'

export default combineReducers({
    page,
    user
})

// Объект, который мы возвращаем в редьюсере, далее с помощью функции connect, 
// превратится в свойства для компонентов. Таким образом, если продолжить пример с фото, 
// то можно написать такой псевдо-код:+

// <Page photos={reducerPage.photos} />