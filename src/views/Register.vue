<template>
  <v-container grid-list-md fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Sign Up</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="submitForm" id="register">
              <v-text-field
                v-model="email"
                prepend-icon="alternate_email"
                name="email"
                label="Email address *"
                type="text"
                @change="$v.email.$touch()"
                @blur="$v.email.$touch()"
                :error-messages="emailErrors"
              ></v-text-field>
              <v-text-field
                v-model="displayName"
                prepend-icon="person"
                name="displayName"
                label="Name *"
                hint="Ej: María Rodriguez"
                type="text"
                maxlength="40"
                @change="$v.displayName.$touch()"
                @blur="$v.displayName.$touch()"
                :error-messages="displayNameErrors"
              ></v-text-field>
              <v-text-field
                v-model="password"
                @click:append="show = !show"
                prepend-icon="lock"
                :append-icon="show ? 'visibility' : 'visibility_off'"
                :type="show ? 'text' : 'password'"
                name="password"
                label="Password *"
                id="password"
                :hint="passwordStrength"
                :loading="focus"
                @focus="focus = true"
                @blur="written ? '' : (focus = false)"
                @change="$v.password.$touch()"
                :error-messages="passwordErrors"
              >
                <template v-slot:progress>
                  <v-progress-linear
                    v-if="focus"
                    :value="progress"
                    :color="color"
                    height="3"
                  ></v-progress-linear>
                </template>
              </v-text-field>
              <v-text-field
                v-model="passwordVerify"
                @click:append="show = !show"
                prepend-icon="lock"
                :append-icon="show ? 'visibility' : 'visibility_off'"
                :type="show ? 'text' : 'password'"
                name="passwordVerify"
                label="Repeat password *"
                @change="$v.passwordVerify.$touch()"
                @blur="$v.passwordVerify.$touch()"
                :error-messages="passwordVerifyErrors"
              ></v-text-field>
            </v-form>
            <div class="account-actions mt-1">
              <router-link
                to="/login"
                :class="{
                  'no-underline': true,
                  'blue--text': true,
                  'text--darken-1': theme == 'light',
                  'text--lighten-2': theme == 'dark'
                }"
                >I already have an account</router-link
              ><br />
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :loading="loading"
              :disabled="loading"
              type="submit"
              color="primary"
              form="register"
              v-blur
            >
              <v-icon left>person_add</v-icon>
              SIGN UP
            </v-btn>
          </v-card-actions>
          <SocialLogin />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import database from "@/database";
import SocialLogin from "@/components/SocialLogin";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs
} from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  components: {
    SocialLogin
  },
  data: () => ({
    show: false,
    email: "",
    displayName: "",
    password: "",
    passwordVerify: "",
    loading: false,
    focus: false
  }),
  validations: {
    email: { required, email },
    displayName: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(40)
    },
    password: { required, minLength: minLength(6) },
    passwordVerify: { required, sameAs: sameAs("password") }
  },
  methods: {
    submitForm() {
      this.$v.$touch();
      console.log("test");
      if (this.$v.$invalid) return;

      this.loading = true;

      database
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.loading = false;
          this.$router.push("/login");
        });
    }
  },
  computed: {
    ...mapGetters(["theme"]),
    progress() {
      return Math.min(100, this.password.length * 7);
    },
    color() {
      return ["error", "warning", "success"][Math.floor(this.progress / 40)];
    },
    passwordStrength() {
      return this.color == "success"
        ? "Security level: high"
        : this.color == "warning"
        ? "Security level: medium"
        : "Password must be 6 characters long or more";
    },
    written() {
      return this.password.length > 0;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Email address not valid");
      !this.$v.email.required && errors.push("This is a mandatory field");
      return errors;
    },
    displayNameErrors() {
      const errors = [];
      if (!this.$v.displayName.$dirty) return errors;
      !this.$v.displayName.minLength &&
        errors.push("Name must be 4 characters long or more");
      !this.$v.displayName.maxLength &&
        errors.push("Name should not be 40 characters long or more");
      !this.$v.displayName.required && errors.push("This is a mandatory field");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password must be 6 characters long or more");
      !this.$v.password.required && errors.push("This is a mandatory field");
      return errors;
    },
    passwordVerifyErrors() {
      const errors = [];
      if (!this.$v.passwordVerify.$dirty) return errors;
      !this.$v.passwordVerify.sameAs &&
        errors.push("Passwords don't match");
      !this.$v.passwordVerify.required &&
        errors.push("This is a mandatory field");
      return errors;
    }
  }
};
</script>
