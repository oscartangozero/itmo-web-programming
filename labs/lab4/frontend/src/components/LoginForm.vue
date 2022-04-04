<template>
  <section id="section-request">
    <h2>Login form</h2>
    <form id="login-form" @submit.prevent>
      <div class="form-field">
        <label class="field-label">Username</label>
        <div id="field-username" class="field-content">
          <div id="inputs-username">
            <input type="text" id="input-username" v-model="username" required>
          </div>
        </div>
      </div>
      <div class="form-field">
        <label for="input-password" class="field-label">Password</label>
        <div id="field-y" class="field-content">
          <input type="text" id="input-password" v-model="password" required>
        </div>
      </div>
      <div class="form-controls">
        <div id="login-error" class="error-message">{{ errorMessage }}</div>
        <button type="button" @click="formSignupHandler">SIGN UP</button>
        <button type="button" @click="formSigninHandler">LOG IN</button>
      </div>
    </form>
  </section>
</template>

<script setup>
import state from '@/store'
import { ref } from 'vue'

const errorMessage = ref(null)
const username = ref('')
const password = ref('')

function formSignupHandler() {
  const form = document.getElementById('login-form')
  if (form.reportValidity()) {
    state.signup(username.value, password.value)
      .catch(error => {
        errorMessage.value = error.message
      })
  }
}

function formSigninHandler() {
  const form = document.getElementById('login-form')
  if (form.reportValidity()) {
    state.login(username.value, password.value)
      .catch(error => {
        errorMessage.value = error.message
      })
  }
}
</script>

<style scoped>
form {
  width: 60%;
  min-width: min-content;
  margin-left: auto;
  margin-right: auto;
}

form > .form-field,
form > .form-controls {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  box-sizing: border-box;
  min-height: 3em;
  margin: 0.5em 1%;
}

form > .form-controls {
  justify-content: flex-end;
}

.form-controls > * {
  margin: 0.1em 0.2em;
}

form > .form-field {
  justify-content: space-between;
}

form > .form-field > .field-label {
  flex: 0 0 auto;
  min-width: 7em;
  margin: 0.25em 1%;
  white-space: nowrap;
  font-weight: bolder;
}

form > .form-field > .field-content {
  flex: 1 0 min-content;
  margin: 0.25em 1%;
  text-align: center;
}

form > .form-field > .field-content > .field-content-row {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: nowrap;
}

form > .form-field > .field-content > .field-content-row > * {
  margin: 0.1em 0.2em;
}

input[type='text'] {
  min-width: 300px;
  width: 100%;
  text-align: center;
}

.error-message {
  font-size: small;
  color: red;
}
</style>
