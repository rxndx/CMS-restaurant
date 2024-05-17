const dynamicImport = (templateName) => import(`../../src/features/BRAND/templates/${templateName}`);

export default dynamicImport;