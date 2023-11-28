const validatePassword = (pw) => {
  let val = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
  return val.test(pw);
};

export function newPasswordValidator(password) {
  if (!password) return "Password can't be empty";
  //   else if (password.length < 8) return 'Password memiliki minimal 8 karakter.';
  else if (password == "b7c#default")
    return "New password can't be default password";
  else if (!validatePassword(password))
    return "Password must contain at least:\n* 8 characters\n* 1 uppercase letter\n* 1 number\n* 1 special character (!, #, $, %, &, ?)";
  return "";
}
