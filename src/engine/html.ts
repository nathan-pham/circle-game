export const $ = (
    parent: HTMLElement | string,
    query?: string
): Element | null => {
    if (typeof parent === "string") {
        return $(document.body, parent);
    }

    if (!query) {
        return null;
    }

    return parent.querySelector(query);
};

export const $$ = (
    parent: HTMLElement | string,
    query?: string
): Array<Element> | null => {
    if (typeof parent === "string") {
        return $$(document.body, parent);
    }

    if (!query) {
        return null;
    }

    return [...parent.querySelectorAll(query)];
};
