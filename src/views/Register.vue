<template>
  <main role="main">
    <div class="notes py-5 bg-light">
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col text-center">
            <form
              class="form-signin"
              v-on:submit.prevent="register"
            >
              <p class="mb-5"><span class="text-logo">Notes</span></p>

              <h1 class="h3 mb-3 font-weight-normal">Please register</h1>
              <label
                for="inputName"
                class="sr-only"
              >Name</label>
              <input
                type="text"
                id="inputName"
                class="form-control"
                placeholder="Name"
                required
                autofocus
                v-model="name"
              >
              <label
                for="inputEmail"
                class="sr-only"
              >Email address</label>
              <input
                type="email"
                id="inputEmail"
                class="form-control"
                placeholder="Email address"
                required
                autofocus
                v-model="email"
              >
              <label
                for="inputPassword"
                class="sr-only"
              >Password</label>
              <input
                type="password"
                id="inputPassword"
                class="form-control"
                placeholder="Password"
                required
                autocomplete="off"
                v-model="password"
              >
              <button
                class="btn btn-lg btn-primary btn-block"
                type="submit"
              >Register</button>
              <p class="mt-5 mb-3 text-muted">&copy; 2019</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>

export default {
  data () {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    register: function () {
      this.$store.dispatch("registerUser", {
        name: this.name,
        email: this.email,
        password: this.password
      })
        .then((response) => {
          this.$router.push({ name: 'login' })
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }
};
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="text"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.form-signin .text-logo {
  background-color: #343a40;
  color: #ffffff;
  border-radius: 10px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 50px;
  font-weight: 900;
  width: 50px;
  height: 50px;
  padding: 10px;
}
</style>
