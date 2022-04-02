import {computed, reactive} from "vue";

const state = reactive({
  credentials: {
    username: '',
    password: ''
  },
  isAuthenticated: false,
  history: [],
})

export function useStore() {
}
