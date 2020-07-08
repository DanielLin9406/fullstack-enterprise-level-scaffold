import { UniqueEntityID } from "../id/UniqueEntityID";

export interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId(): UniqueEntityID;
}
