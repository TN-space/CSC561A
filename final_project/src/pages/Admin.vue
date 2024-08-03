<template>
  <q-page class="bg-grey-3 column">
    <div class="q-pa-md q-gutter-md">
      <q-list bordered separator class="bg-white rounded-borders">
        <q-item-label header>Current Waiting Queue</q-item-label>
        <!-- <LogoutButton /> -->
        <q-item
          v-for="user in CompletedUsers"
          :key="user.id"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar>
              <img src="~assets/generic_avatar.png" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">{{ user.name }}</q-item-label>
            <q-item-label caption lines="2">
              Reason
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <DateDiff :date="new Date(user.timestamp)" />
          </q-item-section>

          <q-item-section side>
            <q-btn
              color="negative"
              @click="reactivateUser(user)"
              label="Reactivate"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import DateDiff from 'components/DateDiff.vue';
import LogoutButton from 'components/LogoutButton.vue';
import { firestore }  from 'boot/firebase';

export default {
  components: {
    DateDiff
  },
  data() {
    return {
      users: []
    };
  },
  methods: {
    async initialize() {
      await firestore
        .collection('waiting_details')
        .where('active', '==', false)
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          this.users = snapshot.docs.map((doc) => {
            const user = doc.data();
            user.id = doc.id;
            return user;
          });
        });
    },
    async reactivateUser(user) {
      const updatedUser = { ...user, active: true };
      await firestore
        .collection('waiting_details')
        .doc(user.id)
        .update(updatedUser)
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    }
  },
  computed: {
    CompletedUsers: function () {
      return this.users.filter((status) => status.active == false);
    },
  },
  created() {
    this.initialize();
  }
};
</script>
