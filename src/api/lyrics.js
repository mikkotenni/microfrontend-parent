export function listen(name, action) {
  document.addEventListener(name, action, true)
}

export function send(name, detail) {
  const event = new CustomEvent(name, {
    detail,
  })
  document.dispatchEvent(event)
}

export function remove(name, action) {
  document.removeEventListener(name, action, true)
}
