<template>
  <div
    :class="[
      'pc-dropdown',
      {
        'pc-dropdown--folded': pcFolded,
        'pc-dropdown--unfolded': !pcFolded
      }
    ]"
  >
    <div class="pc-dropdown__header" @click="handleHeaderClick">
      <slot name="header" />
      <div
        v-if="hasOutsideToggler"
        class='pc-dropdown__toggler'
        @click="toggle()"
      >
        <slot name="toggler" />
      </div>
    </div>
    <div ref="content" class="pc-dropdown__content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
import { animate, EASE_OUT } from 'js/utils';

import PC_EVENT_BUS from 'js/pc_event_bus';

import {
  PC_DROPDOWN_TOGGLE,
  PC_DROPDOWN_UNFOLD,
  PC_DROPDOWN_FOLD,
  PC_DROPDOWN_TOGGLE_OUTSIDE,
  PC_DROPDOWN_UNFOLD_OUTSIDE,
  PC_DROPDOWN_FOLD_OUTSIDE
} from 'js/constants';

export default {
  name: 'PCDropdown',
  props: {
    isFolded: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    animation: {
      type: [Object, Boolean],
      default() {
        return {
          duration: 200,
          easing: EASE_OUT,
        };
      },
    },
    id: [String, Number],
  },
  created() {
    this.setBusEvents();
  },
  mounted() {
    this.linkContent();
    this.checkIsFolded();
  },
  beforeDestroy() {
    this.removeBusEvents();
  },
  data() {
    return {
      pcFolded: this.isFolded,
      content: null,
      isAnimating: false,
    };
  },
  computed: {
    hasOutsideToggler() {
      return !!this.$slots.toggler;
    },
  },
  watch: {
    pcFolded(isFolded) {
      if (isFolded) {
        this.fold();
      } else {
        this.unfold();
      }
    },
  },
  methods: {
    setBusEvents() {
      PC_EVENT_BUS.$on(PC_DROPDOWN_TOGGLE_OUTSIDE, this.toggle);
      PC_EVENT_BUS.$on(PC_DROPDOWN_UNFOLD_OUTSIDE, this.pcUnfold);
      PC_EVENT_BUS.$on(PC_DROPDOWN_FOLD_OUTSIDE, this.pcFold);
    },
    linkContent() {
      this.content = this.$refs.content;
    },
    checkIsFolded() {
      if (this.pcFolded === false) {
        this.unfold();
      }
    },
    removeBusEvents() {
      PC_EVENT_BUS.$off(PC_DROPDOWN_TOGGLE_OUTSIDE, this.toggle);
      PC_EVENT_BUS.$off(PC_DROPDOWN_UNFOLD_OUTSIDE, this.pcUnfold);
      PC_EVENT_BUS.$off(PC_DROPDOWN_FOLD_OUTSIDE, this.pcFold);
    },
    toggle(id) {
      if (id !== undefined && id !== this.id) {
        return;
      }
      if (!this.isAnimating) {
        this.pcFolded = !this.pcFolded;
        PC_EVENT_BUS.$emit(PC_DROPDOWN_TOGGLE, this.id);
        if (this.pcFolded) {
          PC_EVENT_BUS.$emit(PC_DROPDOWN_FOLD, this.id);
        } else {
          PC_EVENT_BUS.$emit(PC_DROPDOWN_UNFOLD, this.id);
        }
      }
    },
    pcUnfold(id) {
      if (id !== undefined && id !== this.id) {
        return;
      }
      this.pcFolded = false;
      PC_EVENT_BUS.$emit(PC_DROPDOWN_UNFOLD, this.id);
    },
    pcFold(id) {
      if (id !== undefined && id !== this.id) {
        return;
      }
      this.pcFolded = true;
      PC_EVENT_BUS.$emit(PC_DROPDOWN_FOLD, this.id);
    },
    handleHeaderClick() {
      if (this.hasOutsideToggler) {
        return;
      }
      this.toggle();
    },
    fold() {
      const initialHeight = this.content.clientHeight;
      if (this.animation) {
        this.isAnimating = true;
        const { duration, easing } = this.animation;
        const draw = fraction => {
          this.content.style.height = `${initialHeight - (fraction * initialHeight)}px`;
        };
        animate({ duration, easing, draw, end: this.endAnimation });
      } else {
        this.content.style.height = '0px';
      }
      window.cancelAnimationFrame(this.$animationId);
    },
    unfold() {
      const desiredHeight = this.getContentHeight();
      this.bufferContentHeight(desiredHeight);
      if (this.animation) {
        this.isAnimating = true;
        const { duration, easing } = this.animation;
        const draw = fraction => {
          this.content.style.height = `${desiredHeight * fraction}px`;
        };
        animate({ duration, easing, draw, end: this.endAnimation });
      } else {
        this.content.style.height = `${desiredHeight}px`;
      }
      this.$animationId = window.requestAnimationFrame(this.watchHeights);
    },
    getContentHeight() {
      return [...this.content.children].reduce((height, child) => {
        const { clientHeight } = child;
        const {
          marginTop,
          marginBottom,
          borderTop,
          borderBottom,
        } = window.getComputedStyle(child);
        const offsetTop = parseFloat(marginTop.replace(/px/, '')) + (borderTop ? parseFloat(borderTop.replace(/px.*/, '')) : 0);
        const offsetBottom = parseFloat(marginBottom.replace(/px/, '')) + (borderBottom ? parseFloat(borderBottom.replace(/px.*/, '')) : 0);
        return height + clientHeight + offsetTop + offsetBottom;
      }, 0);
    },
    bufferContentHeight(height) {
      this.$contentHeight = height;
    },
    endAnimation() {
      this.isAnimating = false;
    },
    watchHeights() {
      const newHeight = this.getContentHeight();
      if (this.$contentHeight !== newHeight) {
        this.bufferContentHeight(newHeight);
        this.content.style.height = `${newHeight}px`;
      }
      this.$animationId = window.requestAnimationFrame(this.watchHeights);
    },
  },
};
</script>

<style>
  .pc-dropdown {
    user-select: none;
  }
  .pc-dropdown__content {
    height: 0px;
    overflow: hidden;
  }
</style>
