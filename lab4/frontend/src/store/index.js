import { reactive } from 'vue'

function fetchRest(method, target, body = null, authToken = null) {
  const headers = { 'Content-Type': 'application/json' }
  if (authToken !== null) headers.Authorization = authToken
  const init = { method, headers }
  if (body !== null) init.body = JSON.stringify(body)
  return fetch(target, init)
}

const store = reactive({
    user: {
      name: sessionStorage.getItem('username'),
      password: sessionStorage.getItem('password'),
    },
    isAuthenticated: (sessionStorage.getItem('isAuthenticated') === 'true'),
    dump() {
      sessionStorage.setItem('username', this.user.name)
      sessionStorage.setItem('password', this.user.password)
      sessionStorage.setItem('isAuthenticated', this.isAuthenticated.toString())
    },
    basicAuthToken() {
      return 'Basic ' + window.btoa(this.user.name + ':' + this.user.password)
    },
    history: [],

    signup(name, password) {
      const user = { name, password }
      return fetchRest('POST', '/auth/signup', user)
        .then(response => {
          if (response.ok) return response.json()
          throw new Error(response.statusText)
        })
        .then(response => {
          if (!response.success) throw new Error(response.message)
          this.user = user
          this.isAuthenticated = true
          this.dump()
        })
    },
    login(name, password) {
      const user = { name, password }
      return fetchRest('POST', '/auth/login', user)
        .then(response => {
          if (response.ok) return response.json()
          throw new Error(response.statusText)
        })
        .then(response => {
          if (!response.success) throw new Error(response.message)
          this.user = user
          this.isAuthenticated = true
          this.dump()
        })
    },
    loadHistory() {
      return fetchRest('GET', '/api/requests', null, this.basicAuthToken())
        .then(response => {
          if (response.ok) return response.json()
          if (response.status === 401) this.logout()
          throw new Error(response.statusText)
        })
        .then(response => {
          this.history = response
        })
    },
    submit(x, y, radius) {
      const data = { coordinates: { x, y }, radius }
      return fetchRest('POST', '/api/check', data, this.basicAuthToken())
        .then(response => {
          if (response.ok) return response.json()
          if (response.status === 401) this.logout()
          throw new Error(response.statusText)
        })
        .then(response => {
          this.history.push(response)
        })
    },
    clearHistory() {
      return fetchRest('POST', '/api/clear', {}, this.basicAuthToken())
        .then(response => {
          if (response.ok) this.history = []
          else if (response.status === 401) this.logout()
          else throw new Error(response.statusText)
        })
    },
    logout() {
      this.isAuthenticated = false
      this.user.password = null
      this.dump()
    },
  },
)

export default store
