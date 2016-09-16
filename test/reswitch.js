import expect from 'expect.js'

import reswitch from '../src/reswitch'

describe('reswitch', () => {
  const defaultPostState = {isLoading: false, hasError: false, post: null}
  const requestState     = {isLoading: true,  hasError: false, post: null}
  const successState     = {isLoading: true,  hasError: false, post: {id: 1}}
  const failState        = {isLoading: false, hasError: true,  post: null}

  const GET_POST         = 'GET_POST'
  const GET_POST_SUCCESS = 'GET_POST_SUCCESS'
  const GET_POST_FAIL    = 'GET_POST_FAIL'

  describe('when receiving an object as an action', () => {
    it('should return a reducer', () => {
      expect(
        reswitch(
          GET_POST,         requestState,
          GET_POST_SUCCESS, successState,
          GET_POST_FAIL,    failState
        )(defaultPostState, 'GET_POST')
      ).to.be(requestState)
    })
  })

  describe('when receiving a function as an action', () => {
    it('should return a reducer', () => {
      expect(
        reswitch(
          GET_POST,         () => {
            return requestState
          },

          GET_POST_SUCCESS, () => {
            return successState
          },

          GET_POST_FAIL,    () => {
            return failState
          }
        )(defaultPostState, 'GET_POST')
      ).to.be(requestState)
    })

    describe('passing state as first parameter', () => {
      it('should return a reducer', () => {
        expect(
          reswitch(
            GET_POST, state => {
              return state
            }
          )(defaultPostState, 'GET_POST')
        ).to.be(defaultPostState)
      })
    })
  })

  describe('when defining a specific default case', () => {
    describe('and when the action matches', () => {
      it('should return the reducer based on that action', () => {
        expect(
          reswitch(
            GET_POST, requestState,

            () => {
              return {status: 404}
            }
          )(defaultPostState, 'GET_POST')
        ).to.be(requestState)
      })
    })

    describe('and when the action doesn\'t match', () => {
      it('should return the specified default reducer', () => {
        expect(
          reswitch(
            GET_POST, requestState,

            () => {
              return {status: 404}
            }
          )(defaultPostState, 'GET_POST_SUCCESS')
        ).to.eql({status: 404})
      })
    })
  })
})
