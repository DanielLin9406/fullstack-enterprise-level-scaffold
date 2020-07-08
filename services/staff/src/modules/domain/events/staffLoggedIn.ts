import { Staff } from "../Staff";
import { IDomainEvent } from "../../../shared/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../shared/domain/id/UniqueEntityID";

export class StaffLoggedIn implements IDomainEvent {
  public dateTimeOccurred: Date;
  public staff: Staff;

  constructor(staff: Staff) {
    this.dateTimeOccurred = new Date();
    this.staff = staff;
  }

  getAggregateId(): UniqueEntityID {
    return this.staff.id;
  }
}
