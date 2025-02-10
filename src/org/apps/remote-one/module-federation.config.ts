import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'remote-one',
  exposes: {
    './Routes': 'apps/remote-one/src/app/remote-entry/entry.routes.ts',
    './Components': 'apps/remote-one/src/app/remote-entry/component-map.ts',
  },
};

export default config;
