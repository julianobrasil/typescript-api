export function toKebabCase(name: string) {
    return name.split('').map((s, i) => {
         const sU = s.toUpperCase();
         const sL = s.toLocaleLowerCase();
         const isNotLetter = sU === sL;
         if(isNotLetter) {
             return s;
         }

         if(!i) {
            return sL;
         }
 
         if(s !== sU) {
             return s;
         }
 
         return `-${sL}`;
     }).join('');
 }
 