import * as crypto from 'crypto';
import { IncomingMessage } from 'http';

export function isWebhookSignatureValid(
  req: IncomingMessage & { body?: unknown },
  signatureSecret: string
): boolean {
  const header = req.headers['quidax-signature'] as string | undefined;
  if (!header) return false;

  const [timestampSection, signatureSection] = header.split(',');
  if (!timestampSection || !signatureSection) return false;

  const [, timestamp] = timestampSection.split('=');
  const [, signature] = signatureSection.split('=');
  if (!timestamp || !signature) return false;

  const requestBody = JSON.stringify(req.body);
  const payload = `${timestamp}.${requestBody}`;

  const createdSignature = crypto
    .createHmac('sha256', signatureSecret)
    .update(payload)
    .digest()
    .toString('hex');

  return signature === createdSignature;
}
