import { bootstrapApplication, createApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { createCustomElement } from '@angular/elements';
import { FederatedComponent } from '@org/federated-component';

export async function createOrgApplication(definitions: Record<string, string>) {

  //we're bootstrapping the app a little differently here, as we need to create the custom element for the federated component prior to bootstrapping the application's root component

  const app = await createApplication(appConfig);

  const federatedElement = createCustomElement(FederatedComponent, {
    injector: app.injector,
  });//create a custom element using the FederatedComponent and the app's injector

  customElements.define('org-federated-element', federatedElement);//define the custom element

  app.bootstrap(AppComponent);//bootstrap the app. We actually don't do this in our application, as we run out app strictly as a custom element, but for the sake of this example we don't need to do this

  // bootstrapApplication(AppComponent, appConfig).catch((err) =>
  //   console.error(err)
  // );

}


