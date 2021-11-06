class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {

    if(this.isAllowed()) {
      // console.log('allowed');
      // console.log(this.account.balance - this.amount);
      this.account.addTransaction(this);
    }
    if(!this.isAllowed()) {
      // console.log('not allowed');
      return false;
    }
  }
};

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    return this.account.balance - this.amount >= 0;
  }
};

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
};

class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    let balance = 0;
    this.transactions.forEach(t => {
      balance += t.value;
    })
    return balance;
  }
  addTransaction(transaction) {
    this.transactions.push(transaction)

  }
};

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('snow-patrol');
// const yourAccount = new Account('beegees');
// yourAccount.balance = 2000.00;

const t1 = new Deposit(50, myAccount);
t1.commit();
// console.log(myAccount);
const t2 = new Deposit(50, myAccount);
t2.commit();
// console.log(myAccount);
// console.log(myAccount.balance);
const t3 = new Withdrawal(101, myAccount);
t3.commit();
console.log(myAccount);
console.log(myAccount.balance);
// const t2 = new Withdrawal(999.99, yourAccount);
// t2.commit();
// console.log(t2);
// const t3 = new Deposit(999.99, myAccount);
// t3.commit();
// console.log(t3);

// console.log(myAccount);
// console.log(yourAccount);
// // t1 = new Withdrawal(50.25, myAccount);
// // t1.commit();
// // console.log('Transaction 1:', t1);

// // t2 = new Withdrawal(9.99, myAccount);
// // t2.commit();
// // console.log('Transaction 2:', t2);

// // t3 = new Deposit(120.00, myAccount);
// // t3.commit();
// // console.log('Transaction 3:', t3);

// console.log('Balance:', balance);
