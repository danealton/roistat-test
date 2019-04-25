<template>
  <transition name="fade">
    <div class="modal-overlay" @click.self="onClick">
      <div class="modal-content">
        <component
          :is="currentModal"
          v-bind="$attrs"
          v-on="$listeners"
        >
          <template v-for="(slot, slotName) in $slots">
            <slot :name="slotName" :slot="slotName"></slot>
          </template>
        </component>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PCModal',
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    currentModal() {
      return this.type;
    },
  },
  methods: {
    onClick() {
      this.$emit('close', {});
    },
  },
};
</script>

<style>
  .modal-overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(82, 98, 110, 0.52);
    z-index: 1000;
  }
  .modal-content {
    background-color: #fff;
    padding: 30px;
    border-radius: 3px;
  }
</style>
