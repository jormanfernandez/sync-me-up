<template>
  <div class="form">
    <div>
      <Card
        :provider="initialProvider"
        :selectedCategories="initialProviderSelectedCategories"
        :secondProviderName="secondProvider.name"
        :onCategoryChanged="onUpdateInitialProviderSelectedCategories"
      />
    </div>
    <div>
      <SyncUpButton/>
    </div>
    <div>
      <Card
        :provider="secondProvider"
        :selectedCategories="secondProviderSelectedCategories"
        :secondProviderName="initialProvider.name"
        :onCategoryChanged="onUpdateSecondProviderSelectedCategories"
      />
    </div>
  </div>
</template>
<script>
import Card from "@/components/Card.vue"
import SyncUpButton from "@/components/SyncUpButton.vue"
import { mapGetters, mapMutations } from "vuex"
import {
  INITIAL_PROVIDER,
  SECOND_PROVIDER,
  UPDATE_INITIAL_PROVIDER_SELECTED_CATEGORIES,
  UPDATE_SECOND_PROVIDER_SELECTED_CATEGORIES,
  INITIAL_PROVIDER_SELECTED_CATEGORIES,
  SECOND_PROVIDER_SELECTED_CATEGORIES,
} from "@/utils/constants"

export default {
  name: "SyncForm",
  components: {
    Card,
    SyncUpButton
  },
  methods: {
    ...mapMutations({
      [UPDATE_INITIAL_PROVIDER_SELECTED_CATEGORIES]: UPDATE_INITIAL_PROVIDER_SELECTED_CATEGORIES,
      [UPDATE_SECOND_PROVIDER_SELECTED_CATEGORIES]: UPDATE_SECOND_PROVIDER_SELECTED_CATEGORIES,
    }),
    /**
     * Update selected categories for the initial provider
     * @param {String} selectedCategory 
     * @param {Boolean} isChecked 
     */
    onUpdateInitialProviderSelectedCategories (selectedCategory, isChecked) {
      let categories = [...this.initialProviderSelectedCategories]
      categories.push(selectedCategory)
      categories = categories.filter(category => category != selectedCategory || isChecked)
      this[UPDATE_INITIAL_PROVIDER_SELECTED_CATEGORIES]([...new Set(categories)])
    },
    /**
     * Updates selected categories for the second provider
     * @param {String} selectedCategory 
     * @param {Boolean} isChecked 
     */
    onUpdateSecondProviderSelectedCategories (selectedCategory, isChecked) {

      let categories = [...this.secondProviderSelectedCategories]
      categories.push(selectedCategory)
      categories = categories.filter(category => category != selectedCategory || isChecked)
      this[UPDATE_SECOND_PROVIDER_SELECTED_CATEGORIES]([...new Set(categories)])
    },
  },
  computed: {
    ...mapGetters({
      initialProvider: INITIAL_PROVIDER,
      secondProvider: SECOND_PROVIDER,
      initialProviderSelectedCategories: INITIAL_PROVIDER_SELECTED_CATEGORIES,
      secondProviderSelectedCategories: SECOND_PROVIDER_SELECTED_CATEGORIES,
    }),
  }
}
</script>