<template>
  <div class="hello">
            <!-- <div class="col-md-6">
                <CreateUser :messagetouser="messagetouser" @createUser="userCreate($event)" />
            </div> -->
            <!-- <div class="col-md-6">
                <SignIn :messagetouser="messagetouser" @createUser="userCreate($event)" />
            </div> -->
                <Login :messagetouser="messagetouser" @createUser="userCreate($event)" />
          </div>
</template>

<script>
// import Header from './Header.vue'
//import CreateUser from './CreateUser.vue'
// import SignIn from './SIgnIn.vue'
import Login from './Login.vue'
import {createUser} from '../services/UserService'

export default {
  name: 'Dashboard',
  components: {
    // Header,
    //CreateUser,
    // SignIn,
    Login,
  },
data() {
  return {
    messagetouser: '',
  }
},
  methods: {
    userCreate(data) {
      console.log('data:::', data)
      createUser(data).then(response => {
        this.messagetouser = response;
      });
    }
  },
}
</script>