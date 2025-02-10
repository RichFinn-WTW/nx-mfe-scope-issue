import { Component, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loadRemoteModule } from '@nx/angular/mf';

@Component({
    selector: 'lib-federated-component',
    imports: [CommonModule],
    templateUrl: './federated-component.component.html',
    styleUrl: './federated-component.component.css'
})
export class FederatedComponent implements OnInit {
  @Input()
  id = '';

  @Input()
  remoteName = '';

  @Input()
  component = '';

  @Input()
  pagedataobject = '';

  @Input()
  module = './Components';

  @ViewChild('placeHolder', { read: ViewContainerRef, static: true })
  viewContainer: ViewContainerRef;

  private remoteComponentRef: ComponentRef<any>;

  @Input()
  customProperties: { [key: string]: unknown };

  private componentLoaded = false;
  private foundRemote = false;

  async ngOnInit() {

    if (this.id == '') {
      throw new Error('federated component: id must be provided');
    }

    if (this.component == '') {
      throw new Error('federated component: component name must be provided');
    }

    if (this.remoteName == '') {
      throw new Error('federated component: remote name must be provided');
    }

        await loadRemoteModule(this.remoteName, this.module)
          .then((m) => {
            // console.log(m) //uncomment this to see what comes back in the remote entry module in devtools
            this.foundRemote = true;
            const componentMap = m['entryComponentsMap'];
            this.viewContainer.clear();

            const componentType = componentMap[this.component];

            try {
              this.remoteComponentRef = this.viewContainer.createComponent(componentType); //create a component of the type specified in the placeholder
              //for other examples of how the concept of a federated component can be created, check out this component:
              //https://github.com/module-federation/module-federation-examples/blob/edee4b53542b58c26213da6bc9e3cd01ec92a9c1/angular15-microfrontends-lazy-components/projects/mdmf-shell/src/app/shell/components/federated/federated.component.ts
            } catch (e) {
              console.error(e);
              throw new Error(
                'federated component: unable to create ' + this.component + ' federated component with ID: ' + this.id + '. Check that the component name is correct and that the component is exported in the remote module'
              );
            }

            if (this.pagedataobject != '') {
              this.customProperties = window[this.pagedataobject];
            }

            //populate pass-through properties in the remote component
            for (const property in this.customProperties) {
              this.remoteComponentRef.instance[property] = this.customProperties[property];
            }

            this.componentLoaded = true;
            return m;
          })
          .catch((e) => {
            throw e; //throw the *actual* error, do not wrap it in a new error or mask it with a message that doesn't tell the developer what the actual error is
          })
  }
}

