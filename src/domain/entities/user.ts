export class User {
  private readonly id: string;
  private readonly name: string;
  constructor(id: string, name: string) {
    this.validate(id, name);
    this.id = id;
    this.name = name;
  }

  private validate(id: string, name: string): void {
    if (!name) {
      throw new Error("O nome é obrigatório");
    }

    if (!id) {
      throw new Error("O ID é obrigatório");
    }
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }
}
