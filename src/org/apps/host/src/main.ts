import { setRemoteDefinitions } from '@nx/angular/mf';

//create cache buster for module federation manifests. We have a different mechanism we use for this in our application, but for the sake of this example, using a random guid is sufficient
const id = crypto.randomUUID();

import('./mfe-manifest')
    .then((m) => m.getManifest(id))
    .then((manifest) => {
        setRemoteDefinitions(manifest);
        return manifest;
    })
    .then((manifest) => import('./bootstrap').then((bs) => bs.createOrgApplication(manifest)))


// import('./bootstrap').catch((err) => console.error(err));
