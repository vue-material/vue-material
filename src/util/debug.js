import Vue from 'vue'
export default {
  warn (...args) {
    if (process.env.NODE_ENV !== 'production') {
      Vue.util.warn.apply(null, args)
    }
  },
  log (arg) {
    if (process.env.NODE_ENV !== 'production') {
      if (arg) {
        console.log(JSON.parse(JSON.stringify(arg)))
      } else {
        console.log(arg)
      }
    }
  }
}

