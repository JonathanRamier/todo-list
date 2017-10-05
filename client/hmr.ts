import 'rxjs/add/operator/take';
import { Store } from '@ngrx/store';
import { NgModuleRef, ApplicationRef } from '@angular/core';
declare function require(moduleName: string);


export let persistedState: any = undefined;
export function replaceModule(boot: () => Promise<any>, module: any) {
    persistedState = !!module.hot.data && module.hot.data.persistedState
        ? module.hot.data.persistedState
        : persistedState;
    const hmr = require('@angularclass/hmr');
    let ngModule: NgModuleRef<any>;
    module.hot.accept();
    boot().then((mod) => ngModule = mod);
    module.hot.dispose((data) => {
        const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
        const store: Store<any> = ngModule.injector.get(Store);
        // read/save current state
        store.take(1).subscribe((s: any) => {
            persistedState = s;
            data.persistedState = s;
        });
        const elements = appRef.components.map((c) => c.location.nativeElement);
        const makeVisible = hmr.createNewHosts(elements);
        ngModule.destroy();
        makeVisible();
    });
}
