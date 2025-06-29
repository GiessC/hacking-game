export interface ExampleJson {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export class Example {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    description: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(data: ExampleJson): Example {
    return new Example(
      data.id,
      data.name,
      data.description,
      new Date(data.createdAt),
      new Date(data.updatedAt)
    );
  }

  toJson(): ExampleJson {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}

export class ExampleList {
  examples: Example[];

  constructor(examples: Example[]) {
    this.examples = examples;
  }

  static fromJson(data: ExampleJson[]): ExampleList {
    return new ExampleList(data.map(Example.fromJson));
  }

  toJson(): ExampleJson[] {
    return this.examples.map((example) => example.toJson());
  }
}
