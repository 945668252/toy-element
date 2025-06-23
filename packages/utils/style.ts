 import {isNumber, isString} from 'lodash-es';
 import { debugWarn } from './error';
 const SCOPE = "utlis/style" as const;

 //字符串'123' '1.23'
 const isStringNumber = (value:string):boolean=>{
    if(!isString(value)) return false;
    return !Number.isNaN(Number(value))
 }
 export function addUnit(value?:string|number,defaultUnit="px"){
    if(!value) return;
    if(isNumber(value) || isStringNumber(value)){
        return `${value}${defaultUnit}`
    }
    if(isString(value)){
        return value;
    }
    debugWarn(SCOPE,"value must be a string or number");
 }