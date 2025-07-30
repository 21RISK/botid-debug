// Example utility for client-side error handling
// This works in conjunction with hooks.client.ts

export class ClientErrorHandler {
  /**
   * Simulate an error for testing purposes
   */
  static simulateError(message: string = "Test error"): never {
    throw new Error(message);
  }

  /**
   * Handle async operations with proper error catching
   */
  static async handleAsync<T>(
    operation: () => Promise<T>,
    fallback?: T
  ): Promise<T | undefined> {
    try {
      return await operation();
    } catch (error) {
      console.error("Async operation failed:", error);
      // The error will be caught by hooks.client.ts handleError
      if (fallback !== undefined) {
        return fallback;
      }
      throw error;
    }
  }

  /**
   * Log client-side events (useful for debugging)
   */
  static logEvent(eventName: string, data?: unknown) {
    if (typeof window !== "undefined") {
      console.log(`[Client Event] ${eventName}:`, data);
    }
  }
}
