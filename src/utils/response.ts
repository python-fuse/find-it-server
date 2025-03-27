class BaseRespose {
  public message: string;
  public status: number;
  public data: {};

  constructor(status: number, message: string, data: {}) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

class SuccessResponse extends BaseRespose {
  constructor(message: string, data: {}) {
    super(200, message, data);
  }
}

class CreatedResponse extends BaseRespose {
  constructor(message: string, data: {}) {
    super(201, message, data);
  }
}

export { SuccessResponse, CreatedResponse };
