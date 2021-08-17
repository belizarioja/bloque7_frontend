
const routes = [
  { path: '/', component: () => import('pages/Login.vue') },
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/index', component: () => import('pages/Index.vue') },
      { path: '/ayuda', component: () => import('pages/Ayuda.vue') },
      { path: '/productos', component: () => import('pages/Productos.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
