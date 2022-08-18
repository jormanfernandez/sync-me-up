<template>
  <div class="transfer-button">
    <div :class="syncButtonClassName" @click="syncContacts">
      <div class="blue-arrow"></div>
      <div class="orange-arrow"></div>
    </div>
    <h5>{{ this.isSyncUpCompleted ? 'All done!' : 'Sync Contacts'}}</h5>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { IS_SYNC_UP_COMPLETED, SYNC_PROVIDERS_CONTACTS } from '@/utils/constants';

export default {
  name: "SyncUpButton",
  methods: {
    ...mapActions({
      syncProviders: SYNC_PROVIDERS_CONTACTS,
    }),

    syncContacts () {
      if (!this.isSyncUpCompleted) {
        this.syncProviders();
      }
    },

  },
  computed: {
    ...mapGetters({
      isSyncUpCompleted: IS_SYNC_UP_COMPLETED
    }),
    syncButtonClassName () {
      return ['button', {rotated: this.isSyncUpCompleted}]
    }
  }
}
</script>