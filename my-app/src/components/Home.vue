<template>
     <div class="vertical-center">
        <Header/>
        <h1>Hello {{name}}, Welcome to our Delivery System</h1>
     </div>
</template>
<script>
import Header from './HeaderHome.vue'
export default{
   name:'home',
   components: {
    Header
  },
   data(){
       return{
           name:''
       }
   },
    mounted(){
      let user = localStorage.getItem('user-info');
      if(!user){
          this.$router.push({name:'signup'});
      }else{
          this.name = JSON.parse(user).company_name;
      }
      
  }
}
</script>
