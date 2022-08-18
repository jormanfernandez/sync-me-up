<template>
  <div class="container">
    <SyncForm v-if="isFormLoaded"/>
  </div>
</template>

<script>
import SyncForm from "./components/SyncForm.vue"
import {  mapActions, mapGetters } from "vuex"
import { GET_PROVIDERS, IS_FORM_LOADED } from "@/utils/constants"

export default {
  name: "App",
  components: {
    SyncForm
  },
  methods: {
    ...mapActions({
      loadProviders: GET_PROVIDERS, 
    })
  },
  created () {
    /**
     * Loads the main providers to the store
     */
    this.loadProviders()
  },
  computed: {
    ...mapGetters({
      isFormLoaded: IS_FORM_LOADED,
    }),
  }
}
</script>
<style lang="scss">
.container {
  height: 100%;
  width: 100%;
  background-color: white;
  background-image: url("~@/assets/blob.svg");
  background-repeat: no-repeat;
  background-size: 715px;
  background-position-y: 40%;
  background-position-x: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>