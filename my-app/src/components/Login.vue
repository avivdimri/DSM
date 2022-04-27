<template>
    <div class="vertical-center">
        <Header/>
        <div class="inner-block">
            <div class="vue-tempalte">
                <form>
                    <h3>Log in</h3>
                    <div class="form-group">
                        <label>Email address</label>
                        <input type="email" name="user_name" v-model="user_name" class="form-control form-control-lg" />
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" name="password" pattern=".{6,}"  required title="6 characters minimum" v-model="password" class="form-control form-control-lg" />
                    </div>
                    <button  @click="createUser()" class="btn btn-dark btn-lg btn-block">Login</button>
                    <!-- <p class="forgot-password text-right mt-2 mb-4">
                        <router-link to="/forgot-password">Forgot password ?</router-link>
                    </p> -->
                    
                    <div class="social-icons">
                        <ul>      
                            <li><a @click="googlelogin()" href="#"><i class="fa fa-google"></i></a></li>
                        </ul>
                    </div>
                    <p class="forgot-password text-right">
                        Don't have an account? 
                        <router-link :to="{name: 'signup'}">Sign up</router-link>
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
import {loginUser} from '../services/UserService'
import Header from './HeaderSign.vue'
export default {
  name: 'login',
  components: {
    Header
  },
//   props: ['messagetouser'],
  data() {
    return {
      user_name: '',
      password: '',
      messagetouser: '',
      isLogin: false,
    }
  },
  methods: {
    createUser() {
        const payload = {
            user_name: this.user_name,
            password: this.password,
        }
        if(this.validInput()){
            loginUser(payload).then(response => {
            this.messagetouser = response.message;
                if(response.user){
                    localStorage.setItem("user-info",JSON.stringify(response.user));
                    this.$router.push({name:'home'});
                }
            });
            this.clearForm();
        }else{
            this.messagetouser = 'please enter valid username and password';
        }
        
    },
    clearForm() {
        this.user_name = "";
        this.password = "";
    },
    validInput(){
        if(this.user_name.length>1 && this.password.length>5){
            return true;
        }
        return false;
    },
    async googlelogin() {
      const googleUser = await this.$gAuth.signIn();
      this.user_name=googleUser.getBasicProfile().Bv;
      this.password=googleUser.getId();
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