const baseUrl = 'https://docubee.app/api/v2';

const sourceToken = "SOURCE_WORKSPACE_API_TOKEN";
const destToken = "DEST_WORKSPACE_API_TOKEN";

const cloneTemplate = async (sourceToken, destToken, templateId) => {
  const getTemplateListResponse = await fetch(`${baseUrl}/workflowTemplates/${templateId}`, {
    headers: {
      Authorization: sourceToken
    }
  });

  const createTemplateResponse = await fetch(`${baseUrl}/workflowTemplates`, {
    body: JSON.stringify({}),
    headers: {
      Authorization: destToken,
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });
  const { templateId: clonedTemplateId } = await createTemplateResponse.json();

  await fetch(`${baseUrl}/workflowTemplates/${clonedTemplateId}?publish=true`, {
    body: getTemplateListResponse.body,
    headers: {
      Authorization: destToken, 
      'Content-Type': 'application/ontask'
    },
    method: 'PUT',
    duplex: 'half'
  });

  return { dest: clonedTemplateId, source: templateId };
};

const cloneAllTemplates = async (sourceToken, destToken) => {
  const response = await fetch(`${baseUrl}/workflowTemplates`, {
    headers: {
      Authorization: sourceToken
    }
  });
  const sourceTemplates = await response.json();
  const results = await Promise.all(sourceTemplates.map(({ templateId }) => cloneTemplate(sourceToken, destToken, templateId)));
  return results;
};


(async () => {
  const results = await cloneAllTemplates(sourceToken, destToken);
  results.forEach(({ dest, source }) => {
    console.log(`Cloned template ${source} to ${dest}`);
  });
})();
