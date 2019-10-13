<template>
  <v-app>
    <Loader :loading="loading" />
    <v-navigation-drawer
      :expand-on-hover="expandOnHover"
      value="true"
      permanent
      fixed
      app
      touchless
      dark
      stateless
      width="300"
    >
      <v-list class="list-title">
        <v-list-item>
          Stark Industries
        </v-list-item>
      </v-list>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          router
          :to="item.to"
          exact
          ripple
        >
          <v-list-item-action>
            <v-icon v-html="item.icon" />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
          <v-spacer />
        </v-list-item>

<!--        <v-list-group-->
<!--          v-for="(item, i) in expandableItems"-->
<!--          :key="800 + i + items.length + item.items.length"-->
<!--          ripple-->
<!--          :prepend-icon="item.icon"-->
<!--          dense-->
<!--          v-model="item.expanded"-->
<!--        >-->
<!--          <template v-slot:activator>-->
<!--            <v-list-item-content>-->
<!--              <v-list-item-title v-text="item.title" />-->
<!--            </v-list-item-content>-->
<!--          </template>-->

<!--          <v-divider v-if="item.expanded && item.items.length > 0"></v-divider>-->
<!--          <v-list-item-->
<!--            v-for="(expandableItem, j) in item.items"-->
<!--            :key="500 +(1 + i) * j + items.length"-->
<!--            router-->
<!--            :to="expandableItem.to"-->
<!--            exact-->
<!--            ripple-->
<!--            class="inner-drawer"-->
<!--          >-->
<!--            <v-list-item-action>-->
<!--              <v-icon-->
<!--                v-html="expandableItem.icon"-->
<!--                v-if="expandableItem.icon !== undefined"-->
<!--              />-->
<!--              <v-icon>-->
<!--                <v-img-->
<!--                  :src="expandableItem.image"-->
<!--                  v-if="expandableItem.image !== undefined"-->
<!--                ></v-img>-->
<!--              </v-icon>-->
<!--            </v-list-item-action>-->
<!--            <v-list-item-content>-->
<!--              <v-list-item-title v-text="expandableItem.title" />-->
<!--            </v-list-item-content>-->
<!--            <v-spacer />-->
<!--          </v-list-item>-->

<!--          <v-divider v-if="item.expanded && item.items.length > 0"></v-divider>-->
<!--        </v-list-group>-->

        <v-list-item
          v-for="(item, i) in items2"
          :key="i*30 + 909090"
          router
          :to="item.to"
          exact
          ripple
        >
          <v-list-item-action>
            <v-icon v-html="item.icon" />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
          <v-spacer />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar elevate-on-scroll app dark class="grey darken-3" dense>
      <v-app-bar-nav-icon
        v-blur
        v-if="!this.noBackButtonRoutes.includes(this.$router.currentRoute.name)"
        @click="this.upOneLevel"
      >
        <v-icon>arrow_back</v-icon>
      </v-app-bar-nav-icon>

      <v-text-field
        hide-details
        single-line
        class="ml-3"
        placeholder="Start typing to Search"
        v-model="searchText"
        clearable
        @keyup="ev"
      >
        <template v-slot:prepend>
          <v-icon color="blue" @click="applySearch()" >
            search
          </v-icon>
        </template>
      </v-text-field>

      <v-btn to="/login" light class="nav-btn ml-4" v-if="false" v-blur>
        <v-icon left>exit_to_app</v-icon>
        CONECTARME
      </v-btn>
      <v-btn to="/register" class="nav-btn" color="primary" v-if="false" v-blur
        ><v-icon left>person_add</v-icon> REGISTRARME</v-btn
      >
      <v-menu absolute v-if="true">
        <template v-slot:activator="{ on }">
          <v-btn id="profile-btn" icon  v-blur>
            <v-icon large>
              account_circle
            </v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item ripple >
            <v-icon v-html="'settings'" />
            <v-list-item-title v-text="'Configuración'" />
          </v-list-item>
          <v-list-item ripple @click="logOut">
            <v-icon v-html="'power_settings_new'" />
            <v-list-item-title v-text="'Cerrar sesión'" />
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <ErrorDialog :message="errorModel.message" :open="errorModel.openDialog" v-on:CloseErrorDialog="CloseErrorDialog" />
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
  import Loader from "@/components/Loader";
