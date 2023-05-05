const validatePassword = pw => {
  let val = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
  return val.test(pw);
};

export function newPasswordValidator(password) {
  if (!password) return 'Password tidak boleh kosong';
  //   else if (password.length < 8) return 'Password memiliki minimal 8 karakter.';
  else if (password == 'b7c#default')
    return 'Password tidak boleh sama dengan password default';
  else if (!validatePassword(password))
    return 'Password harus memiliki minimal:\n* 8 karakter\n* 1 huruf kapital\n* 1 angka\n* 1 karakter (!, #, $, %, &, ?)';
  return '';
}
