
export type InputsDTO = {
  id: string;
    user_id: string;
    product: string;
    paid: number;
    change: number;
    amount: number;
    remarks: string;
    location: string;
    auto_remarks: boolean;
    category: string;
    transaction_date: Date;
    created_date: Date;
    updated_date: Date;
    created_by: string;
}


export type Inputs = {
  id: string;
  user_id: string;
  product: string;
  paid: number;
  change: number;
  amount: number;
  remarks: string;
  location: string;
  auto_remarks: boolean;
  category : string
  transactionDate: string
}


export type InputsInsert = {
  product: string,
  paid: number,
  change: number,
  amount: number,
  location : string,
  remarks: string,
  category: string,
  autoRemark : boolean,
  transactionDate : Date,
};