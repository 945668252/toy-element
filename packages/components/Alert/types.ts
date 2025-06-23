export type AlertType = "success" | "info" | "warning" | "danger" | "error";

export interface AlertEmits {
    (e:'close'):void;
}

export interface AlertProps {
    title?: string;
    description?: string;
    type?: AlertType;
    effect?:"light"|"dark"
    closable?: boolean;
    center?:boolean;
    showIcon?:boolean;
}

export interface AlertInstance {
    open():void;
    close():void;
}