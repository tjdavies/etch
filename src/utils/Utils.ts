export function isNotNill<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}

interface Identifiable {
  id: string;
}

export function findWithId<T extends Identifiable>(
  id: string,
  list: T[]
): T | undefined {
  return list.find((item) => hasId(id, item));
}

export function containsId<T extends Identifiable>(
  id: string,
  list: T[]
): boolean {
  return list.some((item) => hasId(id, item));
}

export function hasId<T extends Identifiable>(id: string, item: T): boolean {
  return item.id === id;
}
