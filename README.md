# nx-mfe-scope-issue

This repository demonstrates the shared scope issue seen in module federation after nx version 19.4.4. We show a working example from pre nx version 19.5.0 (19.4.4) and then show the issue in the current version of nx (20.4.2), which is now consuming `"@nx/module-federation": "20.4.2"`

## Repository layout

There are two branches in the repository (aside from `main`):

- [nx-19.4.4](https://github.com/RichFinn-WTW/nx-mfe-scope-issue/tree/nx-19.4.4) (angular 18.0.0)
- [nx-20.4.2](https://github.com/RichFinn-WTW/nx-mfe-scope-issue/tree/nx-20.4.2) (angular 19.1.5)

Each branch name represents the version of nx that is used in that branch

> [!Note]
> The yarn package manager is used in this repository, which was originally configured using COREPACK

When switching from branch to branch, you should run `yarn cache clean` and `yarn` following the branch switch. 

> [!Note]
> You may see the error `Cannot find module '@babel/helper-environment-visitor'` when building one of the two angular applications after switching from `nx-19.4.4` to `nx-20.4.2`. If so, delete the `node_modules` folder, then run `yarn cache clean` and then `yarn`.

## Running the example

Each application should be run/served in a separate terminal with the context of the terminal set to `$\src\org\`

- terminal 1: `yarn nx serve host`
- terminal 2: `yarn nx serve remote-one`

After running the above commands, navigate to http://localhost:4200/

## NX 19.4.4

When viewing the application at http://localhost:4200/ using the nx-19.4.4 branch, you should see the `SimpleComponent` being rendered at the top of the page

![image](https://github.com/user-attachments/assets/91f074bf-b153-4ab1-95de-0f4b6ba79234)

## NX 20.4.2

When viewing the application at http://localhost:4200/ using the nx-20.4.2 branch, the SimpleComponent is not rendered.

![image](https://github.com/user-attachments/assets/2a83bf06-64b3-49c4-a38e-ba0fa348e20a)

In DevTools, you should see the following error:

```text
Error: Call setRemoteDefinitions or setRemoteUrlResolver to allow Dynamic Federation to find the remote apps correctly.
```

![image](https://github.com/user-attachments/assets/f695c9be-bb05-4c8b-845c-911fda8bdb51)

## Federated Component/Element

For our application, we use a component exposed via Angular Elements that allows us to dynamically and generically load individual components from remotes. We call this Element the 'Federated Element'.

Each remote contains a file in the `remote-entry` directory named `component-map` that acts as a key/value pair collection that enables mapping a string component name key to a component type value. The ComponentMap is then added as an exposed module named `Components` in the remote's `ModuleFederationConfig` located in `src\org\apps\remote-one\module-federation.config.ts`. The component name key from the ComponentMap, along with the remote name, are set as properties of the Element (web component) that is added to a page. These property values then allow us to use the `loadRemoteModule` method in the Federated Component to fetch the `Components` module from the remote, obtain the component type, then dynamically create the remote component using a `ViewContainerRef` in the Federated Component using `this.viewContainer.createComponent(componentType)`.

The code for the Federated Component the Federated Element is derived from is located here: `src\org\libs\federated-component\src\lib\federated-component\federated-component.component.ts`

The Angular Element is defined in the `src\org\apps\host\src\bootstrap.ts` file, which is called from `src\org\apps\host\src\main.ts` using the NX [Dynamic Module Federation](https://nx.dev/recipes/angular/dynamic-module-federation-with-angular) pattern.

When added to a page, the Federated Element looks like this:

```html
<org-federated-element id="SimpleComponent2323" remote-name="remote-one" component="SimpleComponent"></org-federated-element>
```

The Federated Element in this example is located here: `src\org\apps\host\src\index.html`. Notice that it is a sibling of the `app-root` component.

Multiple Federated Elements can be added to a page, and even be nested, which due to the angular application's EnvironmentInjector allows all elements to be part of the same application scope. We can even share state, services, and dependencies between elements, as they are all using the same injector.

In nx 19.4.4, this component/element was working fine. With the introduction of `@nx/module-federation`, this component no longer works and we see the error `Call setRemoteDefinitions or setRemoteUrlResolver to allow Dynamic Federation...`

To resolve this error and still upgrade to the latest version of nx and angular, we took the following steps in package.json:

- set `"@nx/angular": "19.4.4"`
- set `"@nx/webpack": "19.4.4"`
- removed: `@nx/module-federation`

This works, for now, but we'd like to stay on the proper track for nx as well as module-federation
