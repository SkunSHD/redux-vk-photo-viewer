import { 
    GET_PHOTOS_REQUEST,
    GET_PHOTOS_SUCCESS,
    GET_PHOTOS_FAIL,
} from '../constants/Page'

// любое действие пользователя == отправка действия/dispatch actions

// Как вращаются данные внутри redux-приложения:
    // Приложение получило изначальное состояние (initial state)
    // Пользователь нажав кнопку, отправил действие (dispatch action)
    // Соответсвующий редьюсер обновил часть приложения, в согласии с тем, что узнал от действия.
    // Приложение изменилось и теперь отражает новое состояние.
    // ... (все повторяется по кругу, с пункта 2)
// Это и есть однонаправленный поток данных. --->> --->> --->>

// Усилитель: redux-thunk выглядит так:
// function thunkMiddleware({ dispatch, getState }) {
//   return next => action =>
//     typeof action === 'function' ?
//       action(dispatch, getState) :
//       next(action);
// }

let photosArr = []
let cached = false

function makeYearPhotos(photos, selectedYear) {
  let createdYear, yearPhotos = []

  photos.forEach((item) => {
    createdYear = new Date(item.created*1000).getFullYear()
    if (createdYear === selectedYear ) {
      yearPhotos.push(item)
    }
  })

  yearPhotos.sort((a,b) => b.likes.count-a.likes.count);

  return yearPhotos
}

function getMorePhotos(offset, count, year, dispatch) {
  window.VK.Api.call('photos.getAll', {extended:1, count: count, offset: offset}, (r) => {
    try {
      if (offset <= r.response[0] - count) {
        offset+=200;
        photosArr = photosArr.concat(r.response)
        getMorePhotos(offset, count, year, dispatch)
      } else {
        photosArr = photosArr.concat(r.response)
        let photos = makeYearPhotos(photosArr, year)
        cached = true
        dispatch({
          type: GET_PHOTOS_SUCCESS,
          payload: photos
        })
      }
    }
    catch(e) {
      dispatch({
        type: GET_PHOTOS_FAIL,
        error: true,
        payload: new Error(e)
      })
    }

  })
}

export function getPhotos(year) {

  return (dispatch) => {
    dispatch({
      type: GET_PHOTOS_REQUEST,
      payload: year
    })

    if (cached) {
      let photos = makeYearPhotos(photosArr, year)
      dispatch({
        type: GET_PHOTOS_SUCCESS,
        payload: photos
      })
    } else {
      getMorePhotos(0,200,year,dispatch)
    }

  }
}