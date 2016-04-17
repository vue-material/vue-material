import Vue from 'vue'
export default function warn (...args) {
  if (process.env.NODE_ENV !== 'production') {
    Vue.util.warn.apply(null, args)
  }
}
