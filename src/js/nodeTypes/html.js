const HTML_NODETYPES = [
    {
        label: "基础",
        list: [
            {
                label: "描述与框架",
                list: [
                    {
                        name: 'dom',
                        label: "HTML",
                        params: {
                            label: 'HTML',
                            attributes: {
                                lang: "zh-CN"
                            }
                        }
                    },
                    {
                        name: 'dom',
                        label: 'HEAD',
                        params: {
                            label: 'HEAD'
                        }
                    },
                    {
                        name: 'dom',
                        label: 'BODY',
                        params: {
                            label: 'BODY'
                        }
                    },
                    {
                        name: 'dom',
                        label: 'META',
                        params: {
                            label: 'META',
                            attributes: {
                                charset: "utf-8"
                            }
                        }
                    },
                    {
                        name: 'dom',
                        label: 'TITLE',
                        params: {
                            label: 'TITLE'
                        }
                    },
                ]
            },
            {
                name: 'dom',
                label: 'LINK',
                params: {
                    label: 'LINK',
                    attributes: {
                        rel: "stylesheet",
                        href: ""
                    }
                }
            },
            {
                name: 'dom',
                label: 'SCRIPT',
                params: {
                    label: 'SCRIPT',
                    attributes: {
                        type: "text/javascript",
                        src: ""
                    }
                }
            },

        ]
    },
    {
        label: "基本元素",
        list: [
            {
                name: 'dom',
                label: '内容划分元素',
                params: {
                    label: 'DIV',
                    attributes: {
                    }
                }
            },
            {
                name: "dom",
                label: '按钮元素',
                params: {
                    label: 'BUTTON',
                    attributes: {
                    }
                }
            },
            {
                name: 'dom',
                label: '段落元素',
                params: {
                    label: 'P',
                    attributes: {
                    }
                }
            },
            {
                name: 'dom',
                label: '标题元素',
                list: [
                    {
                        name: 'dom',
                        label: '一级标题',
                        params: {
                            label: 'H1',
                            attributes: {
                            }
                        }
                    },
                    {
                        name: 'dom',
                        label: '二级标题',
                        params: {
                            label: 'H2',
                            attributes: {
                            }
                        }
                    },
                    {
                        name: 'dom',
                        label: '三级标题',
                        params: {
                            label: 'H3',
                            attributes: {
                            }
                        }
                    },
                    {
                        name: 'dom',
                        label: '四级标题',
                        params: {
                            label: 'H4',
                            attributes: {
                            }
                        }
                    },
                    {
                        name: 'dom',
                        label: '五级标题',
                        params: {
                            label: 'H5',
                            attributes: {
                            }
                        }
                    },
                    {
                        name: 'dom',
                        label: '六级标题',
                        params: {
                            label: 'H6',
                            attributes: {
                            }
                        }
                    }
                ]
            },
            {
                name: 'dom',
                label: '列表元素',
                list: [
                    {
                        name: 'dom',
                        label: '无序列表',
                        params: {
                            label: 'UL',
                            attributes: {
                            }
                        }
                    },
                    {
                        name: 'dom',
                        label: '有序列表',
                        params: {
                            label: 'OL',
                            attributes: {
                            }
                        }
                    },
                    {
                        name: 'dom',
                        label: '列表项',
                        params: {
                            label: 'LI',
                            attributes: {
                            }
                        }
                    }
                ]
            },
            {
                name: 'dom',
                label: '链接元素',
                params: {
                    label: 'A',
                    attributes: {
                        href: "",
                        title: ""
                    }
                }
            },
            {
                label: '表格元素',
                list: [
                    {
                        name: 'dom',
                        label: '表格',
                        params: {
                            label: 'TABLE',
                            attributes: {
                            }
                        }
                    },
                    {
                        name: 'dom',
                        label: '行',
                        params: {
                            label: 'TR',
                            attributes: {
                            }
                        }
                    },
                    {
                        name: 'dom',
                        label: '单元格',
                        params: {
                            label: 'TD',
                            attributes: {
                            }
                        }
                    },
                    {
                        name: 'dom',
                        label: '表头单元格',
                        params: {
                            label: 'TH',
                            attributes: {
                            }
                        }
                    },
                    {
                        label: '样式',
                        list: [
                            {
                                name: 'dom',
                                label: '样式表',
                                params: {
                                    label: 'COLGROUP',
                                    attributes: {
                                    }
                                }
                            },
                            {
                                name: 'dom',
                                label: '列样式',
                                params: {
                                    label: 'COL',
                                    attributes: {
                                        style: "",
                                        span: ""
                                    }
                                }
                            },
                        ]
                    },
                ]
            },
        ]
    },
    {
        label: "媒体",
        list: [
            {
                name: 'dom',
                label: '图片',
                params: {
                    label: 'img',
                    attributes: {
                        src: "",
                        alt: "",
                        width: "",
                        height: "",
                        loading: ""
                    }
                }
            },
            {
                name: 'dom',
                label: '音乐',
                params: {
                    label: 'audio',
                    attributes: {
                        src: "",
                        controls: false,
                        autoplay: false,
                        loop: false,
                        muted: false,
                        preload: ""
                    }
                }
            },
            {
                name: 'dom',
                label: '视频',
                params: {
                    label: 'video',
                    attributes: {
                        src: "",
                        width: "",
                        height: "",
                        type: "",
                        controls: false,
                        autoplay: false,
                        loop: false,
                        muted: false,
                        preload: "",
                    }
                }
            }
        ]
    },
    {
        name: 'dom',
        label: '画布',
        params: {
            label: 'canvas',
            attributes: {
                width: "",
                height: ""
            }
        }
    },
    {
        name: 'dom-text',
        label: '文本'
    },
    {
        name: 'dom-attribute',
        label: '属性'
    }
];

function addIdAndClass(nodeTypes) {
    nodeTypes.forEach(nodeType => {
        if (nodeType.hasOwnProperty('list')) {
            addIdAndClass(nodeType.list);
        } else {
            if (nodeType.params?.attributes) {
                nodeType.params.attributes.id = "";
                nodeType.params.attributes.class = "";
                nodeType.params.attributes.style = "";
            }
        }
    });
}

addIdAndClass(HTML_NODETYPES);

export default HTML_NODETYPES;