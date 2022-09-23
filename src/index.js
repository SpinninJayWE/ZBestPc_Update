import './css/public.css'
import './css/index.css'

import 'jquery'
import './js/public'
import './js/nav'

// treeShaking触发条件
// 1. 通过解构的方式获取方法，可以触发treeShaking
// 2. 调用的npm包 必须使用ESM规范
// 3. 同一文件的treeSshaking有触发条件， 条件就是mode=production
// 4. 一定主要使用解构来加载模块

import { get } from 'lodash-es'


console.log(get({a:1}, 'a'))