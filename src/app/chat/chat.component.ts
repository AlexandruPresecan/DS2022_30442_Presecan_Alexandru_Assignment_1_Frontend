import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { grpc } from '@improbable-eng/grpc-web';
import { CookieService } from 'ngx-cookie-service';
import { IsTyping, Message, Seen } from 'src/protos/chat_pb';
import { BidirectionalStream, ChatClient } from 'src/protos/chat_pb_service';

interface PrivateChat {
  userName: string,
  isTyping: boolean,
  messages: { message: Message, seen: boolean } [],
  isTypingTimeout?: NodeJS.Timeout
}

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class Chat {

  @Input() admin!: boolean;
  
  messageStream!: BidirectionalStream<Message, Message>;
  isTypingStream!: BidirectionalStream<IsTyping, IsTyping>;
  seenStream!: BidirectionalStream<Seen, Seen>;

  chats: Map<string, PrivateChat> = new Map();
  selectedChat: PrivateChat = { userName: "", isTyping: false, messages: [] };

  @ViewChild('textArea') textArea!: ElementRef;

  constructor(private cookieService: CookieService) {

    const metadata = new grpc.Metadata();
    metadata.set("username", this.cookieService.get("userName"));

    const chatClient = new ChatClient('https://localhost:7263');

    this.messageStream = chatClient.messageStream(metadata);
    this.messageStream.on('data', (message: Message) => {

      if (!this.chats.has(message.getUsername())) 
        this.chats.set(message.getUsername(), { userName: message.getUsername(), isTyping: false, messages: [] });

      this.chats.get(message.getUsername())?.messages.push({ message: message, seen: false });
      this.sendSeen();
    });
    this.messageStream.on('end', () => {
      this.messageStream = chatClient.messageStream(metadata);
    });

    this.isTypingStream = chatClient.isTypingStream(metadata);
    this.isTypingStream.on('data', (isTyping: IsTyping) => {

      let chat = this.chats.get(isTyping.getUsername());

      if (!chat)
        return;

      chat.isTyping = true;

      if (chat.isTypingTimeout)
        clearTimeout(chat.isTypingTimeout);
        
      chat.isTypingTimeout = setTimeout(() => {
        let chat = this.chats.get(isTyping.getUsername());
        if (chat)
          chat.isTyping = false;
      }, 500);
    });
    this.isTypingStream.on('end', () => {
      this.isTypingStream = chatClient.isTypingStream(metadata);
    });

    this.seenStream = chatClient.seenStream(metadata);
    this.seenStream.on('data', (seen: Seen) => {
      this.chats.get(seen.getUsername())?.messages.forEach(message => {
        message.seen = true;
      });
    });
    this.seenStream.on('end', () => {
      this.seenStream = chatClient.seenStream(metadata);
    });
  }

  ngOnInit(): void {
    if (!this.admin) {
      this.selectedChat = { userName: "admin", isTyping: false, messages: [] };
      this.chats.set("admin", this.selectedChat);
    }
    else {
      this.sendMessage("");
      this.sendIsTyping();
      this.sendSeen();
    }
  }

  selectChat(userName: string) {

    let chat = this.chats.get(userName);

    if (chat)
      this.selectedChat = chat;

    this.sendSeen();
  }

  sendMessage(text: string): void {

    const message = new Message();
    message.setUsername(this.selectedChat.userName);
    message.setText(text);

    this.messageStream.write(message);

    const chatEntry = new Message();
    chatEntry.setUsername(this.cookieService.get("userName"));
    chatEntry.setText(text);

    this.selectedChat?.messages.push({ message: chatEntry, seen: false });
  }

  sendIsTyping(): void {

    const isTyping = new IsTyping();
    isTyping.setUsername(this.selectedChat.userName);

    this.isTypingStream.write(isTyping);
  }

  sendSeen(): void {
    try {
      
      if (this.textArea.nativeElement.offsetHeight + this.textArea.nativeElement.scrollTop < this.textArea.nativeElement.scrollHeight)
        return;
        
      const seen = new Seen();
      seen.setUsername(this.selectedChat.userName);
      this.seenStream.write(seen);
    }
    catch {
      const seen = new Seen();
      seen.setUsername(this.selectedChat.userName);
      this.seenStream.write(seen);
    }
  }
}
