// Input validation utilities
import { z } from 'zod';
import { ValidationError } from './errors.js';

/**
 * Validate input against a Zod schema
 */
export function validateInput<T>(schema: z.ZodSchema<T>, input: unknown): T {
    try {
        return schema.parse(input);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const messages = error.errors.map((err) => `${err.path.join('.')}: ${err.message}`);
            throw new ValidationError(`Validation failed: ${messages.join(', ')}`);
        }
        throw error;
    }
}

/**
 * Safely validate input and return result with errors
 */
export function safeValidateInput<T>(
    schema: z.ZodSchema<T>,
    input: unknown
): { success: true; data: T } | { success: false; error: string } {
    try {
        const data = schema.parse(input);
        return { success: true, data };
    } catch (error) {
        if (error instanceof z.ZodError) {
            const messages = error.errors.map((err) => `${err.path.join('.')}: ${err.message}`);
            return { success: false, error: messages.join(', ') };
        }
        return { success: false, error: String(error) };
    }
}
