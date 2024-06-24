const MobileMaxWidth = 991;

export function isMobileView() {
    return window.innerWidth <= MobileMaxWidth;
}