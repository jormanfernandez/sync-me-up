<template>
  <div class="card">
    <div class="logo-section">
      <div class="logo">
        <img :src="provider.logo"/>
      </div>
      <h5>{{ provider.name }}</h5>
    </div>
    <div class="description-section">
      <p>These {{ provider.name }} contacts will sync to {{ secondProviderName }}</p>
    </div>
    <div class="dropdown-section">
      <Dropdown
        dropdownLabel="All contacts"
        :values="contactCategories"
        :onOptionClicked="onCategoryChanged"
      />
    </div>
  </div>
</template>
<script>
import Dropdown from "@/components/Dropdown.vue"

export default {
  name: "Card",
  props: {
    provider: {
      required: true,
      type: Object,
    },
    secondProviderName: {
      required: true,
      type: String,
    },
    selectedCategories: {
      required: true,
      type: Array,
    },
    onCategoryChanged: {
      required: true,
      type: Function,
    }
  },
  components: {
    Dropdown
  },
  computed: {
    /**
     * Reads all the possible categories a provider might have in their contacts and
     * returns them as an array
     * @return {Array<Object>}
     */
    contactCategories () {
      const categories = [...new Set(this.provider.contacts.map(contact => contact.category))].map(category => ({
        name: category,
        id: category,
        isChecked: this.selectedCategories.includes(category) ?? false,
      }))
      return categories
    },
  },
}
</script>