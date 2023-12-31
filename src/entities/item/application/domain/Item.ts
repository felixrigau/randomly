export class Item {
  id: string;
  title: string;
  text?: string;
  isFixed?: boolean;
  order?: number;
  createdAt: string;

  constructor(
    title: string,
    text: string = "",
    isFixed: boolean = false,
    order: number = 100
  ) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.text = text;
    this.isFixed = isFixed;
    this.order = order;
    this.createdAt = new Date().toISOString();
  }
}
