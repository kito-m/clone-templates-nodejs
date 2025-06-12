[<img src="https://cdn.docubee.app/static/docubee-logo.png" width="600"/>](https://docubee.app/signup?source=eSigApi)

# Cloning Docubee Templates to a New Group

## Docubee API Sample

### Summary

Using the Docubee API, you can export workflow templates from a primary workspace and import them into a new one. This allows for provisioning of similar groups/workspaces based on a known source.

### API Documentation

Specifics about the Docubee API can be found in the official documentation at [docs.docubee.app](https://docs.docubee.app).

The specific endpoints used in this sample are:

- [List Templates](https://docs.docubee.app/?javascript#list)
- [Create New Template](https://docs.docubee.app/?javascript#create-new)
- [Export Template](https://docs.docubee.app/?javascript#export)
- [Import Template](https://docs.docubee.app/?javascript#import)

### Preparation

- Two groups exist in Docubee, `Source Group`, which has the existing workflow template(s) to copy and `Destination Group`, which you would like to clone the template(s) to.
- An API key is generated for each group with at least the `Manage Templates` and `List Templates` permissions. These will be referred to as `sourceToken` and `destToken`.

### Usage
npm install
node clone :sourceToken :destToken
```
