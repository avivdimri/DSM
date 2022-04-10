<template>
    <div class="vue-tempalte">
        <form>
            <h3>Sign Up</h3>
            <div class="form-group">
                <label>Email address</label>
                <input type="email" name="user_name" v-model="user_name" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" v-model="password" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Company name</label>
                <input type="company" name="company_name" v-model="company_name" class="form-control form-control-lg" />
            </div>
             <button type="button" @click='createUser()' class="btn btn-dark btn-lg btn-block">Create</button>
            <!-- <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/forgot-password">Forgot password ?</router-link>
            </p> -->
            <div class="social-icons">
                <ul>
                    <li><a href="#"><i class="fa fa-google"></i></a></li>
                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                </ul>
            </div>
              <p class="forgot-password text-right">
                Already registered 
                <router-link :to="{name: 'login'}">sign in?</router-link>
            </p>
             <div class="text">
                {{messagetouser}}
                </div>
        </form>
    </div>
</template>
<script>
import {createUser} from '../services/UserService'
export default {
  //name: 'Login',
//   props: ['messagetouser'],
  data() {
    return {
      user_name: '',
      password: '',
      company_name: '',
      messagetouser: '',
    }
  },
  methods: {
      createUser() {
          console.log(this.user_name)
          const payload = {
              user_name: this.user_name,
              password: this.password,
              company_name: this.company_name
          }
        //   this.$emit('createUser', payload)
         createUser(payload).then(response => {
        this.messagetouser = response;
      });
          this.clearForm();
      },
      clearForm() {
          this.user_name = "";
          this.password = "";
          this.company_name = "";
      },
  }
}
</script>