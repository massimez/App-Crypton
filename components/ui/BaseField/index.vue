<template>
  <validation-provider
    v-slot="{errors}"
    tag="div"
    class="base-field base-field_default"
    :class="[
      {'base-field_disabled': disabled},
      {'base-field_search': isSearch},
    ]"
    :rules="rules"
    :name="name"
    :vid="vid"
    mode="eager"
    slim
  >
    <div
      v-if="label"
      class="base-field__header"
    >
      {{ label }}
    </div>
    <div class="base-field__body">
      <img
        v-if="isSearch"
        class="base-field__search"
        src="/img/search.svg"
        alt="search"
      >
      <div class="base-field__left">
        <slot name="left" />
      </div>
      <input
        class="base-field__input"
        :placeholder="placeholder"
        :value="value"
        :type="type"
        :autocomplete="autocomplete"
        @input="input"
        @keydown.enter="enter"
      >
      <div
        v-if="value && isSearch"
        class="base-field__clear"
        @click="clear()"
      >
        <img
          src="/img/close.svg"
          alt="x"
        >
      </div>
      <div class="base-field__right">
        <slot name="right" />
      </div>
      <div class="base-field__right-absolute">
        <slot name="right-absolute" />
      </div>
    </div>
    <div
      v-if="!isHideError"
      class="base-field__err"
    >
      {{ errors[0] }}
    </div>
  </validation-provider>
</template>
<script lang="ts">

import MainVue from '~/mixins/MainVue'

export default MainVue.extend({
  props: {
    value: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: ''
    },
    big: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    errorText: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isHideError: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    isSearch: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: 'on'
    },
    rules: {
      type: [String, Array, Object],
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    vid: {
      type: String,
      default: ''
    }
  },
  methods: {
    input ($event: Event): void {
      const target = $event.target as HTMLInputElement
      if (target?.value) {
        this.$emit('input', target.value)
      } else {
        this.$emit('input', '')
      }
    },
    enter ($event: Event): void {
      const target = $event.target as HTMLInputElement
      if (target?.value) {
        this.$emit('enter', target.value)
      }
    },
    clear (): void {
      this.$emit('input', '')
      this.$emit('clear')
    }
  }
})
</script>
<style lang="scss" scoped>
.base-field {
  &__right {
    min-height: 100%;
    display: flex;
  }
  &__clear {
    position: absolute;
    right: 20px;
    cursor: pointer;
    span::before {
      color: var(--aqua);
      font-size: 24px;
    }
  }
  &__right-absolute {
    position: absolute;
    right: 12px;
  }
  &__left {
    position: absolute;
    left: 12px;
    padding-left: 5px;
  }
  &__body {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
  }
  &__header {
    margin-bottom: 10px;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    color: var(--black);
  }
  &__err {
    color: var(--red);
    font-size: 12px;
    min-height: 23px;
  }
  &__search {
    position: absolute;
    left: 13px;
    &:before {
      font-size: 24px;
      background: var(--aqua);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  &__input {
    height: 48px;
    border: 1px solid var(--black100);
    padding: 0 16px;
    transition: .3s;
    width: 100%;
  }
  &_disabled {
    .base-field__input {
      pointer-events: none;
    }
  }
  &_search {
    .base-field__input {
      padding: 0 20px 0 50px;
      background: transparent !important;
      &:hover {
        border: 1px solid var(--black200) !important;
      }
      &:focus {
        border: 1px solid var(--black200) !important;
      }
    }
  }
  &_default {
    .base-field__input {
      color: var(--black);
      background: var(--white);
      border: 1px solid var(--black100);
      &::placeholder {
        color: var(--black600);
      }
      &:focus {
        background: var(--white);
        border: 1px solid var(--aqua);
      }
    }
  }
  &_icon {
    .base-field {
      &__input {
        padding: 0 20px 0 50px;
      }
    }
  }
  &_big {
    .base-field {
      &__input {
        font-family: Roboto Mono,sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 25px;
        height: 84px;
      }
    }
  }
}
</style>
