// Create an event of [type] with [detail] and dispatch it on [element]
export const dispatchEventOnElement = (
  element: Element | Document,
  type: string,
  detail?: Record<string, unknown>,
) =>
  element.dispatchEvent(
    new CustomEvent(type, {
      detail: detail,
    }),
  );
