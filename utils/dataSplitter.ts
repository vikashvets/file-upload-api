export const splitBase64Header = (data: string) => data.split('base64,')[1];

export const splitDataTypeHeader = (data: string) => data.split('/')[1];