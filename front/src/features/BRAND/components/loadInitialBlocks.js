import React from 'react';
import ReactDOMServer from 'react-dom/server';

/*
function calculateJaccardSimilarity(text1, text2) {
    const set1 = new Set(text1.split(' '));
    const set2 = new Set(text2.split(' '));
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    return intersection.size / union.size;
}
 */

const loadInitialBlocks = (TemplateComponent) => {
    const blocks = [];
    const processedElements = new Set();

    const element = React.createElement(TemplateComponent);
    const htmlString = ReactDOMServer.renderToString(element);
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    const extractBlocks = (element, parentX = 0, parentY = 0) => {
        if (processedElements.has(element)) return;
        processedElements.add(element);

        const rect = element.getBoundingClientRect();
        const x = parentX + rect.left;
        const y = parentY + rect.top;

        if (element.classList.contains('ant-card') || element.tagName === 'P') {
            blocks.push({
                id: generateUniqueId(),
                type: getElementType(element),
                content: element.outerHTML,
                style: element.getAttribute('style'),
                className: element.className,
                x,
                y,
            });
        }

        for (const child of element.children) {
            extractBlocks(child, x, y);
        }
    };

    extractBlocks(doc.body);
    return blocks;
};

const getElementType = (element) => {
    if (element.classList.contains('ant-card')) return 'card';
    if (element.classList.contains('ant-carousel')) return 'carousel';
    if (element.classList.contains('ant-row')) return 'row';
    if (element.tagName === 'P') return 'text';
    return 'other';
};

const generateUniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

export default loadInitialBlocks;