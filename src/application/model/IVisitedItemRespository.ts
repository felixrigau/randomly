export interface IVisitedItemRespository {
  getVisitedIds: () => string[];
  save: (id: string) => void;
}
