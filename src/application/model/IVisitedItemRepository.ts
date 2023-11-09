export interface IVisitedItemRepository {
  exist: (id: string) => boolean;
  save: (id: string) => void;
  clear: () => void;
  size: () => number;
}
