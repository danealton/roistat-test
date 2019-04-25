<template>
  <header class="header">
    <PCButton
      :base-style="{
        width: 150,
        height: 35,
        fontSize: 16,
        lineHeight: 36,
      }"
      @click="addUser"
    >Add</PCButton>
  </header>
</template>

<script>
import PC_EVENT_BUS from 'js/pc_event_bus';

export default {
  name: 'PCHeader',
  components: {},
  methods: {
    addUser() {
      PC_EVENT_BUS.$emit('addUser', {});
    },
  },
};
</script>

<style>
  .header {
    position: relative;
    padding: 20px 30px;
  }
</style>