import { mapGetters } from "vuex";
import apiWrapper from "./data/apiWrapper";
import ErrorDialog from "./components/info_dialogs/ErrorDialog";


export default {
  name: "App",
  components: {
    ErrorDialog,
    Loader
  },

  data: () => ({
    Search:"",
    fixed: false,
    searchText: "",
    errorModel:{
      message:"",
      openDialog:false
    },
    noBackButtonRoutes: ["regions", "home", "login", "register", "about"],
    items: [
      { icon: "home", title: "Home", to: "/" },
      {
        icon: "layers",
        title: "Regions",
        to: "/regions"
      },
      { icon: "update", title: "Routines", to: "/routines" }
    ],
    items2: [
      { icon: "help", title: "About", to: "/about" }
    ],










    title: "Stark Industries"
  }),
  computed: {
    ...mapGetters([
      "loading",
      "loggedIn",
      "displayName",
      "stringID",
      "minWidth",
      "maxWidth",
      "ratingVisibility",
      "theme"
    ]),
    expandOnHover() {
      return this.minWidth(991);
    },
    mobile() {
      return this.minWidth(575);
    }
  },
  created() {
    localStorage.loggedIn = false; // Always set to false to prevent protected routes from being leaked.

    if (!localStorage.userPreferences) {
      localStorage.userPreferences = JSON.stringify({
        theme: "light"
      });
    }

    const { theme } = JSON.parse(localStorage.userPreferences);
    this.$store.dispatch("setTheme", theme);
    this.$store.dispatch("setWindowWidth");
    this.$store.state.loading = false;

  },
  mounted() {
    this.$store.watch(
      state => state.user.loggedIn,
      newValue => {
        localStorage.loggedIn = newValue;
      }
    );
  },


    showLoader() {
      this.$store.state.loading = true;
    },

  errorCaptured(err, vm, info){





    if(err === apiWrapper.ERRORS.NETWORK) {

      this.OpenErrorDialog("Conecction Error. Please reload this website");
    }
    else if (err === apiWrapper.ERRORS.BAD_REQUEST){

      this.OpenErrorDialog("There was an error trying to reach the API. Please reload the website");
    }
    return false;
  },
  methods:{

    applySearch(){

      this.$router.push({
        name:"Search",
        params:{
          query: this.searchText
        }
      });
    },
    upOneLevel() {
      if (
              this.$router.currentRoute.path.match("/regions/") &&
              this.$router.currentRoute.path.match("/room/")
      ) {
        this.$router.push("/regions");
      } else {
        let path = this.$router.currentRoute.path.substring(
                0,
                this.$router.currentRoute.path.lastIndexOf(
                        "/",
                        this.$router.currentRoute.path.length - 2
                )
        );
        if (path.length > 0) this.$router.push(path);
        else this.$router.push("/");
      }
    },
    logOut() {




    },
    ev(event){
      if(event.keyCode === 13){
        this.applySearch();
      }
    },
    OpenErrorDialog(msg){
      this.errorModel.openDialog = true;
      this.errorModel.message = msg;

    },
    CloseErrorDialog(){
      this.errorModel.openDialog = false;
      this.errorModel.message = "";

    },
    upOneLevel() {
      if (
              this.$router.currentRoute.path.match("/regions/") &&
              this.$router.currentRoute.path.match("/room/")
      ) {
        this.$router.push("/regions");
      } else {
        let path = this.$router.currentRoute.path.substring(
                0,
                this.$router.currentRoute.path.lastIndexOf(
                        "/",
                        this.$router.currentRoute.path.length - 2
                )
        );
        if (path.length > 0) this.$router.push(path);
        else this.$router.push("/");
      }
    },
    logOut() {




    },
  }

};
</script>

<style lang="scss">

  .expansionContainer{

    width: 90%;
  }
body {
  position: relative;
  background-color: #fafafa;
}

.nav-btn {
  height: 36px !important;
  margin-right: 1em !important;
}

#logo {
  width: 175px;
}

.v-menu__content {
  i {
    margin-right: 10px;
  }
}

.list-title {
  margin-bottom: -25px;
}

.v-chip.x-small {
  height: 18px;
  font-size: 11px;

  &.__content {
    padding: 0 8px;
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  bottom: 0px;
  opacity: 0;
}
</style>
