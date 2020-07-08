import { IDomainEvent } from "./IDomainEvent";

export interface IEventHandle<IDomainEvent> {
  setupSubscriptions(): void;
}
