<script>
import { ref, computed, watchEffect, onBeforeUnmount, defineComponent } from "vue";

export default defineComponent({
    name: "AnimatedBeam",
    props: {
        containerRef: { type: Object, required: true },
        fromRef: { type: Object, required: true },
        toRef: { type: Object, required: true },
        curvature: { type: Number, default: 0 },
        reverse: { type: Boolean, default: false },
        duration: { type: Number, default: () => Math.random() * 3 + 4 },
        pathColor: { type: String, default: "gray" },
        pathWidth: { type: Number, default: 2 },
        pathOpacity: { type: Number, default: 0.2 },
        gradientStartColor: { type: String, default: "#FFAA40" },
        gradientStopColor: { type: String, default: "#9C40FF" },
        startXOffset: { type: Number, default: 0 },
        startYOffset: { type: Number, default: 0 },
        endXOffset: { type: Number, default: 0 },
        endYOffset: { type: Number, default: 0 },
        class: { type: String, default: "" },
    },
    setup(props) {
        const id = `beam-${Math.random().toString(36).substring(2, 10)}`;
        const isVertical = ref(false);
        const isRightToLeft = ref(false);
        const isBottomToTop = ref(false);

        const pathD = ref("");
        const svgDimensions = ref({ width: 0, height: 0 });
        let resizeObserver;

        const x1 = computed(() => (props.reverse ? !isRightToLeft.value : isRightToLeft.value) ? "90%; -10%;" : "10%; 110%;");
        const x2 = computed(() => (props.reverse ? !isRightToLeft.value : isRightToLeft.value) ? "100%; 0%;" : "0%; 100%;");
        const y1 = computed(() => (props.reverse ? !isBottomToTop.value : isBottomToTop.value) ? "90%; -10%;" : "10%; 110%;");
        const y2 = computed(() => (props.reverse ? !isBottomToTop.value : isBottomToTop.value) ? "100%; 0%;" : "0%; 100%;");

        const updatePath = () => {
            // 必须确保 ref.value 存在，v4 的模板引用有时在初次执行时为 null
            const container = props.containerRef;
            const from = props.fromRef;
            const to = props.toRef;

            if (container && from && to) {
                const containerRect = container.getBoundingClientRect();
                const rectA = from.getBoundingClientRect();
                const rectB = to.getBoundingClientRect();

                svgDimensions.value = { width: containerRect.width, height: containerRect.height };

                const startX = rectA.left - containerRect.left + rectA.width / 2 + (props.startXOffset || 0);
                const startY = rectA.top - containerRect.top + rectA.height / 2 + (props.startYOffset || 0);
                const endX = rectB.left - containerRect.left + rectB.width / 2 + (props.endXOffset || 0);
                const endY = rectB.top - containerRect.top + rectB.height / 2 + (props.endYOffset || 0);

                isVertical.value = Math.abs(endY - startY) > Math.abs(endX - startX);
                isRightToLeft.value = endX < startX;
                isBottomToTop.value = endY < startY;

                const controlY = startY - (props.curvature || 0);
                pathD.value = `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`;
            }
        };

        watchEffect(() => {
            if (props.containerRef && !resizeObserver) {
                resizeObserver = new ResizeObserver(updatePath);
                resizeObserver.observe(props.containerRef);
                updatePath();
            }
        });

        onBeforeUnmount(() => resizeObserver?.disconnect());

        return { id, isVertical, pathD, svgDimensions, x1, x2, y1, y2 };
    },
});
</script>

<template>
    <!-- 直接内联关键样式，规避 Tailwind 配置失效风险 -->
    <svg fill="none" :width="svgDimensions.width" :height="svgDimensions.height"
        :viewBox="`0 0 ${svgDimensions.width} ${svgDimensions.height}`"
        :style="{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }" :class="class">
        <path :d="pathD" :stroke="pathColor" :stroke-width="pathWidth" :stroke-opacity="pathOpacity"
            stroke-linecap="round" />
        <path :d="pathD" :stroke-width="pathWidth" :stroke="`url(#${id})`" stroke-opacity="1" stroke-linecap="round" />
        <defs>
            <linearGradient :id="id" gradientUnits="userSpaceOnUse" x1="0%" x2="0%" y1="0%" y2="0%">
                <stop :stop-color="gradientStartColor" stop-opacity="0" />
                <stop :stop-color="gradientStartColor" />
                <stop offset="32.5%" :stop-color="gradientStopColor" />
                <stop offset="100%" :stop-color="gradientStopColor" stop-opacity="0" />

                <template v-if="!isVertical">
                    <animate attributeName="x1" :values="x1" :dur="`${duration}s`" keyTimes="0; 1"
                        keySplines="0.16 1 0.3 1" calcMode="spline" repeatCount="indefinite" />
                    <animate attributeName="x2" :values="x2" :dur="`${duration}s`" keyTimes="0; 1"
                        keySplines="0.16 1 0.3 1" calcMode="spline" repeatCount="indefinite" />
                </template>
                <template v-else>
                    <animate attributeName="y1" :values="y1" :dur="`${duration}s`" keyTimes="0; 1"
                        keySplines="0.16 1 0.3 1" calcMode="spline" repeatCount="indefinite" />
                    <animate attributeName="y2" :values="y2" :dur="`${duration}s`" keyTimes="0; 1"
                        keySplines="0.16 1 0.3 1" calcMode="spline" repeatCount="indefinite" />
                </template>
            </linearGradient>
        </defs>
    </svg>
</template>