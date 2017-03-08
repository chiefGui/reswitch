/* @flow */

const hasFunctionNature = (maybe: any) => typeof maybe === 'function'
const hasStringNature = (maybe: any) => typeof maybe === 'string'

type Reducer = (state: any, action: Object) => any

export default function reswitch (...args: Array<string | Function | Reducer | Object>): Reducer {
  const defaultReducer = (state: any) => state

  const hasDefaultReducer = (
    (args.length % 2) && hasFunctionNature(args[args.length - 1])
  )

  if (args.length % 2 === 1) {
    if (hasStringNature(args[0]) && !hasDefaultReducer) {
      return defaultReducer
    }
  }

  if (!hasDefaultReducer) {
    args.push(defaultReducer)
  }

  return (state: any, action: Object) => {
    const argIndex = args.findIndex(arg => arg === action) + 1 || args.length - 1

    if (hasFunctionNature(args[argIndex])) {
      return args[argIndex](state, action)
    }

    return args[argIndex]
  }
}
