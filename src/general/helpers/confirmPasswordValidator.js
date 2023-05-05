export function confirmPasswordValidator(password, confirm) {
  if (!confirm) return 'Password tidak boleh kosong';
  if (password != confirm) return 'Password tidak sama';
  return '';
}
