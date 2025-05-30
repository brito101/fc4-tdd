import { Property } from "../../../domain/entities/property";
import { PropertyEntity } from "../entities/property_entity";
import { PropertyMapper } from "./property_mapper";

describe("PropertyMapper", () => {
  it("deve converter PropertyEntity em Property corretamente", () => {
    const propertyEntity: PropertyEntity = {
      id: "1",
      name: "House",
      description: "Sweet House",
      maxGuests: 10,
      basePricePerNight: 100,
      bookings: [],
    };

    const property: Property = new Property(
      "1",
      "House",
      "Sweet House",
      10,
      100
    );

    const result = PropertyMapper.toDomain(propertyEntity);

    expect(result).toEqual(property);
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity", () => {
    const propertyEntity: any = {
      id: "1",
      name: "House",
      description: "Sweet House",
      maxGuests: "10",
      // basePricePerNight: '100',
      bookings: [],
    };

    // expect(() => PropertyMapper.toDomain(propertyEntity)).toThrow(
    //   "O id é obrigatório"
    // );

    // expect(() => PropertyMapper.toDomain(propertyEntity)).toThrow(
    //   "O nome é obrigatório"
    // );

    //  expect(() => PropertyMapper.toDomain(propertyEntity)).toThrow(
    //   "A descrição é obrigatória"
    // );

    //  expect(() => PropertyMapper.toDomain(propertyEntity)).toThrow(
    //   "O número máximo de hóspedes é obrigatório"
    // );

    expect(() => PropertyMapper.toDomain(propertyEntity)).toThrow(
      "O preço base por noite é obrigatório"
    );
  });

  it("deve converter Property para PropertyEntity corretamente", () => {
    const property: Property = new Property(
      "1",
      "House",
      "Sweet House",
      10,
      100
    );

    const propertyEntity: Partial<PropertyEntity> = {
      id: "1",
      name: "House",
      description: "Sweet House",
      maxGuests: 10,
      basePricePerNight: 100,
    };

    const result = PropertyMapper.toPersistence(property);

    expect(result).toEqual(propertyEntity);
  });
});
