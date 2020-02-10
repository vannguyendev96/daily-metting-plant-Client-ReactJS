export default {
  //test
  items: [
    {
      name: 'Dashboard',
      url: '/planning-year-list',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    //
    {
      title: true,
      name: 'Kế hoạch',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Kế hoạch năm',
      url: '/planning-year',
      icon: 'icon-pencil',
      children: [
        {
          name: 'Tạo mới',
          url: '/planning-year',
          icon: 'icon-puzzle',
        },
        {
          name: 'Thống kê',
          url: '/planning-year-list',
          icon: 'icon-puzzle',
        },
      ],
    },
    {
      name: 'Kế hoạch hằng ngày',
      url: '/theme/typography',
      icon: 'icon-pencil',
      children: [
        {
          name: 'Tạo mới',
          url: '/planning-daily',
          icon: 'icon-puzzle',
        },
        {
          name: 'Thống kê',
          url: '/planning-daily-list',
          icon: 'icon-puzzle',
        },
      ],
    },
    {
      title: true,
      name: 'Quản lí',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Quản lí nhân viên',
      url: '/users-list',
      icon: 'icon-pencil',
      children: [
        {
          name: 'Quản lí công việc',
          url: '/users-list',
          icon: 'icon-puzzle',
        },
      ],
    },
  ],
};
