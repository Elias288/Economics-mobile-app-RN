export type OperationInterface = {
  amount: number;
  operationDate: Date;
  cause: string;
  type: OperationTypeInterface;
};

export enum OperationTypeInterface {
  withdraw,
  insert
};
