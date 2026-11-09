import crypto from 'crypto';

// Simple hash for quick file identity checks
export const generateFileHash = (content) => {
  return crypto.createHash('sha256').update(content).digest('hex');
};