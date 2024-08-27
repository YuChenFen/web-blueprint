const attributePromptWords = [
    // 动画属性(Animation)
    "animation",                        // 	指定基于关键帧的动画。
    "animation-delay",                  // 	指定动画效果何时开始。
    "animation-direction",              // 	指定动画是否应在交替的循环中反向播放。
    "animation-duration",               // 	指定动画完成一个周期应花费的秒数或毫秒数。
    "animation-fill-mode",              // 	指定CSS动画在执行之前和之后应如何将样式应用于其目标。
    "animation-iteration-count",        // 	指定动画效果应播放的次数。
    "animation-name",                   // 	指定@keyframes应应用于所选元素的已定义动画的名称。
    "animation-play-state",             // 	指定动画是否正在运行或暂停。
    "animation-timing-function",        // 	指定CSS动画在每个周期内应如何进行。

    // 背景属性(Background)
    "background",                       // 	设置背景属性的简写属性。
    "background-attachment",            // 	指定背景图像是否固定或者随着页面的其余部分滚动。
    "background-clip",                  // 	指定背景的绘制区域。
    "background-color",                 // 	设置背景色。
    "background-image",                 // 	设置背景图像。
    "background-origin",                // 	指定背景图像的定位区域。
    "background-position",              // 	设置背景图像的起始位置。
    "background-repeat",                // 	指定是否/如何平铺背景图像。
    "background-size",                  // 	指定背景图像的尺寸。

    // 边框属性(Border)
    "border",                           // 	设置元素边框所有四个侧面的宽度，样式和颜色。
    "border-bottom",                    // 	设置下边框的简写属性。
    "border-bottom-color",              // 	设置下边框的颜色。
    "border-bottom-left-radius",        // 	设置下边框左角半径。
    "border-bottom-right-radius",       // 	设置下边框右角半径。
    "border-bottom-style",              // 	设置下边框的样式。
    "border-bottom-width",              // 	设置下边框的宽度。
    "border-color",                     // 	设置四个边框的颜色。
    "border-image",                     // 	设置边框图像。
    "border-image-outset",              // 	设置边框图像的边界。
    "border-image-repeat",              // 	设置边框
    "border-image-slice",               // 	设置边框图像的滑块。
    "border-image-source",              // 	设置边框图像的源。
    "border-image-width",               // 	设置边框图像的宽度。
    "border-left",                      // 	设置左边框的简写属性。
    "border-left-color",                // 	设置左边框的颜色。
    "border-left-style",                // 	设置左边框的样式。
    "border-left-width",                // 	设置左边框的宽度。
    "border-radius",                    // 	设置四个边框的半径。
    "border-right",                     // 	设置右边框的简写属性。
    "border-right-color",               // 	设置右边框的颜色。
    "border-right-style",               // 	设置右边框的样式
    "border-right-width",               // 	设置右边框的宽度。
    "border-style",                     // 	设置四个边框的样式。
    "border-top",                       // 	设置上边框的简写属性。
    "border-top-color",                 // 	设置上边框的颜色。
    "border-top-left-radius",           // 	设置上边框左角半径。
    "border-top-right-radius",          // 	设置上边框右角半径。
    "border-top-style",                 // 	设置上边框的样式。
    "border-top-width",                 // 	设置上边框的宽度。
    "border-width",                     // 	设置四个边框的宽度。

    // 颜色属性(Color)
    "color",                            // 	设置文本颜色。
    "opacity",                          // 	设置元素的透明度。

    // 尺寸属性(Size)
    "height",                           // 	设置元素的高度。
    "max-height",                       // 	设置元素的最大高度。
    "max-width",                        // 	设置元素的最大宽度。
    "min-height",                       // 	设置元素的最小高度。
    "min-width",                        // 	设置元素的最小宽度。
    "width",                            // 	设置元素的宽度。

    // 内容属性(Content)
    "content",                          // 	设置生成的内容。
    "quotes",                           // 	设置元素的引用。
    "counter-increment",                // 	设置计数器的值。
    "counter-reset",                    // 	重置计数器的值。

    // 弹性Flex盒子布局(Flex)
    "align-content",                    // 	设置或检索弹性盒子元素在主轴上的对齐方式。
    "align-items",                      // 	设置或检索弹性盒子元素在交叉轴上如何对齐。
    "align-self",                       // 	设置或检索弹性盒子元素在交叉轴上如何对齐。
    "flex",                             // 	设置或检索弹性盒子元素在弹性容器内的排版方式。
    "flex-basis",                       // 	设置或检索弹性盒子元素的初始长度。
    "flex-direction",                   // 	设置或检索弹性盒子元素的主轴方向。
    "flex-flow",                        // 	设置或检索弹性盒子元素的主轴和交叉轴。
    "flex-grow",                        // 	设置或检索弹性盒子元素的放大比例。
    "flex-shrink",                      // 	设置或检索弹性盒子元素的缩小比例。
    "flex-wrap",                        // 	设置或检索弹性盒子元素是否换行。
    "justify-content",                  // 	设置或检索弹性盒子元素在主轴上的对齐方式。
    "order",                            // 	设置或检索弹性盒子元素的排列顺序。

    // 字体属性(Fonts)
    "font",                             // 	设置字体属性的简写属性。
    "font-family",                      // 	设置字体系列。
    "font-size",                        // 	设置字体大小。
    "font-size-adjust",                 // 	设置字体大小调整。
    "font-stretch",                     // 	设置字体拉伸。
    "font-style",                       // 	设置字体样式。
    "font-variant",                     // 	设置字体变体。
    "font-weight",                      // 	设置字体粗细。

    // 列表项属性(Lists)
    "list-style",                       // 	设置列表项的简写属性。
    "list-style-image",                 // 	设置列表项的图像。
    "list-style-position",              // 	设置列表项的位置。
    "list-style-type",                  // 	设置列表项的类型。

    // 边距属性(Margin)
    "margin",                           // 	设置四个边距的简写属性。
    "margin-bottom",                    // 	设置下边距。
    "margin-left",                      // 	设置左边距。
    "margin-right",                     // 	设置右边距。
    "margin-top",                       // 	设置上边距。

    // 多列布局属性(Column)
    "column-count",                     // 	设置元素在多列布局中的列数。
    "column-fill",                      // 	设置元素在多列布局中的填充方式。
    "column-gap",                       // 	设置元素在多列布局中的列间距。
    "column-rule",                      // 	设置元素在多列布局中的列边框。
    "column-rule-color",               // 	设置元素在多列布局中的列边框颜色。
    "column-rule-style",               // 	设置元素在多列布局中的列边框样式。
    "column-rule-width",               // 	设置元素在多列布局中的列边框宽度。
    "column-span",                     // 	设置元素在多列布局中的列跨度。
    "column-width",                    // 	设置元素在多列布局中的列宽度。
    "columns",                          // 	设置元素在多列布局中的列数和列

    // 轮廓属性(Outline)
    "outline",                          // 	设置轮廓的简写属性。
    "outline-color",                    // 	设置轮廓的颜色。
    "outline-offset",                   // 	设置轮廓的偏移。
    "outline-style",                    // 	设置轮廓的样式。
    "outline-width",                    // 	设置轮廓的宽度。

    // 填充属性(Padding)
    "padding",                          // 	设置四个填充的简写属性。
    "padding-bottom",                   // 	设置下填充。
    "padding-left",                     // 	设置左边填充。
    "padding-right",                    // 	设置右边填充。
    "padding-top",                      // 	设置上填充。

    // 打印属性(Print)
    "page-break-after",                 // 	设置元素在分页时是否断开。
    "page-break-before",                // 	设置元素在分页时是否断开。
    "page-break-inside",                // 	设置元素在分页时是否断开。

    // 表属性(Table)
    "border-collapse",                  // 	设置或检索表格边框是否折叠。
    "border-spacing",                   // 	设置或检索表格边框之间的间隔。
    "caption-side",                     // 	设置或检索表格标题的位置。
    "empty-cells",                      // 	设置或检索表格单元格是否显示边框。
    "table-layout",                     // 	设置或检索表格布局的类型。

    // 文本属性(Text)
    "direction",                        // 	设置或检索文本方向。
    "tab-size",                         // 	设置或检索制表符的宽度。
    "text-align",                       // 	设置或检索文本的对齐方式。
    "text-align-last",                  // 	设置或检索文本最后一行的对齐方式。
    "text-decoration",                  // 	设置或检索文本的装饰。
    "text-decoration-color",            // 	设置或检索文本装饰的颜色。
    "text-decoration-line",             // 	设置或检索文本装饰的线条类型。
    "text-decoration-style",            // 	设置或检索文本装饰的线条样式。
    "text-indent",                      // 	设置或检索文本的缩进。
    "text-justify",                     // 	设置或检索文本的排版方式。
    "text-overflow",                    // 	设置或检索文本溢出。
    "text-shadow",                      // 	设置或检索文本阴影。
    "text-transform",                   // 	设置或检索文本的大小写转换。
    "line-height",                      // 	设置或检索行高。
    "vertical-align",                   // 	设置或检索元素的垂直对齐方式。
    "letter-spacing",                   // 	设置或检索字符间距。
    "word-spacing",                     // 	设置或检索单词间距。
    "white-space",                      // 	设置或检索文本的换行方式。
    "word-break",                       // 	设置或检索单词的换行方式。
    "word-wrap",                        // 	设置或检索文本的换行方式。

    // 转换属性(Transform)
    "backface-visibility",              // 	设置或检索元素是否可见。
    "perspective",                      // 	设置或检索元素的透视。
    "perspective-origin",               // 	设置或检索元素的透视原点。
    "transform",                        // 	设置或检索元素的变换。
    "transform-origin",                 // 	设置或检索元素的变换原点。
    "transform-style",                  // 	设置或检索元素的变换样式。

    // 过渡属性(Transition)
    "transition",                       // 	设置或检索元素的过渡。
    "transition-delay",                 // 	设置或检索元素的过渡延迟。
    "transition-duration",              // 	设置或检索元素的过渡持续时间。
    "transition-property",              // 	设置或检索元素的过渡属性。
    "transition-timing-function",       // 	设置或检索元素的过渡函数。

    // 视觉格式属性
    "display",                          // 	设置或检索元素的显示方式。
    "position",                         // 	设置或检索元素的定位方式。
    "top",                              // 	设置或检索元素的上位置。
    "right",                            // 	设置或检索元素的右位置。
    "bottom",                           // 	设置或检索元素的下位置。
    "left",                             // 	设置或检索元素的左位置。
    "float",                            // 	设置或检索元素的浮动方式。
    "clear",                            // 	设置或检索元素的浮动方式。
    "z-index",                          // 	设置或检索元素的堆叠顺序。
    "overflow",                         // 	设置或检索元素的溢出。
    "overflow-x",                       // 	设置或检索元素的溢出。
    "overflow-y",                       // 	设置或检索元素的溢出。
    "resize",                           // 	设置或检索元素的可变。
    "clip",                             // 	设置或检索元素的裁剪。
    "visibility",                       // 	设置或检索元素的可见性。
    "cursor",                           // 	设置或检索元素的光标。
    "box-shadow",                       // 	设置或检索元素的阴影。
    "box-sizing",                       // 	设置或检索元素的盒模型。
];

