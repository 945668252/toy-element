import Collapse from "./Collapse.vue";
import CollapseItem from './CollapseItem.vue'
import {withInstall} from '@toy-element/utils';

export const ErCollapse = withInstall(Collapse);
export const ErCollapseItem = withInstall(CollapseItem);

export * from './types.ts';