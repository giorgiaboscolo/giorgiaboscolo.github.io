import { HTTPClient } from './utils/base/HTTP';
import { Router } from 'vue-router';

export default class PortfolioWebapp {

    private http: HTTPClient = new HTTPClient();

    private apiLoaded = false;
    private authLoaded = false;

    public async start(){
        await this.setAPI();
    }

    public afterRouterLoad(routerIn: Router) { }

    private async setAPI(){
        if (this.apiLoaded) {
            return;
        }
        this.apiLoaded = true;
    }

}
