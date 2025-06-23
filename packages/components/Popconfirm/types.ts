import type {ButtonType} from '../Button';
export interface PopconfirmProps{
    title?:string;
    confirmButtonText?:string;
    confirmButtonType?:ButtonType;
    cancelButtonText?:string;
    cancelButtonType?:ButtonType;
    hideAfter?:number;
    width?:string|number;

    icon?:string;
    iconColor?:string;
    hideIcon?:boolean;
}

export interface PopconfirmEmits{
    (e:'confirm',value:MouseEvent):void;
    (e:'cancel',value:MouseEvent):void;
}