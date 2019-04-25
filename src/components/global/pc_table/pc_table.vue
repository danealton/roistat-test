<template>
  <PCDropdown
    class="pc-select"
    :animation="animation"
    :disabled="disabled"
    :id="selectId"
  >
    <template slot="header">
      {{ current }}
    </template>
    <template v-if="hasOutsideToggler" slot="toggler">
      <slot name="toggler" />
    </template>
    <template slot="content">
      <div
        v-for="(variant, index) in variants"
        :class="[
          'pc-select__variant',
          { 'pc-select__variant--current': isCurrent(variant) }
        ]"
        :key="index"
        @click="select(variant, index)"
      >{{ variant }}</div>
    </template>
  </PCDropdown>
</template>

<script>
import PC_EVENT_BUS from 'js/pc_event_bus';

import {
  PC_SELECT,
  PC_DROPDOWN_FOLD_OUTSIDE
} from 'js/constants';

export default {
  name: 'PCTable',
  props: {
    initial: null,
    variants: {
      type: Array,
      required: true,
    },
    placeholder: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    animation: {
      type: [Object, Boolean],
      default() {
        return undefined;
      },
    },
    id: String,
  },
  data() {
    return {
      current: this.initial !== undefined
        ? this.initial
        : this.placeholder
          ? this.placeholder
          : null,
    };
  },
  computed: {
    selectId() {
      return this.id || this._uid;
    },
    hasOutsideToggler() {
      return !!this.$slots.toggler;
    },
  },
  methods: {
    isCurrent(variant) {
      return variant === this.current;
    },
    select(variant, index) {
      const payload = { variant, index, id: this.selectId };
      PC_EVENT_BUS.$emit(PC_SELECT, payload);
      this.$emit('select', payload);
      this.current = variant;
      PC_EVENT_BUS.$emit(PC_DROPDOWN_FOLD_OUTSIDE, this.selectId);
    },
  },
};
</script>

<style>

</style>
