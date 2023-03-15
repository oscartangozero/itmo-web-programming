<template>
  <component :is="currentView"/>
</template>

<script setup>
import { computed } from 'vue'
import state from '@/store'
import LoginView from '@/views/LoginView'
import MainView from '@/views/MainView'

const currentView = computed(() => state.isAuthenticated ? MainView : LoginView)
</script>

<style>
:root {
  --body-background: #eee;
  --body-primary: #bbb;
  --header-background: #101f27;
  --header-primary: #fff;
  --header-accent: #fa0345;
  --main-background: #fff;
  --main-primary: #212529;
  --main-accent: #3584e4;
  --main-subtle-background: #eee;
  --main-subtle-primary: #bbb;
  --main-action-background: #f3dd73;
  --main-action-primary: #000;
}

html, body {
  min-width: 100%;
  min-height: 100%;
}

body {
  margin: 0;
  color: var(--body-primary);
  background-color: var(--body-background);
}

main {
  box-sizing: border-box;
  width: 70%;
  min-width: 500px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  font-family: Arial, Helvetica, sans-serif;
  color: var(--main-primary);
}

@media (max-width: 500px) {
  main {
    width: 99%;
    min-width: min-content;
  }
}

section {
  box-sizing: border-box;
  width: 100%;
  margin: 1% 0;
  border-radius: 5px;
  padding: 1px 20px;
  background-color: var(--main-background);
}

button, input[type='submit'] {
  display: block;
  border: none;
  border-radius: 10px;
  padding: 0.5em 1em;
  font-size: 110%;
  color: var(--main-action-primary);
  background-color: var(--main-action-background);
}

.panel-styled {
  display: block;
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
  width: min-content;
  margin: 0.3em auto;
  background-color: var(--main-subtle-background);
}
</style>
