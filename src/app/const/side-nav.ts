
export interface SideBar {
title: string,
   icon: string,
   path: string,
   heading: string
}

export const sideBarPath: SideBar[] = [
   {
     title: 'Home',
     icon: 'home',
     heading: 'Home',
     path: '/home'
   },
   {
     title: 'Volunteer Registration',
     icon: 'person_add',
     heading: 'Volunteer Registration',
     path: '/volunteer'
   },
   {
     title: 'Donate Food',
     icon: 'card_giftcard',
     heading: 'Donate Food',
     path: '/donateFood'
   },
   {
     title: 'Carona HelpLine',
     icon: 'help_outline',
     heading: 'Carona HelpLine',
     path: '/caronaHelpLine'
   },
 {
     title: 'RequestFood/Grocery',
     icon: 'fastfood',
     heading: 'Request Food',
     path: '/requestFood'
   },
 
 {
     title: 'Pet Food',
     icon: 'pets',
     heading: 'Pet Food',
     path: '/petFood'
   },
 {
     title: 'Medical',
     icon: 'local_pharmacy',
     heading: 'Medical',
     path: '/medical'
   },
 {
     title: 'Daily Pass',
     icon: 'accessibility',
     heading: 'Get Pass',
     path: '/dailyPass'
   },
 {
     title: 'Important contacts',
     icon: 'phone_in_talk',
     heading: 'Get Contacts',
     path: '/importantContacts'
   }
   ];

