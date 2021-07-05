<template>
  <div class="page">
    <div class="page__title">
      <h1>{{ article.title }}</h1>
      <span>{{ article.description }}</span>
    </div>
    <article class="page__article">
      <nuxt-content :document="article" />
    </article>
  </div>
</template>

<script lang="ts">

import MainVue from '~/mixins/MainVue'

export default MainVue.extend({
  async asyncData ({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()
    return { article }
  }
})
</script>

<style lang="scss">

  .page {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 20px 0 70px;

    &__title {
      margin: 0 0 40px;
      display: flex;
      flex-direction: column;
      //align-items: center;
    }
  }

  .nuxt-content {
    h1, h2, h3, h4, h5 {
      //text-align: center;
      margin-bottom: 10px;
    }
    pre {
      font-size: 12px;
    }

    a {
      text-decoration: none;
    }

    .icon-link {
      display: none;
    }
  }

</style>
