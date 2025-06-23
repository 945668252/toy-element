import {
  onMounted,
  onBeforeUnmount,
  watch,
  isRef,
  unref,
  type MaybeRef,
} from "vue";

//封装了 addEventListener 和自动清理资源的 Hook
//组件卸载时会自动移除监听器，避免内存泄漏
export default function useEventListener(
  target: MaybeRef<EventTarget | HTMLElement | void>,
  event: string,
  handler: (e: Event) => any
) {
  if (isRef(target)) {
    watch(target, (val, oldVal) => {
      oldVal?.removeEventListener(event, handler);
      val?.addEventListener(event, handler);
    });
  } else {
    onMounted(() => target?.addEventListener(event, handler));
  }

  onBeforeUnmount(() => unref(target)?.removeEventListener(event, handler));
}
