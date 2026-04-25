
export const getFallbackAvatar = (firstName = '', lastName = '') => {
  const name = `${firstName} ${lastName}`.trim() || 'User';
  // Use UI Avatars to generate a nice initial-based avatar with Linkly primary color
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=14b8a6&color=fff&size=256&bold=true&rounded=true`;
};
