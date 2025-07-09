// src/utils/validators.ts

export const validateName = (name: string) => {
  if (!name.trim()) return "Name is required";
  return "";
};

export const validatePhone = (phone: string) => {
  if (!/^\d{10}$/.test(phone)) return "Phone must be exactly 10 digits";
  return "";
};

export const validatePassword = (password: string) => {
  if (password.length < 5) return "Password must be at least 5 characters";
  return "";
};

export const validateConfirmPassword = (password: string, confirmPassword: string) => {
  if (password !== confirmPassword) return "Passwords do not match";
  return "";
};
