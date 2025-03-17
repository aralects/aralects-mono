declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}

declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module 'swiper/css' {
    const styles: any;
    export default styles;
}

declare module 'swiper/css/mousewheel' {
    const styles: any;
    export default styles;
}

declare module 'swiper/css/*' {
    const styles: any;
    export default styles;
} 