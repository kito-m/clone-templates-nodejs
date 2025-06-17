// Get your free API Key at: https://www.docubee.com/solutions/integrations/docubee-api
// Full Docubee API Documentation: https://docs.docubee.app/#overview

const docubeeUrl = 'https://docubee.app/api/v2';

const sourceToken = process.env.SOURCE_WORKSPACE_API_TOKEN;
const destToken = process.env.DEST_WORKSPACE_API_TOKEN;

if (!sourceToken || !destToken) {
    console.error('Error - Invalid token(s): Please set SOURCE_WORKSPACE_API_TOKEN and DEST_WORKSPACE_API_TOKEN environment variables.');
    process.exit(1);
}

const cloneTemplate = async (sourceToken, destToken, templateId) => {
    const getTemplateListResponse = await fetch(`${docubeeUrl}/workflowTemplates/${templateId}`, {
        headers: {
            Authorization: sourceToken
        }
    });

    const createTemplateResponse = await fetch(`${docubeeUrl}/workflowTemplates`, {
        body: JSON.stringify({}),
        headers: {
            Authorization: destToken,
            'Content-Type': 'application/json'
        },
        method: 'POST'
    });
    const { templateId: clonedTemplateId } = await createTemplateResponse.json();

    await fetch(`${docubeeUrl}/workflowTemplates/${clonedTemplateId}?publish=true`, {
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
    const response = await fetch(`${docubeeUrl}/workflowTemplates`, {
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
