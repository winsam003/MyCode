let menu='짬뽕';
console.log(`** foo.mjs: menu=${menu}`);
console.log(`** foo.js: window.menu=${window.menu}`); //undefined

// ** import 1.
// import { pi, square, Person } from './m02_bar.mjs';
// console.log(`** foo import 1 pi=${pi}`);
// console.log(`** foo import 1 square=${square(5)}`);
// console.log(new Person('Lee')); // Person { name: 'Lee' }

// ** import 2.
// => myLib 를 통해 접근
// import * as myLib from './m02_bar.mjs';              // myLib.파일 식으로 접근할 수 있음
// console.log(`** foo import 2 pi=${myLib.pi}`);
// console.log(`** foo import 2 square=${myLib.square(5)}`);
// console.log(new myLib.Person('Lee')); // Person { name: 'Lee' }

// ** import 3.
// => export한 식별자 이름을 변경하여 import한다
import { pi as PI, square as mySqure, Person as P } from './m02_bar.mjs';
console.log(`** foo import 3 pi=${PI}`);
console.log(`** foo import 3 square=${mySqure(5)}`);
console.log(new P('Lee')); // Person { name: 'Lee' }
