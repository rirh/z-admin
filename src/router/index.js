import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/shop',
    component: Layout,
    redirect: '/shop',
    name: 'Shop',
    meta: { title: '店铺', icon: 'el-icon-s-shop' },
    children: [
      {
        path: 'pageList',
        name: 'PageList',
        component: () => import('@/views/shop/page-list'),
        meta: { title: '店铺页面' }
      },
      {
        path: 'pageDiy',
        name: 'PageDiy',
        component: () => import('@/views/shop/page-diy'),
        meta: { title: '店铺设计' },
        hidden: true
      },
      {
        path: 'pageEdit',
        name: 'PageEdit',
        component: () => import('@/views/shop/page-edit'),
        meta: { title: '店铺编辑' },
        hidden: true
      },
      {
        path: 'tabbarEdit',
        name: 'TabbarEdit',
        component: () => import('@/views/shop/tabbar-edit'),
        meta: { title: '店铺导航' }
      },
      {
        path: 'sourceList',
        name: 'SourceList',
        component: () => import('@/views/shop/source-list'),
        meta: { title: '素材中心' }
      }
    ]
  },

  {
    path: '/goods',
    component: Layout,
    redirect: '/goods',
    name: 'Goods',
    meta: { title: '商品', icon: 'el-icon-s-goods' },
    children: [
      {
        path: 'goodsList',
        name: 'GoodsList',
        component: () => import('@/views/goods/goods-list'),
        meta: { title: '全部商品' }
      },
      {
        path: 'goodsGroupList',
        name: 'GoodsGroupList',
        component: () => import('@/views/goods/goods-group-list'),
        meta: { title: '商品分组' }
      },
      {
        path: 'goodsEdit',
        name: 'GoodsEdit',
        component: () => import('@/views/goods/goods-edit'),
        meta: { title: '商品编辑' },
        hidden: true
      }
    ]
  },

  {
    path: '/custom',
    component: Layout,
    redirect: '/custom',
    name: 'Custom',
    meta: { title: '客户', icon: 'el-icon-s-custom' },
    children: [
      {
        path: 'customList',
        name: 'CustomList',
        component: () => import('@/views/custom/custom-list'),
        meta: { title: '客户管理' }
      },
      {
        path: 'pointList',
        name: 'PointList',
        component: () => import('@/views/custom/point-list'),
        meta: { title: '积分管理' }
      }
    ]
  },

  {
    path: '/delivery',
    component: Layout,
    redirect: '/delivery',
    name: 'Delivery',
    meta: { title: '配送', icon: 'el-icon-s-promotion' },
    children: [
      {
        path: 'templateList',
        name: 'TemplateList',
        component: () => import('@/views/delivery/template-list'),
        meta: { title: '配送模板' }
      },
      {
        path: 'templateEdit',
        name: 'TemplateEdit',
        component: () => import('@/views/delivery/template-edit'),
        meta: { title: '配送模板编辑' },
        hidden: true
      },
      {
        path: 'selfgetList',
        name: 'SelfgetList',
        component: () => import('@/views/delivery/selfget-list'),
        meta: { title: '上门自提' }
      },
      {
        path: 'selfgetEdti',
        name: 'SelfgetEdit',
        component: () => import('@/views/delivery/selfget-edit'),
        meta: { title: '上门自提编辑' },
        hidden: true
      }
    ]
  },

  {
    path: '/marketing',
    component: Layout,
    redirect: '/marketing',
    name: 'Marketing',
    meta: { title: '营销', icon: 'el-icon-s-ticket' },
    children: [
      {
        path: 'couponList',
        name: 'CouponList',
        component: () => import('@/views/marketing/coupon-list'),
        meta: { title: '优惠券' }
      },
      {
        path: 'couponEdit',
        name: 'CouponEdit',
        component: () => import('@/views/marketing/coupon-edit'),
        meta: { title: '优惠券编辑' },
        hidden: true
      },
      {
        path: 'pintuanList',
        name: 'PintuanList',
        component: () => import('@/views/marketing/pintuan-list'),
        meta: { title: '拼团' }
      },
      {
        path: 'pintuanEdit',
        name: 'PintuanEdit',
        component: () => import('@/views/marketing/pintuan-edit'),
        meta: { title: '拼团编辑' },
        hidden: true
      },
      {
        path: 'fenxiaoList',
        name: 'FenxiaoList',
        component: () => import('@/views/marketing/fenxiao-list'),
        meta: { title: '分销' },
        hidden: true
      },
      {
        path: 'fenxiaoEdit',
        name: 'FenxiaoEdit',
        component: () => import('@/views/marketing/fenxiao-edit'),
        meta: { title: '分销编辑' },
        hidden: true
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order',
    name: 'Order',
    meta: { title: '订单', icon: 'el-icon-s-order' },
    children: [
      {
        path: 'orderList',
        name: 'OrderList',
        component: () => import('@/views/order/order-list'),
        meta: { title: '订单管理' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting',
    name: 'Setting',
    meta: { title: '设置', icon: 'el-icon-s-tools' },
    children: [
      {
        path: 'index',
        name: 'Setting',
        component: () => import('@/views/setting/index'),
        meta: { title: '通用设置' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
