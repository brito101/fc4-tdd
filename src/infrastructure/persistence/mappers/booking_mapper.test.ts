import { Booking } from "../../../domain/entities/booking";
import { Property } from "../../../domain/entities/property";
import { User } from "../../../domain/entities/user";
import { DateRange } from "../../../domain/value_objects/date_range";
import { BookingEntity } from "../entities/booking_entity";
import { PropertyEntity } from "../entities/property_entity";
import { UserEntity } from "../entities/user_entity";
import { BookingMapper } from "./booking_mapper";

describe("PropertyMapper", () => {
  it("deve converter BookingEntity em Booking corretamente", () => {
    const propertyEntity: PropertyEntity = {
      id: "1",
      name: "House",
      description: "Sweet House",
      maxGuests: 10,
      basePricePerNight: 100,
      bookings: [],
    };

    const userEntity: UserEntity = { id: "1", name: "John Dee" };

    const bookingEntity: BookingEntity = {
      id: "1",
      property: propertyEntity,
      guest: userEntity,
      startDate: new Date(Date.now()),
      endDate: new Date(Date.now() + 1000),
      guestCount: 10,
      totalPrice: 1000,
      status: "CONFIRMED",
    };

    const property = new Property("1", "House", "Sweet House", 10, 1000);

    const result = BookingMapper.toDomain(bookingEntity, property);

    expect(result.getId()).toEqual("1");
    expect(result.getGuest()).toEqual(userEntity);
    expect(result.getGuestCount()).toEqual(10);
    expect(result.getStatus()).toEqual("CONFIRMED");
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity", () => {
    const propertyEntity: PropertyEntity = {
      id: "1",
      name: "House",
      description: "Sweet House",
      maxGuests: 10,
      basePricePerNight: 100,
      bookings: [],
    };

    const userEntity: UserEntity = { id: "1", name: "John Dee" };

    const bookingEntity: any = {
      id: "1",
      property: propertyEntity,
      guest: userEntity,
      startDate: new Date(Date.now()),
      endDate: new Date(Date.now() + 1000),
      //   guestCount: 10,
      totalPrice: 1000,
      status: "CONFIRMED",
    };

    const property = new Property("1", "House", "Sweet House", 10, 1000);

    // expect(() => BookingMapper.toDomain(bookingEntity, property)).toThrow(
    //   "O guest é obrigatório"
    // );
    // expect(() => BookingMapper.toDomain(bookingEntity, property)).toThrow(
    //   "O startDate é obrigatório"
    // );
    // expect(() => BookingMapper.toDomain(bookingEntity, property)).toThrow(
    //   "O endDate é obrigatório"
    // );
    // expect(() => BookingMapper.toDomain(bookingEntity, property)).toThrow(
    //   "O id é obrigatório"
    // );
    expect(() => BookingMapper.toDomain(bookingEntity, property)).toThrow(
      "O guestCount é obrigatório"
    );
  });

  it("deve converter Booking para BookingEntity corretamente", () => {
    const property = new Property("1", "House", "Sweet House", 10, 100);

    const user = new User("1", "John Dee");

    const dateRange = new DateRange(
      new Date(Date.now()),
      new Date(Date.now() + 1000)
    );

    const booking = new Booking("1", property, user, dateRange, 10);

    const result = BookingMapper.toPersistence(booking);

    expect(result.guest).toEqual(user);
    expect(result.id).toBe("1");
    expect(result.totalPrice).toBe(100);
    expect(result.startDate).toBe(dateRange.getStartDate());
    expect(result.endDate).toBe(dateRange.getEndDate());
  });
});
