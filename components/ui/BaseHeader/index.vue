<template>
  <div class="header">
    <div class="header__logo">
      <div class="logo" @click="toMainPage()">
        Cr
      </div>
    </div>
    <div class="header__container">
      <div class="header__search">
        <base-field
          :placeholder="placeholder"
          is-search
          :value="search"
          autocomplete="off"
          @input="searchArticles(search = $event)"
        />
      </div>
      <div v-if="articles.length" class="header__results">
        <div v-for="article of articles" :key="article.slug" class="header__result" @click="hideSearch">
          <NuxtLink class="header__nav-link" :to="{ name: article.name, params: { slug: article.slug } }">
            {{ article.title }}
          </NuxtLink>
        </div>
      </div>
    </div>
    <div style="justify-self: flex-end;align-self: center">
      <ColorModePicker />
    </div>
  </div>
</template>

<script lang="ts">
import BaseField from '~/components/ui/BaseField/index.vue'
import MainVue from '~/mixins/MainVue'
import ColorModePicker from '~/components/ColorPickerMode/index.vue'

export default MainVue.extend({
  components: {
    ColorModePicker,
    BaseField
  },
  data () {
    return {
      search: '' as string,
      articles: [] as Array<string>,
      placeholder: 'Type to search here'
    }
  },
  methods: {
    toMainPage (): void {
      this.$router.push('/')
    },
    hideSearch (): void {
      this.articles = [] as Array<string>
    },
    async searchArticles (value: string): Promise<void> {
      if (value === '') {
        this.articles = []
        return
      }
      const response = await this.$content('articles')
        .only(['title', 'slug'])
        .sortBy('createdAt', 'asc')
        .limit(12)
        .search(value)
        .fetch() as Array<any>
      this.articles = response
    }
  }
})
</script>

<style lang="scss" scoped>

.logo {
  font-size: 37px;
  font-weight: 700;
  border-radius: 7px;
  padding: 0 5px 0 5px;
  font-family: Roboto Mono,sans-serif;
  display: flex;
  align-items: center;
  background: linear-gradient(45deg, var(--lgreen) 5.84%, var(--cyan) 84.98%);
  background-size: 400% 400%;
  animation: gradient 1.5s ease infinite;
  color: var(--white);
  cursor: pointer;
  transition: all .8s linear 0s;
  box-shadow: 0 5px 10px -1px rgba(34, 60, 80, 0.11);
}

.header {
  width: 100%;
  display: flex;
  position: fixed;
  background: var(--white);
  box-shadow: 1px 1px 4px 0 rgba(34, 60, 80, 0.2);
  z-index: 1;

  &__nav-link {
    text-decoration: none;
    color: #0B1511;
    z-index: 3;
    &:hover {
      color: var(--lgreen);
    }
  }

  &__logo {
    align-self: flex-start;
    display: flex;
    height: 60px;
    width: 80px;
    filter: brightness(0.96);
    padding: 4px;
  }
  &__search {
    align-self: center;
    height: 48px;
    overflow: hidden;
    width: 800px;
    border: 1px solid var(--cyan);
    animation: gradient 1.5s ease infinite;
    border-radius: 24px;
  }
  &__result {
    overflow: hidden;
    z-index: 1;
    margin: 1px;
    background: var(--white);
    border-radius: 6px;
    width: 600px;
    text-align: center;
    padding: 5px 4px;
    transition: .5s;
    &:hover {
      color: var(--lgreen);
    }
  }
  &__results {
    display: flex;
    position: absolute;
    flex-direction: column;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    border: 1px solid var(--lgreen);
    top: 60px;
  }
  &__container {
    padding: 4px;
    width: 100%;
    display: flex;
    align-items: center;
    height: 60px;
    justify-content: center;
  }
}
</style>
