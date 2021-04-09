<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="5">
        <v-card>
          <v-card-title>
            <span class="headline">Register</span>
          </v-card-title>
          <v-card-text>
            <form @submit.prevent="register">
              <v-text-field v-model="name" label="Name" required></v-text-field>
              <v-text-field v-model="email" label="E-mail" type="email" required></v-text-field>
              <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
              <v-btn color="blue darken-1" class="mr-4" type="submit">submit</v-btn>
              <v-btn color="blue darken-1" @click="clearForm">clear</v-btn>
            </form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "register",
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions({
      auth_register: "auth/register"
    }),
    register() {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      this.auth_register(data)
        .then(response => {
          console.log("Register success");
          console.log(response);
          this.clearForm();
        })
        .catch(err => {
          console.log(err);
        });
    },
    clearForm() {
      this.name = "";
      this.email = "";
      this.password = "";
    }
  }
};
</script>