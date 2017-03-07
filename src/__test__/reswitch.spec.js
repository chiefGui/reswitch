import reswitch from '../reswitch'

describe('reswitch', () => {
  const INITIAL_STATE = {isLoading: false}
  const GET_POST = 'GET_POST'

  describe('when receiving an object as a state', () => {
    it('returns a reducer', () => {
      const actualState = reswitch(
        GET_POST, {isLoading: true}
      )(INITIAL_STATE, GET_POST)
      const expectedState = {isLoading: true}

      expect(actualState).toEqual(expectedState)
    })
  })

  describe('when receiving a function as an action', () => {
    it('returns a reducer', () => {
      const actualState = reswitch(
        GET_POST, () => ({isLoading: true})
      )(INITIAL_STATE, GET_POST)
      const expectedState = {isLoading: true}

      expect(actualState).toEqual(expectedState)
    })

    describe('and passing calling the state as parameter', () => {
      it('exposes the previous state', () => {
        const actualState = reswitch(
          GET_POST, state => ({isLoading: !state.isLoading})
        )(INITIAL_STATE, GET_POST)
        const expectedState = {isLoading: true}

        expect(actualState).toEqual(expectedState)
      })
    })
  })

  describe('when defining a specific default case', () => {
    describe('and when the action matches', () => {
      it('returns the reducer of that action', () => {
        const actualState = reswitch(
          GET_POST, {isLoading: true},

          () => ({isLoading: false, post: null})
        )(INITIAL_STATE, GET_POST)
        const expectedState = {isLoading: true}

        expect(actualState).toEqual(expectedState)
      })
    })

    describe('and when the action doesn\'t match', () => {
      it('returns the specified custom default reducer', () => {
        const actualState = reswitch(
          GET_POST, {isLoading: true},

          () => ({isLoading: false, post: null})
        )(INITIAL_STATE, 'SOME_ACTION_THAT_DOES_NOT_EXIST')
        const expectedState = {isLoading: false, post: null}

        expect(actualState).toEqual(expectedState)
      })
    })
  })
})
