# reswitch [![Build Status](https://travis-ci.org/chiefGui/reswitch.svg?branch=master)](https://travis-ci.org/chiefGui/reswitch)

Write your reducers with less boilerplate! 🚀

### Install

`npm install --save reswitch`

### Usage

Through its simplest usage, within a fictional `userReducer.js` reducer:

_yourapp/reducers/usersReducer.js_
```js
import reswitch from 'reswitch'

import {
  USERS_GET,
  USERS_GET__SUCCESS,
  USERS_GET__FAILURE
} from 'reducers/users'

const defaultState = {areLoading: false, hasError: false, users: null}

function users(state = {
  areLoading: false,
  hasError:   false,
  users:      null
}, action) {
  return reswitch(
    USERS_GET,          {...defaultState, areLoading: true},
    USERS_GET__SUCCESS, {...defaultState, users: action.users},
    USERS_GET__FAILURE, {...defaultState, hasError: true},
  )(state, action.type)
}

export default users
```

**Or you can even hang with functions!**

```js
return reswitch(
  USERS_GET,          {...defaultState, areLoading: true},
  USERS_GET__SUCCESS, {...defaultState, users: action.users},
  USERS_GET__FAILURE, () => ({...state, action.error})
)(state, action.type)
```

_Important:_ In case none of the actions match, then `state` will be used
instead as the default. Maybe you want to use a different fashion, then just
leave your reswitch with an odd number of arguments and it will pick
the last one as the new default:

```js
return reswitch(
  USERS_GET,          {...defaultState, areLoading: true},
  USERS_GET__SUCCESS, {...defaultState, users: action.users},
  USERS_GET__FAILURE, () => ({...state, action.error}),

  () => ({...defaultState, areAdmin: false})
)(state, action.type)
```

_In the above's example we're defining the last argument as a function, but it doesn't
need to be. You can use a plain object—or even a complex one!—if you need._

### TODO

- [ ] Enable acceptance of instances in the second parameter (good when working with Immutable!)

### Motivation

I don't like those huge amounts of `switch`es. Although in the official Redux's website
[they're saying that switches aren't the real boilerplate](http://redux.js.org/docs/recipes/ReducingBoilerplate.html#reducers),
I still don't like to use it. **It looks like a boilerplate** and for me that's
reason enough;

### License

MIT
