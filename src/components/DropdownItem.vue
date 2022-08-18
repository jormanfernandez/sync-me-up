<template>
  <div class="dropdown-item">
    <input class="checkbox" :value="itemId" type="checkbox" @click="onOptionClicked" v-model="isItemCheckedValue" :id="checkboxId"/>
    <label :for="checkboxId">
      {{ itemLabel }}
    </label>
    <span></span>
  </div>
</template>
<script>
export default {
  props: {
    itemId: {
      type: String,
      required: true,
    },
    itemLabel: {
      type: String,
      required: true,
    },
    isItemChecked: {
      type: Boolean,
      required: false,
    },
  },
  name: "DropdownItem",
  methods: {
    /**
     * Dispatch an event to let the upper component know that an option has been selected
     */
    onOptionClicked () {
      this.$emit('onOptionClicked', this.itemId, !this.isItemChecked)
    }
  },
  computed: {
    checkboxId () {
      return `check${this._uid}`
    },
    isItemCheckedValue: {
      set () {return false},
      get () {
        return this.isItemChecked
      }
    }
  }
}
</script>