<template>
    <div class="vertical-center">
        <Header/>
        <div class="inner-block">
            <div class="vue-tempalte">
                <form>
                    <h3>Sign up</h3>
                    <div class="form-group">
                        <label>Email address</label>
                        <input type="email" name="user_name" v-model="user_name" class="form-control form-control-lg" />
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" pattern=".{6,}"  required title="6 characters minimum" name="password" v-model="password" class="form-control form-control-lg" />
                    </div>
                    <div class="form-group">
                        <label>Company name</label>
                        <input type="company" pattern=".{3,}"  required title="3 characters minimum" name="company_name" v-model="company_name" class="form-control form-control-lg" />
                    </div>
                    <button @click='createUser()' class="btn btn-dark btn-lg btn-block">Create</button>
                    <!-- <p class="forgot-password text-right mt-2 mb-4">
                        <router-link to="/forgot-password">Forgot password ?</router-link>
                    </p> -->
                    <div class="social-icons">
                        <ul>
                            <li><a @click="googlesignup()" href="#"><i class="fa fa-google"></i></a></li>
                        </ul>
                    </div>
                    <p class="forgot-password text-right">
                        Already registered? 
                        <router-link :to="{name: 'login'}">Sign in</router-link>
                    </p>
                    <div class="text">
                        {{messagetouser}}
                        </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import {createUser} from '../services/UserService'
import Header from './HeaderSign.vue'
export default {
  name: 'signup',
  components: {
    Header
  },
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
          const payload = {
              user_name: this.user_name,
              password: this.password,
              company_name: this.company_name
          }
        if(this.validInput()){
            createUser(payload).then(response => {
                console.log(response);
                this.messagetouser = response.message;
                if(response.user){
                    localStorage.setItem("user-info",JSON.stringify(response.user));
                    this.$router.push({name:'home'});
                }
            });
            this.clearForm();
        }
        else{
            this.messagetouser = 'please enter valid username and password';
        }
      },
      clearForm() {
          this.user_name = "";
          this.password = "";
          this.company_name = "";
      },
      validInput(){
        if(this.user_name.length>1 &&this.user_name.search('@')>0 && this.password.length>5 && this.company_name.length>2){
            return true;
        }
        return false;
    },
    async googlesignup() {
      const googleUser = await this.$gAuth.signIn();
      this.user_name=googleUser.getBasicProfile().Bv;
      this.password=googleUser.getId();
      this.company_name=googleUser.getBasicProfile().tf;
      this.createUser();
    },
  },
  mounted(){
      let user = localStorage.getItem('user-info');
      if(user){
          this.$router.push({name:'home'});
      }
  }
}
</script>