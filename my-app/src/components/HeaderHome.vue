<template>
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
      <div class="container">
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <a class="btn btn-outline-primary" v-on:click="logout">Log out</a>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script>
    console.log("I am in header!!!")
    export default {
        name: 'Header',
        methods: {
          logout() {
              localStorage.clear();
              this.$router.push({name:'signup'});
          }
        }
    }
</script>