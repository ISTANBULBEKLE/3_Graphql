// Named exports: You can export as many named exports as you want.
//Second type default export, has no  anme, which you can export only one time.
const message= "Hello from myModule";

const name = "Ekip"

const language = "Javascript";

const getGreeting =(name) =>{
    return `Hello ${name}`;
}  


export{message, name, getGreeting, language as default};