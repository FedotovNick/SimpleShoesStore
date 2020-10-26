
let scrolling = false;


export const scrollingTop = ()=>{
    if(scrolling) return;
    scrolling = true;

    let interval = setInterval(() => {
        
        if (window.pageYOffset == 0) {
            scrolling = false;
            clearInterval(interval);
        }
        
        window.scrollBy(0, -80);

    }, 10);
}

export const scrollingBottom = ()=>{

    if(scrolling) return;
    scrolling = true;

    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight - 1;
    

    let interval = setInterval(() => {
        
        if (window.pageYOffset >= height) {
            scrolling = false;
            clearInterval(interval);
        }
        
        window.scrollBy(0, +80);

    }, 10);
}

