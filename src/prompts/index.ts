// Prompts for MCP server
import type { Prompt } from '@modelcontextprotocol/sdk/types.js';

export const createSocialPostPrompt: Prompt = {
    name: 'create_social_post',
    description: 'Create a social media post design',
    arguments: [
        { name: 'platform', description: 'Social media platform (instagram, facebook, twitter, linkedin)', required: true },
        { name: 'message', description: 'The main message or text for the post', required: false },
    ],
};

export const createPresentationPrompt: Prompt = {
    name: 'create_presentation',
    description: 'Create a presentation slide design',
    arguments: [
        { name: 'title', description: 'Slide title', required: true },
        { name: 'content', description: 'Slide content or bullet points', required: false },
    ],
};

export const addTextPrompt: Prompt = {
    name: 'add_text_element',
    description: 'Add a text element to an existing design',
    arguments: [
        { name: 'designId', description: 'The ID of the design to add text to', required: true },
        { name: 'text', description: 'The text content to add', required: true },
        { name: 'fontSize', description: 'Font size in pixels (default: 32)', required: false },
    ],
};

export const createCertificatePrompt: Prompt = {
    name: 'create_certificate',
    description: 'Create a premium award certificate design',
    arguments: [
        { name: 'recipient', description: 'Name of the award recipient', required: true },
        { name: 'awardTitle', description: 'Title of the award', required: true },
        { name: 'date', description: 'Date of the award', required: false },
        { name: 'issuer', description: 'Name of the issuing organization', required: false },
    ],
};

export function getPromptContent(promptName: string, args: Record<string, string>): string {
    switch (promptName) {
        case 'create_social_post':
            return getSocialPostContent(args);
        case 'create_presentation':
            return getPresentationContent(args);
        case 'add_text_element':
            return getAddTextContent(args);
        case 'create_certificate':
            return getCertificateContent(args);
        default:
            return '';
    }
}

function getSocialPostContent(args: Record<string, string>): string {
    const dimensions = getDimensionsForPlatform(args.platform);
    return `Create a ${args.platform} post design (${dimensions.width}x${dimensions.height}px) with message: "${args.message || 'Your message here'}"`;
}

function getPresentationContent(args: Record<string, string>): string {
    return `Create a presentation slide (1920x1080) with title: "${args.title}" and content: "${args.content || ''}"`;
}

function getAddTextContent(args: Record<string, string>): string {
    return `Add text "${args.text}" to design ${args.designId} with fontSize ${args.fontSize || '32'}`;
}

function getCertificateContent(args: Record<string, string>): string {
    return `Create a certificate for "${args.recipient}" with title "${args.awardTitle}"`;
}

function getDimensionsForPlatform(platform: string): { width: number; height: number } {
    const dimensions: Record<string, { width: number; height: number }> = {
        instagram: { width: 1080, height: 1080 },
        facebook: { width: 1200, height: 630 },
        twitter: { width: 1200, height: 675 },
        linkedin: { width: 1200, height: 627 },
    };
    return dimensions[platform?.toLowerCase()] || { width: 1080, height: 1080 };
}

export const allPrompts = [createSocialPostPrompt, createPresentationPrompt, addTextPrompt, createCertificatePrompt];
