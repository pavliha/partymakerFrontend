import Party from 'src/services/api/Party'

import * as alert from 'src/redux/alert/action'

export const LOAD_PARTY = 'LOAD_PARTY'
export const LOAD_PARTY_PENDING = 'LOAD_PARTY_PENDING'
export const LOAD_PARTY_REJECTED = 'LOAD_PARTY_REJECTED'
export const LOAD_PARTY_FULFILLED = 'LOAD_PARTY_FULFILLED'

export const CHANGE_PARTY = 'CHANGE_PARTY'
export const CHANGE_PARTY_PENDING = 'CHANGE_PARTY_PENDING'
export const CHANGE_PARTY_REJECTED = 'CHANGE_PARTY_REJECTED'
export const CHANGE_PARTY_FULFILLED = 'CHANGE_PARTY_FULFILLED'

// noinspection JSUnusedGlobalSymbols
export const show = (id) => ({
  type: LOAD_PARTY,
  payload: Party.find(id),
})

// noinspection JSUnusedGlobalSymbols
export const change = (id, settings) => async dispatch => {
  await dispatch({
    type: CHANGE_PARTY,
    payload: Party.change(id, settings),
  })

  dispatch(alert.show('Вечеринка изменина'))
}
