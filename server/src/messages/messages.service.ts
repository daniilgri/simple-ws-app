import { Injectable } from '@nestjs/common';

import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  private messages: Message[] = [{ name: 'Marius', text: 'Howdy' }];
  private clientToUser: Record<string, string> = {};

  create(createMessageDto: CreateMessageDto): Message {
    this.messages.push(createMessageDto);

    return createMessageDto;
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
