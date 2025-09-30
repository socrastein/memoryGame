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
  border-radius: 0.5rem;
  height: 4rem;
  width: 12rem;
}
</style>
