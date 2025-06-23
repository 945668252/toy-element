import { type Ref } from 'vue'
import useEventListener from './useEventListener'

export default function useClickOutside (
  elementRef: Ref<HTMLElement | void>,
  callback: (e: MouseEvent) => void
) {
  //监听整个文档的 click 事件。判断点击的目标元素 e.target 是否在 elementRef.value 内部。如果不在内部，就调用 callback。
  //监听 document 的 click 事件并判断 contains
  useEventListener(document, 'click', (e: Event) => {
    if (elementRef.value && e.target) {
      if (!elementRef.value.contains(e.target as HTMLElement)) {
        callback(e as MouseEvent)
      }
    }
  })
}
