import * as crypto from 'crypto';

const isWebhookSignatureValid = (req: any, signatureSecret: string) => {
  const quidaxSignatureHeader: string = req.headers[
    'quidax-signature'
  ] as string;

  // t=1718806888,s=3f7ab69b380fbe344ea48cf67be33d73177f3d5ec3bc6fb919df525a62b1ef7d
  // console.log(quidaxSignatureHeader, "quidax header");
  // console.log(req.body, "body");

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
