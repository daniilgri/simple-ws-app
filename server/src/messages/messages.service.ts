import { Injectable } from '@nestjs/common';

import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  private messages: Message[] = [{ name: 'Marius', text: 'Howdy' }];
  private clientToUser: Record<string, string> = {};

  create(createMessageDto: CreateMessageDto, clientId: string): Message {
    const message = {
      name: this.clientToUser[clientId],
      text: createMessageDto.text,
    };
    this.messages.push(message);

    return message;
  }

  findAll(): Message[] {
    return this.messages;
  }

  identify(name: string, clientId: string): string[] {
    this.clientToUser[clientId] = name;

    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string): string {
    return this.clientToUser[clientId];
  }
}
