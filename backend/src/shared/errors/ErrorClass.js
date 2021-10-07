class RequiredParameterError extends Error {
  constructor(param) {
    super(`${param}`);

    this.name = "RequiredParameterError";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequiredParameterError);
    }
  }
}

class UniqueConstraintError extends Error {
  constructor(value, statusCode = 409) {
    super(value);

    this.name = "UniqueConstraintError";
    this.statusCode = statusCode;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UniqueConstraintError);
    }
  }
}

class InvalidPropertyError extends Error {
  constructor(msg, statusCode = 400) {
    super(msg);

    this.name = "InvalidPropertyError";
    this.statusCode = statusCode;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidPropertyError);
    }
  }
}

class UnauthorizedError extends Error {
  constructor(message, statusCode = 401) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = statusCode;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthorizedError);
    }
  }
}

class DatabaseError extends Error {
  constructor(message, statusCode = 503) {
    super(message);
    this.name = "MongoDBError";
    this.statusCode = statusCode;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DatabaseError);
    }
  }
}

class SendGridError extends Error {
  constructor(message, statusCode = 400) {
    super(message);

    this.name = "SendGridError";
    this.statusCode = statusCode;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SendGridError);
    }
  }
}

class MessageBrokerError extends Error {
  constructor(message, statusCode = 400) {
    super(message);

    this.name = "MessageBrokerError";
    this.statusCode = statusCode;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MessageBrokerError);
    }
  }
}

export {
  RequiredParameterError,
  InvalidPropertyError,
  UniqueConstraintError,
  UnauthorizedError,
  DatabaseError,
  SendGridError,
  MessageBrokerError,
};
