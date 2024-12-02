export {};

declare global {
  interface Window {
    AndroidBridge?: {
      openCameraWithQuery: (query: string) => void;
    };

    handleProductInfo: (productName: string, storageMethod: string) => void;
    handleProductInfoError: (errorMessage: any) => void;
  }
}
