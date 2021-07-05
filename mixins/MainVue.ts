import Vue from 'vue'
import { Plugin } from '@nuxt/types'

import {
  ValidationProvider,
  ValidationObserver,
  extend,
  // configure,
  setInteractionMode
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import modals from '~/store/modals/modals'

Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)
setInteractionMode('eager')

Object.keys(rules).forEach((rule) => {
  extend(rule, {
    // @ts-ignore
    ...rules[rule]
  })
})

export default Vue.extend({
  methods: {
    ShowModal (payload: Record<string, unknown>) {
      this.$store.dispatch('modals/show', {
        key: modals.default,
        ...payload
      })
    },
    SetLoader (value: boolean) {
      this.$store.dispatch('loader/setLoading', value)
    }
  }
})
