export const parseFormDataArrays = (req, res, next) => {
  for (const [key, value] of Object.entries(req.body)) {
    // Check if the value "looks like" an array
    if (
      typeof value === 'string' &&
      value.trim().startsWith('[') &&
      value.trim().endsWith(']')
    ) {
      try {
        // Try to parse the string as json array
        req.body[key] = JSON.parse(value);
        // Return early if its not an array, since then we most likely got garbage data
        if (!Array.isArray(req.body[key])) {
          return res.status(400).json({ message: `${key} must be an array` });
        }
      } catch {
        return res
          .status(400)
          .json({ message: `Invalid JSON format for field "${key}"` });
      }
    }
  }

  next();
};
