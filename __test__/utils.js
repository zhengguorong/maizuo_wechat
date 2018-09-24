export const noop = () => {}

export const afterSetData = fn => setTimeout(fn, 0)

export const isFn = fn => typeof fn === 'function'