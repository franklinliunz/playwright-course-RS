export class isDesktopViewport{
    
    constructor(page){
        this.page = page
    }

    isDesktop = () => {
        const size = this.page.viewportSize()
        return size.width >= 600
    }
}