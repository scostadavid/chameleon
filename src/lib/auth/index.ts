import crypto from 'crypto';

export const generateToken = (salt: string, data: string) => {
  return crypto
      .createHmac('sha256', [salt, data].join('/'))
      .update(process.env.AUTH_SECRET)
      .digest('hex');
}