export type StorageType = "refrigerated" | "frozen" | "roomTemperature";

export interface FoodsBody {
  foodName: string;
  createAt: Date;
  expirationDate: Date;
  quantity: number | null;
  amount: string | null;
  isFavorite: boolean;
  memberName: string;
  isShared: boolean;
}

export interface ChoresBody {
  choreArea: string;
  color: string;
  description: string;
  icon: string;
  choreDay?: string;
  choreFrequency: number;
  enrolledDate: string;
  memberIds: number[];
}

export interface EventsBody {
  eventName: string;
  eventDay: string;
  eventTime: string;
  memberIds: number[];
}
