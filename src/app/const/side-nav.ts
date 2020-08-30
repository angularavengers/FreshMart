
export interface CategoryList{
  title: string,
  icon: string,
  iconColor?: string,
  path: string,
  heading: string,
  categoryType: string
}
export interface SideBar {
   title: string,
   icon: string,
   path: string,
   iconColor?: string,
   isMore?: boolean,
   heading: string,
   isChildVisible?: CategoryList[]
}

export const sideBarPath: SideBar[] = [
   {
     title: 'Home',
     icon: 'home',
     heading: 'Home',
     path: '/home'
   },
   {
    title: 'VEGETABLES',
    icon: 'eco',
    heading: 'VEGETABLES',
    iconColor: '#008000',
    isMore: true,
    path: '/home',
    isChildVisible: [
      {
        title: 'GREEN VEGETABLES',
        icon: '../assets/side-nav-icon/green.jpg',
        path: '',
        heading: '',
        categoryType: ''
      },
      {
        title: 'FLOWER VEGETABLES',
        icon: '../assets/side-nav-icon/flower.jpg',
        path: '',
        heading: '',
        categoryType: ''
      },
      {
        title: 'FRUIT VEGETABLES',
        icon: '../assets/side-nav-icon/fruit.jpg',
        path: '',
        heading: '',
        categoryType: ''
      },
      {
        title: 'STEM VEGETABLES',
        icon: '../assets/side-nav-icon/stem.jpg',
        path: '',
        heading: '',
        categoryType: ''
      },
      {
        title: 'ROOTS, BULBS AND TUBERS',
        icon: '../assets/side-nav-icon/root.jpg',
        path: '',
        heading: '',
        categoryType: ''
      }
    ]
  },
   {
    title: 'About FreshMart',
    icon: 'people',
    heading: 'About Fresh Mart',
    path: '/aboutus'
  },
 {
     title: 'Contact US',
     icon: 'phone_in_talk',
     heading: 'Get Contacts',
     path: '/contactus'
   }
   ];

