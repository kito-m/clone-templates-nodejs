[<img src="https://cdn.docubee.app/static/docubee-logo.png" width="600"/>](https://docubee.app/signup?source=eSigApi)

# Cloning Docubee Templates to a New Workspace

## Docubee API Sample

### Summary

Using the Docubee API, you can export workflow templates from a primary workspace and import them into a new one. This allows for provisioning of similar workspaces based on a known source.

### API Documentation

Detailed documentation for the Docubee API is available at [docs.docubee.app](https://docs.docubee.app)

The specific endpoints used in this sample are:

- [List Templates](https://docs.docubee.app/?javascript#list)
- [Create New Template](https://docs.docubee.app/?javascript#create-new)
- [Export Template](https://docs.docubee.app/?javascript#export)
- [Import Template](https://docs.docubee.app/?javascript#import)

### Preparation

- Two workspaces exist in Docubee, Source Workspace, which has the existing workflow template(s) to copy and Destination Workspace, which you would like to clone the template(s) to.

- An API key is generated for each workspace with at least the Manage Templates and List Templates permissions. These will be referred to as sourceToken and destToken.

- The following two environment variables are then set using the generated keys:
    - For the Source Workspace token, set: SOURCE_WORKSPACE_API_TOKEN
    - For the Destination Workspace token, set: DEST_WORKSPACE_API_TOKEN

### Usage
```bash
# With environment variables already set
$ node clone
```
or

```bash
$ SOURCE_WORKSPACE_API_TOKEN=your_source_token DEST_WORKSPACE_API_TOKEN=your_dest_token node clone
```

