// package: chat
// file: chat.proto

import * as chat_pb from "./chat_pb";
import {grpc} from "@improbable-eng/grpc-web";

type ChatMessageStream = {
  readonly methodName: string;
  readonly service: typeof Chat;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof chat_pb.Message;
  readonly responseType: typeof chat_pb.Message;
};

type ChatIsTypingStream = {
  readonly methodName: string;
  readonly service: typeof Chat;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof chat_pb.IsTyping;
  readonly responseType: typeof chat_pb.IsTyping;
};

type ChatSeenStream = {
  readonly methodName: string;
  readonly service: typeof Chat;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof chat_pb.Seen;
  readonly responseType: typeof chat_pb.Seen;
};

export class Chat {
  static readonly serviceName: string;
  static readonly MessageStream: ChatMessageStream;
  static readonly IsTypingStream: ChatIsTypingStream;
  static readonly SeenStream: ChatSeenStream;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class ChatClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  messageStream(metadata?: grpc.Metadata): BidirectionalStream<chat_pb.Message, chat_pb.Message>;
  isTypingStream(metadata?: grpc.Metadata): BidirectionalStream<chat_pb.IsTyping, chat_pb.IsTyping>;
  seenStream(metadata?: grpc.Metadata): BidirectionalStream<chat_pb.Seen, chat_pb.Seen>;
}