const attributeValuePromptWords = {
    display: ['inline', 'block', 'contents', 'flex', 'flow', 'flow-root', 'grid', 'inline-block', 'inline-flex', 'inline-grid', 'inline-table', 'list-item', 'run-in', 'table', 'table-caption', 'table-column-group', 'table-header-group', 'table-footer-group', 'table-row-group', 'table-cell', 'table-column', 'table-row', 'none', 'initial', 'inherit'],
    position: ['static', 'relative', 'absolute', 'fixed', 'sticky', 'initial', 'inherit'],
    float: ['left', 'right', 'none', 'initial', 'inherit'],
    clear: ['none', 'left', 'right', 'both', 'initial', 'inherit'],
    overflow: ['visible', 'hidden', 'scroll', 'auto', 'initial', 'inherit'],
    cursor: ['auto', 'default', 'none', 'context-menu', 'help', 'pointer', 'progress', 'wait', 'cell', ' crosshair', 'text', 'vertical-text', 'alias', 'copy', 'move', 'no-drop', 'not-allowed', 'grab', 'grabbing', 'e-resize', 'n-resize', 'ne-resize', 'nw-resize', 's-resize', 'se-resize', 'sw-resize', 'w-resize', 'ew-resize', 'ns-resize', 'nesw-resize', 'nwse-resize', 'col-resize', 'row-resize', 'all-scroll', 'zoom-in', 'zoom-out', 'initial', 'inherit'],
    "box-sizing": ['content-box', 'border-box', 'initial', 'inherit'],
    "border-style": ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'initial', 'inherit']
}

export { attributePromptWords, attributeValuePromptWords }