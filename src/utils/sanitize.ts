export function sanitizeText(text: string | null | undefined): string {
  if (!text) return '';

  let sanitized = text;

  // Normalize newlines (handle Windows/Mac line endings)
  sanitized = sanitized.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Collapse multiple spaces to single space
  sanitized = sanitized.replace(/ +/g, ' ');

  // Collapse multiple tabs to single tab
  sanitized = sanitized.replace(/\t+/g, '\t');

  // Newlines: We accepts two newlines
  sanitized = sanitized.replace(/\n\n/g, '\n\n');

  // Collapse more than two newlines to single newline
  sanitized = sanitized.replace(/\n{3,}/g, '\n\n');

  // Simple SQL injection prevention (escaping single quotes)
  // Note: This is a basic measure. Parameterized queries should be used in the backend.
  sanitized = sanitized.replace(/'/g, "'");

  return sanitized.trim();
}
