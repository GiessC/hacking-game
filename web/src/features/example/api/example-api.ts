import { Example, ExampleList, type ExampleJson } from '../types/example';

export class ExampleApi {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async getExamples(): Promise<ExampleList> {
    const response = await fetch(`${this.baseUrl}/example`);
    const json: ExampleJson[] = await response.json();
    return ExampleList.fromJson(json);
  }

  public async createExample(data: Example): Promise<Example> {
    const response = await fetch(`${this.baseUrl}/example`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json: ExampleJson = await response.json();
    return Example.fromJson(json);
  }
}
