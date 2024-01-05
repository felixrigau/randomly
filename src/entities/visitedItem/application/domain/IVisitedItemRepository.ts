export interface IVisitedItemRepository {
  exist: (id: string) => Promise<boolean>;
  save: (id: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
  clear: () => Promise<void>;
  size: () => Promise<number>;
  getLastRequestDate: () => Promise<Date>;
  saveLastRequestDate: (currentDate: Date) => Promise<void>;
}
