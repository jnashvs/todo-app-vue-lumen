<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="5">
        <v-card>
          <v-card-title>
            <span class="headline">Login</span>
          </v-card-title>
          <v-card-text>
            <form @submit.prevent="login">
              <v-text-field v-model="email" label="E-mail" type="email" required></v-text-field>
              <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
              <div class="caption" v-if="message_error" v-text="message_error"></div>
              <v-btn color="blue darken-1" class="mr-4" type="submit">submit</v-btn>
            </form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  created() {
    //this.testing()
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
    ...mapState("auth", ["status"]),
    message_error() {
      if (this.status) return "Usernamae or passord wrog";
      return false;
    }
  },
  methods: {
    ...mapActions({
      auth_login: "auth/login"
    }),
    login() {
      let data = {
        email: this.email,
        password: this.password
      };

      this.auth_login(data)
        .then(response => {
          //this.$router.push({ name: "TodoList"})
          window.location.href = '/';
          console.log(response)
        })
        .catch(err => {
          this.error = 'Username or password is wrong'
          console.log(err.name)
        });

      //   this.$store
      //     .dispatch("login", data)
      //     .then(() => this.$router.push("/"))
      //     .catch(err => console.log(err));
    }
  }
};
</script>