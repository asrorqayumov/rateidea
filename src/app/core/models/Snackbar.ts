export enum SnackbarType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  INFO = 'INFO',
}

export const SnackbarColors = new Map([
  [SnackbarType.ERROR, { bgColor: 'bg-red-500' }],
  [SnackbarType.SUCCESS, { bgColor: 'bg-green-500' }],
  [SnackbarType.INFO, { bgColor: 'bg-blue-300' }],
]);

export interface SnackbarMessage {
  message: string;
  cancelText?: string;
  duration?: number;
  type: SnackbarType;
}
