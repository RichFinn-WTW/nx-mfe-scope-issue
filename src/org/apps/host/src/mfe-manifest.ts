export function getManifest(cacheBuster: string) {

    //we load our remotes manifest this way for a few reasons...
    //1. We can dynamically generate the manifest based on logic added here, such as feature toggle evaluation
    //2. Cache busting can be added to remote references to prevent stale assets from being served by CDNs and without needing to purge those CDNs when a remote is released
    //3. Prevents a json-based manifest from being cached by CDNs


    const manifest: Record<string, string> = {}; 
  
    manifest["remote-one"] = `http://localhost:4201/remoteEntry.mjs?${cacheBuster}.mjs`;
  
    return manifest;
  
  }
  