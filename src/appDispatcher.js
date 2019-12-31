import { Dispatcher } from 'flux';
const dispatcher = new Dispatcher();
export default dispatcher;

//Stores will register with this dispatcher to say that they'd like to be informed when actions occur.
