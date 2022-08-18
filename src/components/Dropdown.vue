<template>
  <div class="dropdown">
    <div :class="allOptionsClassName" @click="toggleOptionsVisible">
      <i class="icon-checkmark"></i>{{ dropdownLabel }} <i :class="arrowIconClassName"></i>
    </div>
    <div class="options">
      <DropdownItem 
        v-for="item in values"
        :key="item.id"
        :itemId="item.id"
        :itemLabel="item.name"
        :isItemChecked="item.isChecked"
        @onOptionClicked="onOptionClicked"
      />
    </div>
  </div>
</template>
<script>
import DropdownItem from '@/components/DropdownItem.vue'
export default {
  props: {
    values: {
      type: Array,
      required: true,
    },
    dropdownLabel: {
      type: String,
      required: true,
    },
    onOptionClicked: {
      type: Function,
      required: false,
      default: () => {}
    },
  },
  name: "Dropdown",
  components: {
    DropdownItem
  },
  data: () => ({
    isOptionsOpen: false,
  }),
  methods: {
    /**
     * Toggles the visibility of all the options in the dropdown
     */
    toggleOptionsVisible () {
      this.isOptionsOpen = !this.isOptionsOpen
    },
  },
  computed: {
    arrowIconClassName () {
      return ["icon-arrow", {
        "flipped-down": this.isOptionsOpen
      }]
    },
    allOptionsClassName () {
      return ["all-options", {
        "hide": !this.isOptionsOpen
      }]
    },
  }
}
</script>