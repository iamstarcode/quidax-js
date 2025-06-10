import * as crypto from 'crypto';

const isWebhookSignatureValid = (req: any, signatureSecret: string) => {
  const quidaxSignatureHeader: string = req.headers[
    'quidax-signature'
  ] as string;

  const [timestampSection, signatureSection] = quidaxSignatureHeader.split(',');

  const [, timestamp] = timestampSection.split('=');

  const [, signature] = signatureSection.split('=');

  const requestBody = JSON.stringify(req.body);

  const payload = `${timestamp}.${requestBody}`;

  const createdSignature = crypto
    .createHmac('sha256', signatureSecret!)
    .update(payload)
    .digest()
    .toString('hex');

  if (signature === createdSignature) {
    return true;
  }

  return false;
};

export { isWebhookSignatureValid };
