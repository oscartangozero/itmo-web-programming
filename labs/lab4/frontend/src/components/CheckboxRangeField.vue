<template>
  <div :id="id">
    <template v-for="i in range">
      <input type="checkbox" :id="$props.id + '_' + i" :value="i" v-model="$props['v-model']">
      <label :for="$props.id + '_' + i">{{ i }}</label>
    </template>
  </div>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps(['id', 'start', 'step', 'end', 'modelValue'])
defineEmits(['update:modelValue'])

let range = [];
for (let i = props.start; i <= props.end; i += props.step) {
  range.push(i);
}
range = ref(range)

</script>

<style scoped>

</style>
