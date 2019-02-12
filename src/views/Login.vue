<template>
  <main role="main">
    <div class="notes py-5">
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col text-center">

            <form
              class="form-signin"
              v-on:submit.prevent="login"
            >
              <p class="mb-5"><span class="text-logo">Notes</span></p>

              <ul
                v-if="validationErrors.length"
                class="alert alert-danger form-errors"
              >
                <li
                  v-for="(validationError, index) in validationErrors"
                  v-bind:key="index"
                >{{validationError}}</li>
              </ul>

              <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
              <label
                for="inputEmail"
                class="sr-only"
              >Email address</label>
              <input
                type="email"
                id="inputEmail"
                name="username"
                v-model="username"
                class="form-control"
                placeholder="Email address"
                autofocus
                autocomplete="on"
              >
              <label
                for="inputPassword"
                class="sr-only"
              >Password</label>
              <input
                type="password"
                id="inputPassword"
                name="password"
                v-model="password"
                class="form-control"
                placeholder="Password"
                autocomplete="on"
              >

              <button
                class="btn btn-lg btn-primary btn-block"
                type="submit"
              >Sign in</button>
              <p class="mt-5 mb-3 text-muted">&copy; 2019</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import formErrorHandler from '../mixins/formErrorHandler'
export default {
  mixins: [formErrorHandler],
  data () {
    return {
      username: "",
      password: "",
      validationErrors: [

      ]
    };
  },
  methods: {
    login: function () {
      this.validationErrors = []

      if (!this.username) {
        this.validationErrors.push("Username is required.")
      }

      if (!this.password) {
        this.validationErrors.push("Password is required.")
      }

      if (!this.validationErrors.length) {
        this.$store.dispatch("retrieveToken", {
          username: this.username,
          password: this.password
        })
          .then((response) => {
            this.$router.push({ name: 'dashboard' })
          })
          .catch((error) => {

            this.errorHandler(error, this.validationErrors)

          });
      }
    }
  },
  mounted () { }
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
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
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
.form-errors li {
  margin-left: 10px;
  text-align: left;
}
</style>
