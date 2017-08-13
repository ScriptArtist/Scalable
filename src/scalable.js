import "../node_modules/css-element-queries/src/ElementQueries";
import ResizeSensor from "../node_modules/css-element-queries/src/ResizeSensor";

class Scalable {
    constructor(containerElement, options) {
        if(typeof containerElement == 'object') {
            this.containerElement = containerElement;
        } else if(typeof containerElement == 'string') {
            this.containerElement = document.querySelector(containerElement);
        }
        this.element = this.containerElement.firstElementChild;

        // options
        this.options = {
            align: "left",
            verticalAlign: "top",
            containerHeight: "fixed"
        };

        Object.assign(this.options, options);


        // Add css styles
        this.containerElement.style.position = "relative";
        this.element.style.position = "absolute";
        //this.element.style.transformOrigin = this.options.transformOrigin || "left center";
     //   this.element.style.whiteSpace = "nowrap";

        // Events
        window.addEventListener('resize', () => this.update());

        var observer = new MutationObserver((mutations) => {
            this.update();
            // clear mutation stack to omit infinity loop
            observer.takeRecords();
        });
        observer.observe(this.element, { attributes: true, childList: true, characterData: true, subtree: true });

        var elementEvent = new ResizeSensor(this.element, () => this.update());
        var containerElementEvent = new ResizeSensor(this.containerElement, () => this.update());

        // initial update
        setTimeout(() => this.update());
    }

    update() {
        let clientWidth = this.containerElement.clientWidth,
            clientHeight = this.containerElement.clientHeight,
            scrollWidth = this.element.clientWidth,
            scrollHeight = this.element.clientHeight,
            ElementProportions = this.element.clientWidth / this.element.clientHeight;

        //clear all styles
        this.element.style.transform = "";

        //position
        switch(this.options.align) {
            case "left":
                this.element.style.left = '0';
                break;
            case "center":
                this.element.style.left = '50%';
                this.element.style.transform += "translateX(-50%) ";
                break;
            case "right":
                this.element.style.right = '0';
                break;
        }
        switch(this.options.verticalAlign) {
            case "top":
                this.element.style.top = '0';
                break;
            case "center":
                this.element.style.top = '50%';
                this.element.style.transform += "translateY(-50%) ";

                break;
            case "bottom":
                this.element.style.bottom = '0';
                break;
        }
        this.element.style.transformOrigin = this.options.align + " " + this.options.verticalAlign;


        // Width
        if(this.options.minWidth) {
            clientWidth = Math.max(clientWidth, this.options.minWidth);
        }
        if(this.options.maxWidth) {
            clientWidth = Math.min(clientWidth, this.options.maxWidth);
        }


        // Scale
        let scale = clientWidth / scrollWidth;

        if(this.options.containerHeight == "fixed") {
            if (clientHeight < scrollHeight * scale) {
                scale = clientHeight / scrollHeight;
            }
        }

        if(this.options.minScale) {
            scale  = Math.max(scale, this.options.minScale);
        }
        if(this.options.maxScale) {
            scale  = Math.min(scale, this.options.maxScale);
        }


        // Apply scale
        this.element.style.transform += "scale(" + scale + ", " + scale + ")";

        // Container height
        if(this.options.containerHeight == "auto") {
            this.containerElement.style.height = Math.ceil(this.element.clientHeight * scale) + 'px';
        }
    }
}

export default Scalable;