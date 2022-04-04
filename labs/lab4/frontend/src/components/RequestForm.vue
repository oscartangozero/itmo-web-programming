<template>
  <section id="section-request">
    <h2>Request form</h2>
    <div id='form-block'>
      <div id="request-area">
        <svg id="target-area" xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"
             preserveAspectRatio="xMidYMid meet" @click="svgClickHandler">
          <defs>
            <marker id="notch" viewBox="0 0 10 10" refX="5" refY="5"
                    markerWidth="10" markerHeight="10" orient="auto">
              <line x1="5" y1="0" x2="5" y2="10" stroke="#000"/>
            </marker>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"
                    markerWidth="10" markerHeight="10" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z"/>
            </marker>
            <circle id="success-point" cx="0" cy="0" r="5" fill="green"/>
            <circle id="failure-point" cx="0" cy="0" r="5" fill="red"/>
          </defs>
          <g>
            <path class="axis" d="M 5 150 H 30 H 270 H 295" stroke="#000"
                  marker-mid="url(#notch)" marker-end="url(#arrow)"/>
            <path class="axis" d="M 150 295 V 270 V 30 V 5" stroke="#000"
                  marker-mid="url(#notch)" marker-end="url(#arrow)"/>
            <text class="axis-notch-text" x="160" y="35">R</text>
            <text class="axis-notch-text" x="265" y="140">R</text>
          </g>
          <g>
            <template v-for="{x, y, hit} in svgCoordinates">
              <use :href="hit ? '#success-point' : '#failure-point'" :x="x" :y="y"></use>
            </template>
          </g>
        </svg>
      </div>
      <form id="request-form" @submit.prevent="formSubmitHandler">
        <div class="form-field">
          <label class="field-label">X coordinate</label>
          <div id="field-x" class="field-content">
            <div id="inputs-x" class="field-content-row">
              <template v-for="value in checkboxOptions">
                <input type="checkbox" :id="'input-x_' + value" :value="value" v-model="xs">
                <label :for="'input-x_' + value">{{ value }}</label>
              </template>
            </div>
          </div>
        </div>
        <div class="form-field">
          <label for="input-y" class="field-label">Y coordinate</label>
          <div id="field-y" class="field-content">
            <input type="number" id="input-y" v-model="y" required min="-3" max="5" step="any">
          </div>
        </div>
        <div class="form-field">
          <label class="field-label">R parameter</label>
          <div id="field-r" class="field-content">
            <div id="inputs-r" class="field-content-row">
              <template v-for="value in checkboxOptions">
                <input type="checkbox" :id="'input-r_' + value" :value="value" v-model="rs">
                <label :for="'input-r_' + value">{{ value }}</label>
              </template>
            </div>
          </div>
        </div>
        <div class="form-controls">
          <input type="submit" value="SUBMIT">
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import state from '@/store'
import { computed, ref } from 'vue'

/* FORM */

function range(start, end, step) {
  const r = []
  for (let i = start; i <= end; i += step) r.push(i.toString())
  return r
}

const checkboxOptions = range(-2, 2, 0.5)

const xs = ref([])
const y = ref('')
const rs = ref([])

function formSubmitHandler(event) {
  const form = document.getElementById('request-form')
  if (form.reportValidity()) {
    for (const x of xs.value) {
      for (const r of rs.value) {
        state.submit(x, y.value, r).catch(console.warn)
      }
    }
  }
}

/* SVG */

const width = 300
const height = 300
const pixelsPerUnit = 120

function offsetToCoordinates(x, y) {
  return {
    x: (x - width / 2) / pixelsPerUnit,
    y: (height / 2 - y) / pixelsPerUnit,
  }
}

function coordinatesToOffset(x, y) {
  return {
    x: x * pixelsPerUnit + width / 2,
    y: height / 2 - y * pixelsPerUnit,
  }
}

const svgCoordinates = computed(() => state.history
  .filter(entry => {
    const r = entry.request.radius
    return r != 0 && rs.value.includes(r)
  })
  .map(entry => {
    const coordinates = entry.request.coordinates
    const radius = entry.request.radius
    return {
      ...coordinatesToOffset(coordinates.x / radius, coordinates.y / radius),
      hit: entry.response.outcome,
    }
  }))

function svgClickHandler(event) {
  const { x, y } = offsetToCoordinates(event.offsetX, event.offsetY)
  for (const r of rs.value) {
    state.submit(x, y, r).catch(console.warn)
  }
}
</script>

<style scoped>
#form-block {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

#target-area {
  flex: 0 0 auto;
  max-width: 100%;
  margin: 0.5em 1%;
}

#request-form {
  flex: 1 0 min-content;
  margin: 0.5em 1%;
}

#request-form > .form-field,
#request-form > .form-controls {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  box-sizing: border-box;
  min-height: 3em;
  margin: 0.5em 1%;
}

#request-form > .form-controls {
  justify-content: flex-end;
}

#request-form > .form-field {
  justify-content: space-between;
}

#request-form > .form-field > .field-label {
  flex: 0 0 auto;
  min-width: 7em;
  margin: 0.25em 1%;
  white-space: nowrap;
  font-weight: bolder;
}

#request-form > .form-field > .field-content {
  flex: 1 0 min-content;
  margin: 0.25em 1%;
  text-align: center;
}

#request-form > .form-field > .field-content > .field-content-row {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: nowrap;
}

#request-form > .form-field > .field-content > .field-content-row > * {
  margin: 0.1em 0.2em;
}

input[type='text'], input[type='number'] {
  min-width: min-content;
  width: 100%;
  text-align: center;
}
</style>
