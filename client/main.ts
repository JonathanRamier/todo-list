import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { replaceModule } from './hmr';

declare const module: any;

if (environment.production) {
    enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

if (environment.hmr && !environment.production && module.hot) {
    replaceModule(bootstrap, module);
} else {
    bootstrap();
}
