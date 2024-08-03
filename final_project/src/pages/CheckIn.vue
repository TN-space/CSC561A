<template>
  <q-page class="bg-grey-3 column">
    

    <div class="q-pa-md q-gutter-md">
      <q-list bordered separator class="bg-white rounded-borders">
        <q-item-label header>Current Waiting Queue</q-item-label>

        <q-item
          v-for="user in ActiveUsers"
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
              color="positive"
              @click="toCompleteUser(user)"
              label="Complete"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import DateDiff from 'components/DateDiff.vue';
import { db } from 'boot/firebase';

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
      await db
        .collection('waiting_details')
        .where('active', '==', true)
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          this.users = snapshot.docs.map((doc) => {
            const user = doc.data();
            user.id = doc.id;
            return user;
          });
        });
    },
    async toCompleteUser(user) {
      const updatedUser = { ...user, active: false };
      await db
        .collection('waiting_details')
        .doc(user.id)
        .update(updatedUser)
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    }
  },
  computed: {
    ActiveUsers: function () {
      return this.users.filter((status) => status.active == true);
    },
  },
  created() {
    this.initialize();
  }
};
</script>
