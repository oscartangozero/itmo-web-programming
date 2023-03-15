<template>
  <section id="section-responses">
    <h2>Response history</h2>
    <div class='controls-block'>
      <button type="button" @click="clearClickHandler">CLEAR</button>
    </div>
    <table id="response-history">
      <thead>
      <tr>
        <th>Time</th>
        <th>X</th>
        <th>Y</th>
        <th>R</th>
        <th>Falls within the area</th>
      </tr>
      </thead>
      <tbody id="response-history-content">
      <tr v-for="entry in state.history">
        <td>{{ entry.time }}</td>
        <td>{{ entry.request.coordinates.x }}</td>
        <td>{{ entry.request.coordinates.y }}</td>
        <td>{{ entry.request.radius }}</td>
        <td>{{ entry.response.outcome ? 'YES' : 'NO' }}</td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import state from '@/store'

function clearClickHandler() {
  state.clearHistory().catch(console.warn)
}
</script>

<style>
.controls-block {
  display: flex;
  justify-content: flex-end;
  margin: 0.5em 1%;
}

table {
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 2em;
}

table td {
  text-align: center;
  white-space: pre-line;
  overflow: hidden;
  text-overflow: ellipsis;
}

table th:nth-child(1) {
  width: 30%;
}

table th:nth-child(2),
table th:nth-child(3),
table th:nth-child(4) {
  width: 10%;
}

table th:nth-child(5),
table th:nth-child(6) {
  width: 20%;
}

table th {
  box-sizing: border-box;
  padding: 0.5em 1%;
}

table td {
  padding: 0.25em 1%;
}

table thead,
table tbody {
  border-bottom: 2px solid var(--main-subtle-background);
}

table thead {
  border-top: 2px solid var(--main-subtle-background);
}
</style>
