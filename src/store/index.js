import Vue from 'vue'
import Vuex from 'vuex'
import { getProviders } from "@/utils/helpers";
import { 
  UPDATE_INITIAL_PROVIDER,
  UPDATE_SECOND_PROVIDER,
  UPDATE_INITIAL_PROVIDER_SELECTED_CATEGORIES,
  UPDATE_SECOND_PROVIDER_SELECTED_CATEGORIES,
  INITIAL_PROVIDER_SELECTED_CATEGORIES,
  SECOND_PROVIDER_SELECTED_CATEGORIES,
  INITIAL_PROVIDER,
  SECOND_PROVIDER,
  GET_PROVIDERS,
  IS_SYNC_UP_COMPLETED,
  UPDATE_IS_SYNC_UP_COMPLETED,
  SYNC_PROVIDERS_CONTACTS,
  IS_FORM_LOADED,
} from "@/utils/constants";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    initialProvider: null,
    initialProviderSelectedCategories: [],
    secondProvider: null,
    secondProviderSelectedCategories: [],
    isSyncUpCompleted: false,
  },
  mutations: {
    [UPDATE_INITIAL_PROVIDER] (state, payload) {
      state.initialProvider = payload;
    },
    [UPDATE_SECOND_PROVIDER] (state, payload) {
      state.secondProvider = payload;
    },
    [UPDATE_INITIAL_PROVIDER_SELECTED_CATEGORIES] (state, payload) {
      state.initialProviderSelectedCategories = payload
    },
    [UPDATE_SECOND_PROVIDER_SELECTED_CATEGORIES] (state, payload) {
      state.secondProviderSelectedCategories = payload;
    },
    [UPDATE_IS_SYNC_UP_COMPLETED] (state, payload) {
      state.isSyncUpCompleted = payload;
    }
  },
  actions: {
    [SYNC_PROVIDERS_CONTACTS]: ({ state, commit }) => {
      const {
        initialProviderSelectedCategories,
        secondProviderSelectedCategories,
        initialProvider,
        secondProvider
      } = state;

      /**
       * Search on both concatc list which users are going to be shared with the other provider
       */
      const initialProviderContactsToSync = secondProvider.contacts.filter(contact => {
        return secondProviderSelectedCategories.includes(contact.category) && !initialProvider.contacts.find(({ id}) => id == contact.id)
      })
      const secondProviderContactsToSync = initialProvider.contacts.filter(contact => {
        return initialProviderSelectedCategories.includes(contact.category) && !secondProvider.contacts.find(({ id}) => id == contact.id)
      })

      commit(UPDATE_INITIAL_PROVIDER, {
        ...initialProvider,
        contacts: [
          ...initialProvider.contacts,
          ...initialProviderContactsToSync
        ]
      })

      commit(UPDATE_SECOND_PROVIDER, {
        ...secondProvider,
        contacts: [
          ...secondProvider.contacts,
          ...secondProviderContactsToSync
        ]
      })

      commit(UPDATE_IS_SYNC_UP_COMPLETED, true)
      /**
       * Allow to play a bit more with the sync function, why not?
       */
      setTimeout(() => {
        commit(UPDATE_IS_SYNC_UP_COMPLETED, false)
      }, 2500)
    },
    [GET_PROVIDERS]: async ({ commit }) => {
      /**
       * Let's pretend we are connecting to an API
       */
      const response = await getProviders()
      commit(UPDATE_INITIAL_PROVIDER, response[0])
      commit(UPDATE_SECOND_PROVIDER, response[1])
    },
  },
  getters: {
    [INITIAL_PROVIDER]: state => state.initialProvider,
    [SECOND_PROVIDER]: state => state.secondProvider,
    [IS_FORM_LOADED]: state => !!state.initialProvider && !!state.secondProvider,
    [INITIAL_PROVIDER_SELECTED_CATEGORIES]: state => state.initialProviderSelectedCategories,
    [SECOND_PROVIDER_SELECTED_CATEGORIES]: state => state.secondProviderSelectedCategories,
    [IS_SYNC_UP_COMPLETED]: state => state.isSyncUpCompleted,
  },
})
