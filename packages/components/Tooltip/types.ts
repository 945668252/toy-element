import type {Placement,Options} from '@popperjs/core';

export interface TooltipProps{
    content?:string;
    trigger?:'hover'|'click'|'contextmenu';
    placement?:Placement;
    popperOptions?:Partial<Options>;
    manual?:boolean;
    disabled?:boolean;
    transition?:string;
    showTimeout?:number;
    hideTimeout?:number;
}

export interface TooltipInstance {
    show():void;
    hide():void;
}

export interface TooltipEmits{
    (e:'visible-change',value:boolean):void;
    (e:'click-outside'):void;
}