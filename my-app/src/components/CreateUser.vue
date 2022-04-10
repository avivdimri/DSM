<template>
  <div class="container">
    <div class="row">
        <div class="col-md-7 mrgnbtm">
        <h2>Sign-up</h2>
            <form>
                <div class="row">
                    <div class="form-group col-md-12">
                        <label htmlFor="exampleInputEmail1">User Name/Email</label>
                        <input type="text" class="form-control" v-model="user_name" name="user_name" id="email" aria-describedby="emailHelp" placeholder="Email" />
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label htmlFor="exampleInputEmail1">Company Name</label>
                        <input type="text" class="form-control" v-model="company_name" name="company_name" id="company_name" aria-describedby="emailHelp" placeholder="Company Name" />
                    </div>
                    <div class="form-group col-md-6">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="text" class="form-control" v-model="password" name="password" id="password" placeholder="Password" />
                    </div>
                </div>
                
                 <div class="text">
                {{messagetouser}}
                </div>
                <button type="button" @click='createUser()' class="btn btn-danger">Create</button>
            </form>
        </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'CreateUser',
  props: ['messagetouser'],
  data() {
    return {
      user_name: '',
      password: '',
      company_name: ''
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
          this.$emit('createUser', payload)
          this.clearForm();
      },
      clearForm() {
          this.user_name = "";
          this.password = "";
          this.company_name = "";
      }
  }
}
</script>