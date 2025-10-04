import { toast } from 'sonner';

export function handleApiError(error: any, response?: Response) {
  // Network errors
  if (!response) {
    toast.error('Network Error', {
      description: 'Unable to connect to server. Please check your internet connection.',
    });
    return;
  }

  // Status-based errors
  switch (response.status) {
    case 400:
      toast.error('Validation Error', {
        description: error.message || 'Please check your input and try again.',
      });
      break;
    case 401:
      toast.error('Unauthorized', {
        description: 'Please login to continue.',
      });
      break;
    case 403:
      toast.error('Forbidden', {
        description: 'You do not have permission to perform this action.',
      });
      break;
    case 404:
      toast.error('Not Found', {
        description: 'The requested resource was not found.',
      });
      break;
    case 500:
      toast.error('Server Error', {
        description: 'Something went wrong on our end. Please try again later.',
      });
      break;
    default:
      toast.error('Error', {
        description: error.message || 'Something went wrong. Please try again.',
      });
  }
}

export function handleFormError(fieldErrors: Record<string, string[]>) {
  const firstError = Object.values(fieldErrors)[0]?.[0];
  if (firstError) {
    toast.error('Validation Error', {
      description: firstError,
    });
  }
}