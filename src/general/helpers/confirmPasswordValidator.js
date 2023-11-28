export function confirmPasswordValidator(password, confirm) {
  if (!confirm) return "Password can't be empty";
  if (password != confirm) return "Passwords don't match";
  return "";
}
