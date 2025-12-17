import fetch, { RequestInit } from 'node-fetch';

/**
 * API Client for interacting with Canvelete API
 */
export class CanveleteClient {
    private baseUrl: string;
    private apiKey: string;

    constructor(apiKey: string, baseUrl?: string) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl || process.env.CANVELETE_API_URL || 'https://canvelete.com';

        // Remove trailing slash if present
        if (this.baseUrl.endsWith('/')) {
            this.baseUrl = this.baseUrl.slice(0, -1);
        }
    }

    private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
        const url = `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
        const headers = {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(options.headers || {}),
        };

        try {
            const response = await fetch(url, {
                ...options,
                headers,
            });

            if (!response.ok) {
                // Try to parse error message
                let errorMessage = `API Error: ${response.status} ${response.statusText}`;
                try {
                    const errorData = await response.json() as any;
                    if (errorData && errorData.error) {
                        errorMessage = errorData.error;
                    } else if (errorData && errorData.message) {
                        errorMessage = errorData.message;
                    }
                } catch (e) {
                    // Ignore JSON parse error
                }
                throw new Error(errorMessage);
            }

            // For 204 No Content
            if (response.status === 204) {
                return {} as T;
            }

            return await response.json() as T;
        } catch (error) {
            console.error(`Request failed: ${url}`, error);
            throw error;
        }
    }

    // --- Designs ---

    async getDesign(id: string) {
        return this.request<any>(`/api/designs/${id}`);
    }

    async listDesigns(page: number = 1, limit: number = 20, search?: string) {
        let query = `?page=${page}&limit=${limit}`;
        if (search) query += `&search=${encodeURIComponent(search)}`;
        return this.request<any>(`/api/designs${query}`);
    }

    async createDesign(data: any) {
        return this.request<any>('/api/designs', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateDesign(id: string, data: any) {
        return this.request<any>(`/api/designs/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async deleteDesign(id: string) {
        return this.request<any>(`/api/designs/${id}`, {
            method: 'DELETE',
        });
    }

    async duplicateDesign(id: string, name?: string) {
        return this.request<any>(`/api/designs/${id}/duplicate`, {
            method: 'POST',
            body: JSON.stringify({ name }),
        });
    }

    // --- Assets ---

    async listAssets(type?: string, page: number = 1) {
        let query = `?page=${page}`;
        if (type) query += `&type=${type}`;
        return this.request<any>(`/api/assets${query}`);
    }

    // --- Templates ---

    async listTemplates(category?: string, page: number = 1) {
        let query = `?page=${page}`;
        if (category) query += `&category=${category}`;
        return this.request<any>(`/api/templates${query}`);
    }
}
