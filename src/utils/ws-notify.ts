/**
 * Socket.IO Notification Utility for MCP Server
 * 
 * Sends real-time notifications to connected clients via the Next.js API route.
 * This allows the MCP server to notify the editor of design changes.
 */

interface DesignChangeEvent {
    type: 'element_added' | 'element_updated' | 'element_deleted' | 'canvas_resized' | 'canvas_cleared' | 'design_updated' | 'full_sync';
    designId: string;
    timestamp: number;
    userId?: string;
    data: any;
}

class SocketNotifier {
    private apiUrl: string;

    constructor() {
        // Use the Next.js app URL for API calls
        this.apiUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || 'https://canvelete.com';
    }

    /**
     * Send a notification via the API route
     */
    private async notify(event: DesignChangeEvent): Promise<void> {
        try {
            const response = await fetch(`${this.apiUrl}/api/socket/emit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add internal API key for security
                    'X-Internal-Key': process.env.INTERNAL_API_KEY || 'internal-mcp-key',
                },
                body: JSON.stringify(event),
            });

            if (!response.ok) {
                logger.warn(`[SocketNotifier] Failed to send notification: ${response.status}`);
            } else {
                logger.debug(`[SocketNotifier] Sent: ${event.type} for design: ${event.designId.substring(0, 8)}`);
            }
        } catch (error) {
            // Silently fail - real-time sync is best-effort
            logger.warn('[SocketNotifier] Error sending notification', error);
        }
    }

    /**
     * Notify that an element was added
     */
    async notifyElementAdded(designId: string, element: any, userId?: string): Promise<void> {
        await this.notify({
            type: 'element_added',
            designId,
            timestamp: Date.now(),
            userId,
            data: element,
        });
    }

    /**
     * Notify that an element was updated
     */
    async notifyElementUpdated(designId: string, elementId: string, updates: any, userId?: string): Promise<void> {
        await this.notify({
            type: 'element_updated',
            designId,
            timestamp: Date.now(),
            userId,
            data: { elementId, updates },
        });
    }

    /**
     * Notify that an element was deleted
     */
    async notifyElementDeleted(designId: string, elementId: string, userId?: string): Promise<void> {
        await this.notify({
            type: 'element_deleted',
            designId,
            timestamp: Date.now(),
            userId,
            data: { elementId },
        });
    }

    /**
     * Notify that the canvas was resized
     */
    async notifyCanvasResized(designId: string, width: number, height: number, userId?: string): Promise<void> {
        await this.notify({
            type: 'canvas_resized',
            designId,
            timestamp: Date.now(),
            userId,
            data: { width, height },
        });
    }

    /**
     * Notify that the canvas was cleared
     */
    async notifyCanvasCleared(designId: string, userId?: string): Promise<void> {
        await this.notify({
            type: 'canvas_cleared',
            designId,
            timestamp: Date.now(),
            userId,
            data: {},
        });
    }

    /**
     * Notify a full design sync
     */
    async notifyFullSync(designId: string, designData: any, userId?: string): Promise<void> {
        await this.notify({
            type: 'full_sync',
            designId,
            timestamp: Date.now(),
            userId,
            data: designData,
        });
    }
}

// Export singleton instance
export const wsNotifier = new SocketNotifier();
