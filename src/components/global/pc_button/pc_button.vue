<template>
  <div
    :class="['base-button', {
      'base-button--red': red,
      'base-button--white': white,
    }]"
    :style="styleObject"
    @click="onClick"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'PCButton',
  props: {
    white: {
      type: Boolean,
      default: false,
    },
    red: {
      type: Boolean,
      default: false,
    },
    baseStyle: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    styleObject() {
      let {
        width = 225,
        height = 53,
        fontSize = 18,
        lineHeight = 53,
      } = this.baseStyle;
      return {
        width: `${width}px`,
        height: `${height}px`,
        fontSize: `${fontSize}px`,
        lineHeight: `${lineHeight}px`,
      };
    },
  },
  methods: {
    onClick() {
      const isDisabled = this.$attrs.hasOwnProperty('disabled') && this.$attrs.disabled;
      if (isDisabled) {
        return;
      }
      this.$emit('click');
    },
  },
};
</script>

<style>
.base-button {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  background: linear-gradient(180deg, #009BA6 3.15%, #00C0B1 97.01%);
  box-shadow: 0px 3px 15px rgba(81, 229, 222, 0.5);
  border-radius: 5px;
  color: #fff;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
}
.base-button:hover {
  background: linear-gradient(180deg, #00A1A8 5.57%, #00CBB0 97.46%);
}
.base-button:after {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.base-button[disabled] {
  opacity: .2;
  cursor: no-drop;
}
.base-button--red {
  background-image: linear-gradient(0deg, #fbbb66 0%, #fc6f90 100%);
  box-shadow: 1.634px 2.516px 28.5px 1.5px rgba(255, 157, 180, 0.4);
}
.base-button--red:hover {
  background-image: linear-gradient(0deg, #fbbb66 0%, #fc6f90 100%);
  box-shadow: 1.634px 2.516px 28.5px 1.5px rgba(255, 157, 180, 0.4);
}
.base-button--white {
  color: #00A3AA;
  background: white;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.03);
  border: 2px solid #00C9B1;
}
.base-button--white:hover {
  background: white;
}
</style>
