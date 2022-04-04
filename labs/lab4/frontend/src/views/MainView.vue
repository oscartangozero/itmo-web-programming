<template>
  <BasicHeader>
    <div id="credentials">{{ state.user.name }}</div>
    <button id="log-out-button" @click="state.logout()">LOG OUT</button>
  </BasicHeader>
  <main>
    <RequestForm/>
    <ResponseTable/>
  </main>
</template>

<script setup>
import BasicHeader from '@/components/BasicHeader'
import RequestForm from '@/components/RequestForm'
import ResponseTable from '@/components/ResponseTable'
import state from '@/store'
import { onMounted } from 'vue'

onMounted(() => {
  state.loadHistory().catch(console.warn)
})
</script>

<style>
#log-out-button {
  margin-left: 1em;
}
</style>
