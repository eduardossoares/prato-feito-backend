import { ZodError, type ZodType, type z } from "zod";
import { InternalServerError, ValidationError } from "../shared/http/errors";

export abstract class AbstractDTO<T extends ZodType> {
  protected readonly data: z.infer<T>;

  public constructor(data: unknown) {
    this.data = this.validate(data);
  }

  private validate(data: unknown) {
    try {
      const schema = this.schema();
      return schema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationError("Invalid payload", error.issues);
      }

      console.error(error);
      throw new InternalServerError();
    }
  }

  protected abstract schema(): T;

  public getData(): z.infer<T> {
    return this.data;
  }
}
