<template>
  <svg :width="$props.width" :height="$props.height"
    viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet"
       @click="clickHandler">
    <defs>
      <marker id="notch" viewBox="0 0 10 10" refX="5" refY="5"
              markerWidth="10" markerHeight="10" orient="auto">
        <line x1="5" y1="0" x2="5" y2="10" stroke="#000"/>
      </marker>
      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"
              markerWidth="10" markerHeight="10" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z"/>
      </marker>
      <slot name="defs"/>
    </defs>
    <g>
      <path class="axis" d="M 5 150 H 30 H 270 H 295" stroke="#000"
            marker-mid="url(#notch)" marker-end="url(#arrow)"/>
      <path class="axis" d="M 150 295 V 270 V 30 V 5" stroke="#000"
            marker-mid="url(#notch)" marker-end="url(#arrow)"/>
      <text class="axis-notch-text" x="160" y="35">R</text>
      <text class="axis-notch-text" x="265" y="140">R</text>
    </g>
    <slot name="contents"/>
  </svg>
</template>

<script setup>
const props = defineProps(['width', 'height', 'clickHandler'])
const pixelsPerUnit = 120;

function offsetToCoordinates({x, y}) {
  return {
    x: (x - props.width / 2) / pixelsPerUnit,
    y: (props.height / 2 - y) / pixelsPerUnit,
  };
}

function coordinatesToOffset({x, y}) {
  return {
    x: x * pixelsPerUnit + props.width / 2,
    y: props.height / 2 - y * pixelsPerUnit
  }
}

// function clickHandler(event) {
//   const coordinates = offsetToCoordinates({event.offsetX, event.offsetY})
// }

</script>

<style scoped>

</style>
