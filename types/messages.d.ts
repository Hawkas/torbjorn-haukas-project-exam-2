export interface MessageOut {
  name: string;
  email: string;
  subject: string;
  message: string;
}
export interface MessageInc {
  data: MessageIncSingle[];
}
export interface MessageIncSingle {
  id: number;
  attributes: Message & { createdAt: string };
}

export interface MessageClean extends MessageOut {
  id: string;
  createdAt: string;
}
