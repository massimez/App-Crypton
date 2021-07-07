<template>
  <span class="langSwitcher">
    <button class="langSwitcher__btn">
      <languages-icon class="langSwitcher__icon" />
    </button>
    <div class="langSwitcher__dropdown">
      <button
        v-for="(locale, i) in $i18n.locales"
        :key="i"
        class="langSwitcher__dropdown__btn"
        :value="locale.code"
        @click="$i18n.setLocale(locale.code)"
      >
        {{ locale.code.toUpperCase() }}
      </button>
    </div>
  </span>
</template>

<script>
import LanguagesIcon from '~/assets/img/icons/global.svg';

export default {
  name: 'LangSwitcher',
  components: { LanguagesIcon },
  computed: {
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>
.langSwitcher {
  position: relative;
  &__btn {
  width: 24px;
  height: 24px;
   }
  &__dropdown {
    z-index: 100;
    display: none;
    &__btn{
      display: block;
      outline: none;
      color: var(--color);
    }
    &__btn:hover{
      background-color: var(--color-primary-btn);
    }
  }
  &__icon{
    fill: var(--color);
  }
}
.langSwitcher:hover .langSwitcher__dropdown{
    display: block;
  position: absolute;
}
.langSwitcher__dropdown .langSwitcher__dropdown__btn {
  display: block;
}

</style>
