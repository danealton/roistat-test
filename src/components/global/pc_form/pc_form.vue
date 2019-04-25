<template>
  <form>
    <template v-for="(slot, slotName) in $slots">
      <slot v-if="slotName" :name="slotName"></slot>
    </template>
  </form>
</template>

<script>
export default {
  name: 'PCForm',
  props: {},
  computed: {},
  methods: {},
};
</script>

<style>
</style>
