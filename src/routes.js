import React from 'react';

const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base/Switches'));
const Tables = React.lazy(() => import('./views/Base/Tables'));
const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const PlanningYear = React.lazy(() => import('./views/Planning/PlanningYear'));
const PlanningYear_List = React.lazy(() => import('./views/Planning/PlanningYear_List'));
const PlanningYear_Detail = React.lazy(() => import('./views/Planning/PlanningYear_Detail'));


//daily meeting
const PlanningDaily = React.lazy(() => import('./views/Planning/PlanningDaily/PlanningDaily_Create/PlanningDaily_Create'));
const PlanningDaily_List  = React.lazy(() => import('./views/Planning/PlanningDaily/PlanningDaily_List/PlanningDaily_List'));
const PlanningDaily_Detail  = React.lazy(() => import('./views/Planning/PlanningDaily/PlanningDaily_Detail/PlanningDaily_Detail'));

//report
const UserListReport = React.lazy(() => import('./views/UserManager/UserList/UserList'));
//get task year by user ID
const UserListTaskYear = React.lazy(() => import('./views/UserManager/UserList_ListTaskYear/UserList_ListTaskYear'));
//get task daily by user ID
const UserListTaskDaily = React.lazy(() => import('./views/UserManager/UserList_ListTaskDaily/UserList_ListTaskDaily'));
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/planning-year', exact: true,  name: 'Tạo mới kế hoạch cho năm', component: PlanningYear },
  { path: '/planning-year-list', exact: true,  name: 'Danh sách kế hoạch', component: PlanningYear_List },
  { path: '/planning-year-detail/:id', exact: true,  name: 'Chỉnh sữa kế hoạch', component: PlanningYear_Detail },
  { path: '/planning-daily', exact: true,  name: 'Tạo mới kế hoạch cho ngày', component: PlanningDaily },
  { path: '/planning-daily-list', exact: true,  name: 'Danh sách kế hoạch cho ngày', component: PlanningDaily_List },
  { path: '/planning-daily-detail/:id', exact: true,  name: 'Chỉnh sữa kế hoạch', component: PlanningDaily_Detail },
  { path: '/users-list', exact: true,  name: 'Danh sách User', component: UserListReport },
  { path: '/planning-year-user/:id', exact: true,  name: 'Danh sách', component: UserListTaskYear },
  { path: '/planning-daily-user/:id', exact: true,  name: 'Danh sách', component: UserListTaskDaily },
];

export default routes;
