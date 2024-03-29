export const isEmpty = (obj: object): boolean => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
};

/**
 *
 * @param el
 * @param verticalOffset{number} 0.0 - 1.0
 * @returns {boolean}
 */

export const isElementVisible = (el: HTMLElement, verticalOffset: number = 0): boolean => {
    if (!el || 1 !== el.nodeType) {
        return false;
    }
    const html = document.documentElement;
    const r = el.getBoundingClientRect();
    const clHeight = html.clientHeight;
    const offset = verticalOffset * r.height;

    return (!!r
        && r.bottom - offset >= 0
        && r.right >= 0
        && r.top + offset <= clHeight
        && r.left <= html.clientWidth
    );
};

export function URLRedirect(url: string): void {
    window.location.href = url;
}

