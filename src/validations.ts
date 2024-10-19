// import { AllTypes, Arguments, Options, Rule } from "./types"

// const toBoolean = (value: string): boolean => {
//   return (value === 'true') 
// }

// const castValue = (value: string | boolean | string[], options: Options, rule: Rule): void => {
//   switch(rule.type) {
//     case 'boolean':
//       if (typeof value === 'string') {
//         options[rule.flag] = options[rule.alias] = toBoolean(value);
//       }
//       break;
//     case 'string':
//       // nothing to do
//       break;
//     case 'array':{
//       const v: string[] = Array.isArray(value) ?value : [value];
//       setValue<string[]>(options, v, rule); 
//     }
//       break;
//   }
// };

// function setValue<T> (ops: { [key:string]: T}, value: T, rule: Rule): void {
//   ops[rule.flag] = value;
// }

// export const verify = (options: Optio, validations: Rule[]) : Arguments => {
//   if (validations.length) {
//     const ops: Options<string | string[] | boolean> = {}
//     validations.forEach((rule) => {
//       const value = options[rule.flag] ?? options[rule.alias];
//       const exists = value !== undefined;
//       if (!exists && rule.required) {
//         throw new Error(`Option: ---${rule.flag} -${rule.alias} is required.`)
//       }
//       if (exists) {
//         castValue(value, options, rule);
//       } else {
//          if (rule.hasOwnProperty('default')){
//           switch(rule.type) {
//             case 'string':
//               setValue<string>(ops, rule, rule.default);
//             break;

//           }
//          }
//       }
      
//     })
//   }
//   return options;
// }
