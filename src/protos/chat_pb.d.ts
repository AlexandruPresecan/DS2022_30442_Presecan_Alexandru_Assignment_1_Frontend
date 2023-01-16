// package: chat
// file: chat.proto

import * as jspb from "google-protobuf";

export class Message extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  getText(): string;
  setText(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    username: string,
    text: string,
  }
}

export class IsTyping extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IsTyping.AsObject;
  static toObject(includeInstance: boolean, msg: IsTyping): IsTyping.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: IsTyping, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IsTyping;
  static deserializeBinaryFromReader(message: IsTyping, reader: jspb.BinaryReader): IsTyping;
}

export namespace IsTyping {
  export type AsObject = {
    username: string,
  }
}

export class Seen extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Seen.AsObject;
  static toObject(includeInstance: boolean, msg: Seen): Seen.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Seen, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Seen;
  static deserializeBinaryFromReader(message: Seen, reader: jspb.BinaryReader): Seen;
}

export namespace Seen {
  export type AsObject = {
    username: string,
  }
}

