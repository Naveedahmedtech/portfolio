export type CursorAnchor = {
  x: number;
  y: number;
  strength: number;
};

let anchors: CursorAnchor[] = [];
const listeners = new Set<() => void>();

export const setCursorAnchors = (next: CursorAnchor[]) => {
  anchors = next;
  listeners.forEach((listener) => listener());
};

export const getCursorAnchors = () => anchors;

export const subscribeCursorAnchors = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
