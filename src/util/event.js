export default {
  addEventListener (el, eventName, handler) {
    el.addEventListener(eventName, handler)
    return () => {
      el.removeEventListener(eventName, handler)
    }
  },
  removeEventListener (el, eventName, handler) {
    el.removeEventListener(eventName, handler)
  }
}
