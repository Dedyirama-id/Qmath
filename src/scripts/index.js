import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import NumberApp from './utils/number';
import CharacterApp from './utils/character';

const numberApp = new NumberApp(1);
const characterApp = new CharacterApp(1);
