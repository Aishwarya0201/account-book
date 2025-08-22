export class Transaction {
  
  date: string;
  counterparty: string;
  narration: string;
  debit: number;
  credit: number;
  balance!: number;

  constructor(
   
    date: string,
    counterparty: string,
    narration: string,
    debit: number,
    credit: number
  ) {
   
    this.date = date;
    this.counterparty = counterparty;
    this.narration = narration;
    this.debit = debit;
    this.credit = credit;
  }
}