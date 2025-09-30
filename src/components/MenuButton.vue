<script lang="ts" setup>
defineProps({
  text: String,
})
</script>

<template>
  <button>{{ text }}</button>
</template>

<style scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 0.5rem;
  height: 4rem;
  width: 12rem;

  cursor: pointer;

  color: white;
  background-color: #0e0792;
}
</style>
