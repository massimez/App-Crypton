<template>
  <div class="sidebar" :class="{'sidebar_hidden': !isSideBarOpened}" @click="handleClickOutside()">
    <div class="sidebar__title">
      <button @click="hideSidebar()">
        <span class="icon-hamburger sidebar__icon" />
      </button>
    </div>
    <div class="sidebar__links" :class="{'sidebar__links_hidden': !isSideBarOpened}">
      <span class="sidebar__subtitle">Files</span>
      <div v-for="link in files" :key="link.id" class="sidebar__links" @click="getData">
        <NuxtLink :to="`/docs/${link.slug}`" class="sidebar__link">
          {{ link.description }}
        </NuxtLink>
      </div>
    </div>
    <span class="sidebar__subtitle" :class="{'sidebar__subtitle_hidden': !isSideBarOpened}">Titles</span>
    <div
      v-for="link of article.toc || []"
      :key="link.id"
      class="sidebar__links"
      :class="{'sidebar__links_hidden': !isSideBarOpened}"
      @click="getData"
    >
      <NuxtLink
        :to="`#${link.id}`"
        class="sidebar__link"
      >
        {{ link.text }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import MainVue from '~/mixins/MainVue'

interface ArticleBody {
  body: {
    children: Array<ArticleBody>,
    type: string
  },
}

interface Article {
  article: {
    body: ArticleBody,
    createdAt: string,
    description: string,
    dir: string,
    extension: string,
    path: string,
    slug: string,
    title: string,
    toc: [{
      depth: number,
      id: string,
      text: string,
    }],
    updatedAt: string
  }
}

export default MainVue.extend({
  data () {
    return {
      article: {} as Article,
      files: [] as Array<Article>,
      isSideBarOpened: false as boolean
    }
  },
  async mounted () {
    await this.getData()
  },
  methods: {
    hideSidebar (): void {
      this.isSideBarOpened = !this.isSideBarOpened as boolean
    },
    async getData (): Promise<void> {
      await this.getFiles()
      await this.getTitles()
    },
    async getTitles (): Promise<void> {
      this.article = await this.$content('articles', this.$route.params.slug).fetch<Article>() as Article
    },
    async getFiles (): Promise<void> {
      this.files = await this.$content('', { deep: true }).fetch<Article>() as Array<Article>
    },
    handleClickOutside (): void {
      window.addEventListener('click', (e) => {
        if (!this.$el.contains(e.target as HTMLDivElement) && this.isSideBarOpened === true) {
          this.isSideBarOpened = !this.isSideBarOpened as boolean
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
a.nuxt-link-exact-active {
  color: var(--lgreen);
}

.sidebar {
  display: flex;
  position: fixed;
  z-index: 1;
  flex-direction: column;
  width: 400px;
  background: var(--white);
  border-right: 1px solid var(--black100);
  height: 100%;
  transition: .5s;
  box-shadow: 0 5px 10px -1px rgba(34, 60, 80, 0.11);
  &_hidden {
    width: 60px;
  }
  &__icon {
    font-size: 24px;
  }
  &__title {
    font-family: Roboto Mono,sans-serif;
    justify-content: center;
    display: flex;
    flex-direction: row;
    margin: 10px;
    font-weight: 600;
    color: #383838;
  }
  &__subtitle {
    display: flex;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    &_hidden {
      display: none;
    }
  }
  &__links {
    overflow: hidden;
    margin: 1px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &_hidden {
      display: none;
    }
  }
  &__link {
    font-family: Roboto Mono,sans-serif;
    display: flex;
    justify-content: center;
    border-radius: 6px;
    margin: 10px;
    padding: 5px;
    color: var(--black);
    font-size: 14px;
    text-decoration: none;
    background: var(--white);
    width: 100%;
    transition: .5s;
  }
}
</style>
