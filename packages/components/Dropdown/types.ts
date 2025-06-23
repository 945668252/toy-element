import type{ComputedRef, VNode} from 'vue';
import type {TooltipProps} from '../Tooltip';
import type { ButtonType,ButtonSize } from '../Button';

export type DropdownCommand = string | number;

export interface DropdownItemProps {
    command?:DropdownCommand;
    label?:string | VNode;
    disabled?:boolean;
    divided?:boolean;
 }

 export interface DropdownProps extends TooltipProps {
    type?:ButtonType;
    size?:ButtonSize;
    hideOnClick?:boolean;//默认点击菜单项后，关闭菜单
    splitButton?:boolean;

    items?:DropdownItemProps[];
 }

 export interface DropdownEmits{
    (e:"visible-change",value:boolean):void;
    (e:"command",value:DropdownCommand):void;
    (e:"click",value:MouseEvent):void;
 }

 export interface DropdownContext {
    size:ComputedRef<ButtonSize | void>;
    handleItemClick(item:DropdownItemProps):void;
 }

 export interface DropdownInstance {
    open():void;
    close():void;
 }