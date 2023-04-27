import { createApp } from "vue";
import { createPinia } from "pinia";
import i18n from "./i18n";
import router from "./router";
import VueViewer from "v-viewer";

import App from "./App.vue";

//private libraries
import PortfolioWebapp from "./index";

// styles
import "./assets/styles/main.scss";

// tooltip
import VueTippy, { TippyPluginOptions } from "vue-tippy";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-toward-subtle.css";

//tooltip config
const tooltipOptions: TippyPluginOptions = {
    directive: "fbr-tooltip", // => v-tippy
    component: "fbr-tooltip", // => <tippy/>
    componentSingleton: "fbr-tooltip-singleton", // => <tippy-singleton/>,
    defaultProps: {
        allowHTML: true,
        animation: "shift-toward-subtle",
        arrow: false,
    }, // => Global default options * see all props
};

// app init
const app = createApp(App);

app.use(createPinia());
app.use(VueTippy, tooltipOptions);

//mount app utils - needs to be after store init and before routing
const portfolioWebapp = new PortfolioWebapp();
await portfolioWebapp.start();

app.use(router);

portfolioWebapp.afterRouterLoad(router);
app.provide("nfApp", portfolioWebapp);

app.use(i18n);
app.use(VueViewer);
app.config.globalProperties.productionTip = false;

app.mount("#app");
