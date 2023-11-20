export interface IVisitedItemRepository {
  exist: (id: string) => boolean;
  save: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  size: () => number;
  getLastRequestDate: () => Date;
  saveLastRequestDate: (currentDate: Date) => void;
}
