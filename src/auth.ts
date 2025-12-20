
import { CanveleteClient } from './api-client.js';

export interface AuthContext {
    apiClient: CanveleteClient;
    apiKey: string;
}

/**
 * Authenticate request by creating an API client
 * Key validation happens when the first request is made
 */
export async function authenticateApiKey(apiKey: string): Promise<AuthContext> {
    if (!apiKey) {
        throw new Error('API key is required');
    }

    const apiClient = new CanveleteClient(apiKey);

    // Optional: Make a lightweight request to verify the key immediately?
    // For now, we'll let the first tool call fail if the key is invalid
    // to avoid overhead on every tool initialization if they are cached.
    // Ideally, we could call apiClient.getUserProfile() here if it exists.

    return {
        apiClient,
        apiKey
    };
}

/**
 * Check if user has permission for a specific action
 * Permission checking is now delegated to the API
 */
export async function checkPermission(
    auth: AuthContext,
    resource: string,
    action: string
): Promise<boolean> {
    // We assume true here and let the API reject with 403 if unauthorized
    return true;
}

/**
 * Verify user owns a resource
 * Ownership verification is now delegated to the API
 */
export async function verifyOwnership(
    auth: AuthContext,
    resourceType: 'design' | 'asset',
    resourceId: string
): Promise<boolean> {
    // We assume true here and let the API reject with 403 or 404 if unauthorized
    return true;
}
