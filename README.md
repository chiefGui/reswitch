<img src="http://i.imgur.com/PptVucZ.png" align="right" height="280px" hspace="30px" vspace="30px">

# <em>re</em>switch <sup>v1.0.0</sup> [![Build Status](https://travis-ci.org/chiefGui/reswitch.svg?branch=master)](https://travis-ci.org/chiefGui/reswitch)

A tiny library to write friendly reducers with less boilerplate.


### Install

`yarn add reswitch` or `npm install reswitch --save`

### Usage

Its usage couldn't be simpler: you pass as much arguments as you need to the
`reswitch` function, being the odd ones the actions dispatched and the
even ones the state the action will return:

```js
/* /reducers/users.js */

import reswitch from 'reswitch'
import {USERS_GET, USERS_GET__SUCCESS, USERS_GET__FAILURE} from 'consts/users'

const INITIAL_STATE = {areLoading: false, hasError: false, users: null}

const users(state = INITIAL_STATE, action) => reswitch(
  USERS_GET,
    {...defaultState, areLoading: true},

  USERS_GET__SUCCESS,
    {...defaultState, areLoading: false, users: action.users},

  USERS_GET__FAILURE,
    {...defaultState, areLoading: false, hasError: true}
)(state, action.type)

export default users
```

**Arrays are also welcomed:**

```js
reswitch(
  ADD_TODO,
    [...state.todos, action.todo]
)(state, action.type)
```

**As well as a function:**

```js
reswitch(
  REMOVE_TODO,
    () => state.todos.filter(todo => todo.id !== action.todo.id)
)(state, action.type)
```

The default action is the current state of your reducer. You can customise it
by just passing an `object`, `array` or `function` as the last argument of
`reswitch`, without any explicit action:

```js
reswitch(
  ADD_TODO,
    [...state.todos, action.todo],

  () => sort(state.todos)
)(state, action.type)
```

That's it.

### Tests

`yarn test` or `npm test`

### Motivation

I personally don't like those huge amounts of `switch`es. Tokens out and about,
needless. Too much verbosity. To describe what I'm saying, this:

![](http://i.imgur.com/VTfXQdY.png)

Becomes this:

![](http://i.imgur.com/dOMlzER.png)

### License

MIT
