export const INVALID_IMPLEMENTATION = (suffix: string) => `Invalid Implementation: ${suffix}`;
export const INVALID_IMPLEMENTATION_ASYNC = INVALID_IMPLEMENTATION('Any extension of Async.Component ' + 
'requires an implementation of renderError, renderLoading, renderContent methods');
export const MISSING_STORE: string = 'Could not find store: Please make sure '
 + 'you have instantiated the Asynchro class with a valid store object';
export const MISSING_PROMISE: string = 'Promise not defined for Asynchronous component';
