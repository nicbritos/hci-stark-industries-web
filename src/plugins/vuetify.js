import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";
import "vuetify/src/styles/main.sass";
import Lightbulb from "@/components/icons/Lightbulb";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "md",
    values: {
      lightbulb: {
        component: Lightbulb
      }
    }
  },
  theme: {
    themes: {
      light: {
        primary: colors.blue.darken1, // #E53935
        secondary: "#37474F", // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
        blue: colors.blue.darken1,
        lightblue: colors.blue.lighten4,
        grey4: colors.grey.darken4,
        "inner-drawer": "#272727",
        "normal-drawer": "#393939"
      }
    }
  }
});
