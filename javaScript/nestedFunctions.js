export function login() {
  checkBalance();
  logout();

  function checkBalance() {
    console.log('Balance is $312312312.24234');
  }

  function logout() {
    console.log('logged out');
  }
}
