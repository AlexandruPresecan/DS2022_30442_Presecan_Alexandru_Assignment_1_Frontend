// package: chat
// file: chat.proto

var chat_pb = require("./chat_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Chat = (function () {
  function Chat() {}
  Chat.serviceName = "chat.Chat";
  return Chat;
}());

Chat.MessageStream = {
  methodName: "MessageStream",
  service: Chat,
  requestStream: true,
  responseStream: true,
  requestType: chat_pb.Message,
  responseType: chat_pb.Message
};

Chat.IsTypingStream = {
  methodName: "IsTypingStream",
  service: Chat,
  requestStream: true,
  responseStream: true,
  requestType: chat_pb.IsTyping,
  responseType: chat_pb.IsTyping
};

Chat.SeenStream = {
  methodName: "SeenStream",
  service: Chat,
  requestStream: true,
  responseStream: true,
  requestType: chat_pb.Seen,
  responseType: chat_pb.Seen
};

exports.Chat = Chat;

function ChatClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ChatClient.prototype.messageStream = function messageStream(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.client(Chat.MessageStream, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners.end.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  client.onMessage(function (message) {
    listeners.data.forEach(function (handler) {
      handler(message);
    })
  });
  client.start(metadata);
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

ChatClient.prototype.isTypingStream = function isTypingStream(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.client(Chat.IsTypingStream, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners.end.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  client.onMessage(function (message) {
    listeners.data.forEach(function (handler) {
      handler(message);
    })
  });
  client.start(metadata);
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

ChatClient.prototype.seenStream = function seenStream(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.client(Chat.SeenStream, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners.end.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  client.onMessage(function (message) {
    listeners.data.forEach(function (handler) {
      handler(message);
    })
  });
  client.start(metadata);
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.ChatClient = ChatClient;

